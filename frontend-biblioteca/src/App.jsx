import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import Home from './pages/Home'
import Usuarios from './pages/Usuarios'
import Libros from './pages/Libros'
import Prestamos from './pages/Prestamos'
import Navbar from './components/Navbar'

function App() {
  return (
    <Router>
      <Navbar />
      <div style={{ padding: '1rem' }}>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/usuarios" element={<Usuarios />} />
          <Route path="/libros" element={<Libros />} />
          <Route path="/prestamos" element={<Prestamos />} />
        </Routes>
      </div>
    </Router>
  )
}

export default App
