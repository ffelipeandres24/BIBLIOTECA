import { useEffect, useState } from 'react'

function Libros() {
  const [libros, setLibros] = useState([])
  const [form, setForm] = useState({
    titulo: '', autor: '', anio_publicacion: '', stock: ''
  })

  useEffect(() => {
    fetch('http://localhost:3001/libros')
      .then(res => res.json())
      .then(setLibros)
  }, [])

  const agregar = () => {
    if (!form.titulo || !form.autor || !form.stock) {
      alert('Completa todos los campos obligatorios.')
      return
    }

    fetch('http://localhost:3001/libros', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(form)
    }).then(() => window.location.reload())
  }

  const eliminar = (id) => {
    if (confirm('¿Estás seguro de eliminar este libro?')) {
      fetch(`http://localhost:3001/libros/${id}`, {
        method: 'DELETE'
      }).then(() => window.location.reload())
    }
  }

  return (
    <div style={styles.container}>
      <h2 style={styles.title}>📚 Gestión de Libros</h2>

      <div style={styles.grid}>
        {libros.map(libro => (
          <div key={libro.id} style={styles.card}>
            <h3>{libro.titulo}</h3>
            <p><strong>Autor:</strong> {libro.autor}</p>
            <p><strong>Año:</strong> {libro.anio_publicacion || 'N/D'}</p>
            <p><strong>Stock:</strong> {libro.stock}</p>
            <button onClick={() => eliminar(libro.id)} style={styles.deleteBtn}>
              Eliminar
            </button>
          </div>
        ))}
      </div>

      <h3 style={{ marginTop: '3rem' }}>➕ Agregar nuevo libro</h3>
      <div style={styles.form}>
        <input
          style={styles.input}
          placeholder="Título"
          onChange={e => setForm({ ...form, titulo: e.target.value })}
        />
        <input
          style={styles.input}
          placeholder="Autor"
          onChange={e => setForm({ ...form, autor: e.target.value })}
        />
        <input
          style={styles.input}
          placeholder="Año publicación"
          type="number"
          onChange={e => setForm({ ...form, anio_publicacion: e.target.value })}
        />
        <input
          style={styles.input}
          placeholder="Stock"
          type="number"
          onChange={e => setForm({ ...form, stock: e.target.value })}
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

export default Libros
