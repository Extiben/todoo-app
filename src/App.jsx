import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import Home from './pages/Home';
import Todos from './pages/Todos';
import Registro from './pages/Registro';
import './style.css'; // Asegúrate de importar el CSS

function App() {
  return (
    <Router>
      <div className="app">
        <header className="navbar">
          <nav>
            <ul className="nav-list">
              <li><Link to="/">Inicio</Link></li>
              <li><Link to="/todos">Todos</Link></li>
              <li><Link to="/registro">Registro</Link></li>
            </ul>
          </nav>
        </header>

        <main>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/todos" element={<Todos />} />
            <Route path="/registro" element={<Registro />} />
          </Routes>
        </main>
      </div>
    </Router>
  );
}

export default App;
