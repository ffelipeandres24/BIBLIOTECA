import { useEffect, useState } from 'react'

function Prestamos() {
  const [prestamos, setPrestamos] = useState([])
  const [usuarios, setUsuarios] = useState([])
  const [libros, setLibros] = useState([])
  const [form, setForm] = useState({
    usuario_id: '',
    libro_id: '',
    fecha_prestamo: new Date().toISOString().split('T')[0]
  })

  useEffect(() => {
    fetch('http://localhost:3001/prestamos')
      .then(res => res.json())
      .then(setPrestamos)

    fetch('http://localhost:3001/usuarios')
      .then(res => res.json())
      .then(setUsuarios)

    fetch('http://localhost:3001/libros')
      .then(res => res.json())
      .then(setLibros)
  }, [])

  const registrarPrestamo = () => {
    if (!form.usuario_id || !form.libro_id) {
      alert('Debe seleccionar un usuario y un libro')
      return
    }

    fetch('http://localhost:3001/prestamos', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(form)
    })
      .then(res => {
        if (!res.ok) {
          return res.json().then(data => { throw new Error(data.error || 'Error al registrar préstamo') })
        }
        return res.json()
      })
      .then(() => window.location.reload())
      .catch(err => alert(err.message))
  }

  const devolver = (id) => {
    const hoy = new Date().toISOString().split('T')[0]
    fetch(`http://localhost:3001/prestamos/${id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        estado: 'devuelto',
        fecha_devolucion: hoy
      })
    }).then(() => window.location.reload())
  }

  return (
    <div style={styles.container}>
      <h2 style={styles.title}>📄 Préstamos Registrados</h2>

      <div style={styles.grid}>
        {prestamos.map(p => (
          <div key={p.id} style={styles.card}>
            <p><strong>Usuario:</strong> {p.Usuario?.nombre}</p>
            <p><strong>Libro:</strong> "{p.Libro?.titulo}"</p>
            <p><strong>Fecha:</strong> {p.fecha_prestamo}</p>
            <p><strong>Estado:</strong> 
              <span style={{
                ...styles.badge,
                backgroundColor: p.estado === 'prestado' ? '#f1c40f' : '#2ecc71'
              }}>
                {p.estado}
              </span>
            </p>
            {p.estado === 'prestado' && (
              <button onClick={() => devolver(p.id)} style={styles.devolverBtn}>
                Marcar como devuelto
              </button>
            )}
          </div>
        ))}
      </div>

      <h3 style={{ marginTop: '3rem' }}>➕ Registrar Nuevo Préstamo</h3>

      <div style={styles.form}>
        <select
          value={form.usuario_id}
          onChange={e => setForm({ ...form, usuario_id: e.target.value })}
          style={styles.input}
        >
          <option value="">-- Seleccionar usuario --</option>
          {usuarios.map(u => (
            <option key={u.id} value={u.id}>{u.nombre}</option>
          ))}
        </select>

        <select
          value={form.libro_id}
          onChange={e => setForm({ ...form, libro_id: e.target.value })}
          style={styles.input}
        >
          <option value="">-- Seleccionar libro disponible --</option>
          {libros.filter(l => l.stock > 0).map(l => (
            <option key={l.id} value={l.id}>
              {l.titulo} ({l.stock} disponibles)
            </option>
          ))}
        </select>

        <button onClick={registrarPrestamo} style={styles.prestarBtn}>Prestar</button>
      </div>
    </div>
  )
}

const styles = {
  container: {
    padding: '1rem'
  },
  title: {
    textAlign: 'center',
    marginBottom: '2rem',
    color: '#2c3e50'
  },
  grid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fill, minmax(250px, 1fr))',
    gap: '1rem'
  },
  card: {
    backgroundColor: '#f9f9f9',
    padding: '1rem',
    borderRadius: '8px',
    boxShadow: '0 2px 6px rgba(0,0,0,0.1)'
  },
  badge: {
    display: 'inline-block',
    padding: '0.2rem 0.6rem',
    borderRadius: '6px',
    color: '#fff',
    marginLeft: '0.5rem',
    textTransform: 'capitalize'
  },
  devolverBtn: {
    marginTop: '1rem',
    backgroundColor: '#3498db',
    color: '#fff',
    border: 'none',
    padding: '0.5rem 1rem',
    borderRadius: '5px',
    cursor: 'pointer'
  },
  form: {
    display: 'flex',
    flexDirection: 'column',
    gap: '1rem',
    maxWidth: '400px',
    marginTop: '1.5rem'
  },
  input: {
    padding: '0.6rem',
    borderRadius: '4px',
    border: '1px solid #ccc'
  },
  prestarBtn: {
    backgroundColor: '#2ecc71',
    color: '#fff',
    border: 'none',
    padding: '0.6rem',
    borderRadius: '5px',
    cursor: 'pointer',
    fontWeight: 'bold'
  }
}

export default Prestamos

