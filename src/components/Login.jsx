// src/Login.js
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const Login = () => {
  const [nombreUsuario, setNombreUsuario] = useState('');
  const [contrasena, setContrasena] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Validación básica de campos
    if (!nombreUsuario || !contrasena) {
      setError('Por favor, ingresa el nombre de usuario y la contraseña');
      return;
    }

    try {
      const response = await fetch('http://localhost:5000/api/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ NombreUsuario: nombreUsuario, Contrasena: contrasena }),
      });

      const data = await response.json();

      if (response.ok) {
        // Almacenar la información del usuario en localStorage
        localStorage.setItem('userID', data.UsuarioID);
        localStorage.setItem('userRole', data.Rol);
        localStorage.setItem('userNombre', data.Nombre);
        localStorage.setItem('userEmail', data.Email);
        localStorage.setItem('userTelefono', data.Telefono);

        // Redirigir a la página principal
        navigate('/dashboard');
      } else {
        setError(data.message);
      }
    } catch (error) {
      console.error('Error al iniciar sesión:', error);
      setError('Error al conectar con el servidor. Intenta nuevamente más tarde.');
    }
  };

  return (
    <div>
      <h1>ALMACEN LO DE MARIO</h1>
      <form onSubmit={handleSubmit}>
        <div>
          <label>Usuario:</label>
          <input
            type="text"
            value={nombreUsuario}
            onChange={(e) => setNombreUsuario(e.target.value)}
            required
          />
        </div>
        <div>
          <label>Contraseña:</label>
          <input
            type="password"
            value={contrasena}
            onChange={(e) => setContrasena(e.target.value)}
            required
          />
        </div>
        {error && <div style={{ color: 'red' }}>{error}</div>}
        <div>
          <button type="submit">INICIAR SESIÓN</button>
        </div>
      </form>
    </div>
  );
};

export default Login;




