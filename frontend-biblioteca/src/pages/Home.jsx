import { useEffect, useState } from 'react'

function Home() {
  const [usuarios, setUsuarios] = useState([])
  const [libros, setLibros] = useState([])

  useEffect(() => {
    fetch('http://localhost:3001/usuarios')
      .then(res => res.json())
      .then(setUsuarios)

    fetch('http://localhost:3001/libros')
      .then(res => res.json())
      .then(setLibros)
  }, [])

  return (
    <div style={styles.container}>
      <div style={styles.card}>
        <h1 style={styles.title}>📚 Sistema de Biblioteca</h1>
        <div style={styles.statsContainer}>
          <div style={styles.statBox}>
            <h2 style={styles.statNumber}>{usuarios.length}</h2>
            <p style={styles.statLabel}>Usuarios registrados</p>
          </div>
          <div style={styles.statBox}>
            <h2 style={styles.statNumber}>{libros.length}</h2>
            <p style={styles.statLabel}>Libros disponibles</p>
          </div>
        </div>
      </div>
    </div>
  )
}

const styles = {
  container: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    height: '80vh',
    backgroundColor: '#f5f5f5',
  },
  card: {
    backgroundColor: '#ffffff',
    padding: '2rem 3rem',
    borderRadius: '12px',
    boxShadow: '0 4px 12px rgba(0,0,0,0.1)',
    textAlign: 'center',
    minWidth: '300px',
  },
  title: {
    marginBottom: '2rem',
    color: '#333',
  },
  statsContainer: {
    display: 'flex',
    justifyContent: 'space-around',
    gap: '2rem',
  },
  statBox: {
    backgroundColor: '#f0f0f0',
    borderRadius: '8px',
    padding: '1rem',
    width: '150px',
  },
  statNumber: {
    fontSize: '2rem',
    fontWeight: 'bold',
    color: '#4caf50',
  },
  statLabel: {
    marginTop: '0.5rem',
    fontSize: '1rem',
    color: '#555',
  }
}

export default Home
