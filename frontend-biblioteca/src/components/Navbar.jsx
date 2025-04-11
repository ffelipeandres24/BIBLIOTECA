import { Link, useLocation } from 'react-router-dom'

function Navbar() {
  const location = useLocation()

  return (
    <nav style={styles.navbar}>
      <div style={styles.logo}>📖 BibliotecaApp</div>
      <div style={styles.links}>
        <NavLink to="/" currentPath={location.pathname} label="Inicio" />
        <NavLink to="/usuarios" currentPath={location.pathname} label="Usuarios" />
        <NavLink to="/libros" currentPath={location.pathname} label="Libros" />
        <NavLink to="/prestamos" currentPath={location.pathname} label="Préstamos" />
      </div>
    </nav>
  )
}

function NavLink({ to, label, currentPath }) {
  const isActive = currentPath === to
  return (
    <Link
      to={to}
      style={{
        ...styles.link,
        ...(isActive ? styles.activeLink : {})
      }}
    >
      {label}
    </Link>
  )
}

const styles = {
  navbar: {
    backgroundColor: '#2c3e50',
    padding: '1rem 2rem',
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: '2rem',
  },
  logo: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: '1.2rem',
  },
  links: {
    display: 'flex',
    gap: '1rem'
  },
  link: {
    color: '#ecf0f1',
    textDecoration: 'none',
    padding: '0.5rem 1rem',
    borderRadius: '6px',
    transition: 'background 0.2s',
  },
  activeLink: {
    backgroundColor: '#34495e',
  }
}

export default Navbar
