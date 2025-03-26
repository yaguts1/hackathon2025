import React, { useState } from 'react';

const Header = () => {
  const [searchTerm, setSearchTerm] = useState('');

  const handleSearchChange = (e) => {
    setSearchTerm(e.target.value);
  };

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    if (searchTerm.trim()) {
      console.log('Buscando por:', searchTerm);
      // Aqui você pode adicionar a lógica para enviar a pesquisa (ex: redirecionamento ou API)
    }
  };

  return (
    <header style={styles.header}>
      <div style={styles.logoContainer}>
        <h1 style={styles.logo}>MechaBot</h1>
      </div>
      <nav style={styles.nav}>
        <ul style={styles.navList}>
          <li style={styles.navItem}><a href="/" style={styles.navLink}>Home</a></li>
          <li style={styles.navItem}><a href="/sobre" style={styles.navLink}>Sobre</a></li>
          <li style={styles.navItem}><a href="/contato" style={styles.navLink}>Contato</a></li>
        </ul>
      </nav>
      <form onSubmit={handleSearchSubmit} style={styles.searchContainer}>
        <input
          type="text"
          value={searchTerm}
          onChange={handleSearchChange}
          placeholder="Buscar..."
          style={styles.searchInput}
        />
        <button type="submit" style={styles.searchButton}>🔍</button>
      </form>
    </header>
  );
};

const styles = {
  header: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: '20px',
    backgroundColor: '#3498db',
    color: '#fff',
    boxShadow: '0 4px 10px rgba(0,0,0,0.1)',
  },
  logoContainer: {
    flex: 1,
  },
  logo: {
    margin: 0,
    fontSize: '1.75rem',
    fontWeight: 'bold',
  },
  nav: {
    flex: 2,
    display: 'flex',
    justifyContent: 'flex-end',
  },
  navList: {
    listStyleType: 'none',
    margin: 0,
    padding: 0,
    display: 'flex',
    gap: '20px',
  },
  navItem: {
    margin: 0,
  },
  navLink: {
    color: '#fff',
    textDecoration: 'none',
    fontSize: '1rem',
    fontWeight: 'normal',
    transition: 'color 0.3s',
  },
  navLinkHover: {
    color: '#ddd',
  },
  searchContainer: {
    display: 'flex',
    alignItems: 'center',
    gap: '10px',
  },
  searchInput: {
    padding: '8px',
    borderRadius: '5px',
    border: '1px solid #ddd',
    fontSize: '1rem',
    width: '200px',
  },
  searchButton: {
    backgroundColor: 'transparent',
    border: 'none',
    color: '#fff',
    cursor: 'pointer',
    fontSize: '1.2rem',
  },
};

export default Header;
