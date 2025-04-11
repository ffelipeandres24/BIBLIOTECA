import { useEffect, useState } from 'react'

function Usuarios() {
  const [usuarios, setUsuarios] = useState([])
  const [form, setForm] = useState({ nombre: '', correo: '', telefono: '' })

  useEffect(() => {
    fetch('http://localhost:3001/usuarios')
      .then(res => res.json())
      .then(setUsuarios)
  }, [])

  const agregar = () => {
    if (!form.nombre || !form.correo) {
      alert('El nombre y el correo son obligatorios.')
      return
    }

    fetch('http://localhost:3001/usuarios', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(form)
    }).then(() => window.location.reload())
  }

  const eliminar = (id) => {
    if (confirm('¿Estás seguro de eliminar este usuario?')) {
      fetch(`http://localhost:3001/usuarios/${id}`, {
        method: 'DELETE'
      }).then(() => window.location.reload())
    }
  }

  return (
    <div style={styles.container}>
      <h2 style={styles.title}>👥 Gestión de Usuarios</h2>

      <div style={styles.grid}>
        {usuarios.map(u => (
          <div key={u.id} style={styles.card}>
            <p><strong>Nombre:</strong> {u.nombre}</p>
            <p><strong>Correo:</strong> {u.correo}</p>
            <p><strong>Teléfono:</strong> {u.telefono || 'N/A'}</p>
            <button onClick={() => eliminar(u.id)} style={styles.deleteBtn}>
              Eliminar
            </button>
          </div>
        ))}
      </div>

      <h3 style={{ marginTop: '3rem' }}>➕ Agregar Nuevo Usuario</h3>
      <div style={styles.form}>
        <input
          style={styles.input}
          placeholder="Nombre"
          onChange={e => setForm({ ...form, nombre: e.target.value })}
        />
        <input
          style={styles.input}
          placeholder="Correo"
          type="email"
          onChange={e => setForm({ ...form, correo: e.target.value })}
        />
        <input
          style={styles.input}
          placeholder="Teléfono"
          onChange={e => setForm({ ...form, telefono: e.target.value })}
        />
        <button onClick={agregar} style={styles.addBtn}>Agregar</button>
      </div>
    </div>
  )
}

const styles = {
  container: {
    padding: '1rem',
  },
  title: {
    marginBottom: '2rem',
    textAlign: 'center',
    color: '#2c3e50'
  },
  grid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fill, minmax(220px, 1fr))',
    gap: '1rem',
  },
  card: {
    padding: '1rem',
    borderRadius: '8px',
    backgroundColor: '#f9f9f9',
    boxShadow: '0 2px 8px rgba(0,0,0,0.1)',
    textAlign: 'left',
  },
  deleteBtn: {
    marginTop: '1rem',
    backgroundColor: '#e74c3c',
    color: '#fff',
    border: 'none',
    padding: '0.5rem 1rem',
    borderRadius: '5px',
    cursor: 'pointer'
  },
  form: {
    display: 'flex',
    flexDirection: 'column',
    gap: '0.8rem',
    maxWidth: '400px',
    marginTop: '1rem'
  },
  input: {
    padding: '0.6rem',
    borderRadius: '4px',
    border: '1px solid #ccc'
  },
  addBtn: {
    backgroundColor: '#2ecc71',
    color: '#fff',
    border: 'none',
    padding: '0.6rem',
    borderRadius: '5px',
    cursor: 'pointer',
    fontWeight: 'bold'
  }
}

export default Usuarios
