import { useState } from 'react';

export default function TareaItem({ tarea, alternarEstado, eliminarTarea, actualizarTitulo }) {
  const [modoEdicion, setModoEdicion] = useState(false);
  const [tituloTemporal, setTituloTemporal] = useState(tarea.title);

  const manejarGuardado = () => {
    if (tituloTemporal.trim() === '') return alert('El título no puede estar vacío');
    actualizarTitulo(tarea.id, tituloTemporal);
    setModoEdicion(false);
  };

  return (
    <li>
      {modoEdicion ? (
        <>
          <input
            type="text"
            value={tituloTemporal}
            onChange={(e) => setTituloTemporal(e.target.value)}
          />
          <button onClick={manejarGuardado}>Guardar</button>
        </>
      ) : (
        <>
          <span
            className={`todo-text ${tarea.completed ? 'completed' : ''}`}
            onDoubleClick={() => setModoEdicion(true)}
          >
            {tarea.title}
          </span>
          <div className="actions">
            <button onClick={() => alternarEstado(tarea.id)}>✔</button>
            <button onClick={() => eliminarTarea(tarea.id)}>🗑️</button>
          </div>
        </>
      )}
    </li>
  );
}
