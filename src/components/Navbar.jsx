import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import './Navbar.css';

function Navbar() {
  const navigate = useNavigate();
  const userRole = localStorage.getItem('userRole');

  const handleLogout = () => {
    localStorage.removeItem('userRole');
    navigate('/login');
  };

  return (
    <nav>
      <ul>
        {userRole === 'Dueño' && <li><Link to="/usuarios">Usuarios</Link></li>}
        <li><Link to="/clientes">Clientes</Link></li>
        <li><Link to="/productos">Productos</Link></li>
        <li><Link to="/proveedores">Proveedores</Link></li>
        <li><Link to="/categorias">Categorías</Link></li>
        <li><Link to="/ventas">Ventas</Link></li>
        <li><Link to="/compras">Compras</Link></li>
        <li><button onClick={handleLogout}>Cerrar Sesión</button></li>
      </ul>
    </nav>
  );
}

export default Navbar;