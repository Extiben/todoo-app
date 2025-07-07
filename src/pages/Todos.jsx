import { useEffect, useState } from 'react';
import '../style.css';

export default function ListaTareas() {
  const [tareas, setTareas] = useState([]);
  const [textoNuevaTarea, setTextoNuevaTarea] = useState('');
  const [estadoCarga, setEstadoCarga] = useState(true);
  const [error, setError] = useState(null);
  const [filtro, setFiltro] = useState('todas');

  const API_URL = 'http://localhost:3000/todos';

  useEffect(() => {
    const cargarTareas = async () => {
      try {
        const res = await fetch(API_URL);
        if (!res.ok) throw new Error('No se pudo obtener las tareas');
        const data = await res.json();
        setTareas(data);
      } catch (e) {
        console.error(e);
        setError('Error al cargar las tareas.');
      } finally {
        setEstadoCarga(false);
      }
    };

    cargarTareas();
  }, []);

  const manejarEnvio = async (e) => {
    e.preventDefault();
    if (!textoNuevaTarea.trim()) return alert('La tarea no puede estar vacía');

    const nueva = {
      title: textoNuevaTarea,
      completed: false,
    };

    try {
      const res = await fetch(API_URL, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(nueva),
      });

      const nuevaTarea = await res.json();
      setTareas((prev) => [...prev, nuevaTarea]);
      setTextoNuevaTarea('');
    } catch {
      alert('No se pudo agregar la tarea');
    }
  };

  const cambiarEstado = async (id) => {
    const tarea = tareas.find((t) => t.id === id);
    const actualizada = { ...tarea, completed: !tarea.completed };

    await fetch(`${API_URL}/${id}`, {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ completed: actualizada.completed }),
    });

    setTareas(tareas.map((t) => (t.id === id ? actualizada : t)));
  };

  const borrarTarea = async (id) => {
    await fetch(`${API_URL}/${id}`, { method: 'DELETE' });
    setTareas(tareas.filter((t) => t.id !== id));
  };

  const filtrarTareas = () => {
    if (filtro === 'completadas') return tareas.filter((t) => t.completed);
    if (filtro === 'pendientes') return tareas.filter((t) => !t.completed);
    return tareas;
  };

  return (
    <div className="lista-tareas-container">
      <h2>Gestor de Tareas</h2>

      <form onSubmit={manejarEnvio} className="form-tarea">
        <input
          type="text"
          value={textoNuevaTarea}
          placeholder="Agrega una nueva tarea..."
          onChange={(e) => setTextoNuevaTarea(e.target.value)}
        />
        <button type="submit">➕</button>
      </form>

      <div className="filtro">
        <label>Mostrar: </label>
        <select value={filtro} onChange={(e) => setFiltro(e.target.value)}>
          <option value="todas">Todas</option>
          <option value="completadas">Completadas</option>
          <option value="pendientes">Pendientes</option>
        </select>
      </div>

      {error && <p className="mensaje-error">{error}</p>}

      {estadoCarga ? (
        <p>Cargando...</p>
      ) : (
        <ul className="lista">
          {filtrarTareas().map((t) => (
            <li key={t.id} className="tarea">
              <span
                className={`tarea-titulo ${t.completed ? 'completa' : ''}`}
                onClick={() => cambiarEstado(t.id)}
              >
                {t.title}
              </span>
              <div className="tarea-acciones">
                <button onClick={() => cambiarEstado(t.id)}>✔</button>
                <button onClick={() => borrarTarea(t.id)}>🗑️</button>
              </div>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
