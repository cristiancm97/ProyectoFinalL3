/*import React, { useState, useEffect } from 'react';

function Usuarios() {
  const [usuarios, setUsuarios] = useState([]);
  const [nuevoUsuario, setNuevoUsuario] = useState({ nombreUsuario: '', contrasena: '', rol: '', nombre: '', email: '', telefono: '' });

  useEffect(() => {
    fetchUsuarios();
  }, []);

  const fetchUsuarios = async () => {
    try {
      const response = await fetch('http://localhost:5000/api/usuarios');
      const data = await response.json();
      setUsuarios(data);
    } catch (error) {
      console.error('Error al obtener usuarios:', error);
    }
  };

  const handleInputChange = (e) => {
    setNuevoUsuario({ ...nuevoUsuario, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch('http://localhost:5000/api/usuarios', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(nuevoUsuario),
      });
      if (response.ok) {
        fetchUsuarios();
        setNuevoUsuario({ nombreUsuario: '', contrasena: '', rol: '', nombre: '', email: '', telefono: '' });
      }
    } catch (error) {
      console.error('Error al crear usuario:', error);
    }
  };

  return (
    <div className="usuarios">
      <h2>Gestión de Usuarios</h2>
      <form onSubmit={handleSubmit}>
        <input name="nombreUsuario" value={nuevoUsuario.nombreUsuario} onChange={handleInputChange} placeholder="Nombre de Usuario" required />
        <input name="contrasena" type="password" value={nuevoUsuario.contrasena} onChange={handleInputChange} placeholder="Contraseña" required />
        <select name="rol" value={nuevoUsuario.rol} onChange={handleInputChange} required>
          <option value="">Seleccione Rol</option>
          <option value="Dueño">Dueño</option>
          <option value="Empleado">Empleado</option>
        </select>
        <input name="nombre" value={nuevoUsuario.nombre} onChange={handleInputChange} placeholder="Nombre Completo" required />
        <input name="email" type="email" value={nuevoUsuario.email} onChange={handleInputChange} placeholder="Email" required />
        <input name="telefono" value={nuevoUsuario.telefono} onChange={handleInputChange} placeholder="Teléfono" />
        <button type="submit">Crear Usuario</button>
      </form>
      <table>
        <thead>
          <tr>
            <th>ID</th>
            <th>Nombre de Usuario</th>
            <th>Rol</th>
            <th>Nombre</th>
            <th>Email</th>
            <th>Teléfono</th>
          </tr>
        </thead>
        <tbody>
          {usuarios.map(usuario => (
            <tr key={usuario.UsuarioID}>
              <td>{usuario.UsuarioID}</td>
              <td>{usuario.NombreUsuario}</td>
              <td>{usuario.Rol}</td>
              <td>{usuario.Nombre}</td>
              <td>{usuario.Email}</td>
              <td>{usuario.Telefono}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default Usuarios;*/

// src/Usuarios.js
// src/Usuarios.js
import React, { useState, useEffect } from 'react';
import './Usuarios.css';


const Usuarios = () => {
  const [usuarios, setUsuarios] = useState([]);
  const [nombreUsuario, setNombreUsuario] = useState('');
  const [nombre, setNombre] = useState('');
  const [email, setEmail] = useState('');
  const [telefono, setTelefono] = useState('');
  const [editMode, setEditMode] = useState(false);
  const [editingUserId, setEditingUserId] = useState(null);

  useEffect(() => {
    fetch('http://localhost:5000/api/usuarios')
      .then((response) => response.json())
      .then((data) => setUsuarios(data))
      .catch((error) => console.error('Error al obtener usuarios:', error));
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();

    const newUser = { NombreUsuario: nombreUsuario, Nombre: nombre, Email: email, Telefono: telefono };

    if (editMode) {
      // Editar usuario
      fetch(`http://localhost:5000/api/usuarios/${editingUserId}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(newUser),
      })
        .then((response) => response.json())
        .then((data) => {
          const updatedUsers = usuarios.map((usuario) =>
            usuario.UsuarioID === editingUserId ? data : usuario
          );
          setUsuarios(updatedUsers);
          setEditMode(false);
          setEditingUserId(null);
          clearForm();
        })
        .catch((error) => console.error('Error al editar usuario:', error));
    } else {
      // Crear nuevo usuario
      fetch('http://localhost:5000/api/usuarios', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(newUser),
      })
        .then((response) => response.json())
        .then((data) => {
          setUsuarios([...usuarios, data]);
          clearForm();
        })
        .catch((error) => console.error('Error al crear usuario:', error));
    }
  };

  const clearForm = () => {
    setNombreUsuario('');
    setNombre('');
    setEmail('');
    setTelefono('');
  };

  const handleEdit = (usuario) => {
    setNombreUsuario(usuario.NombreUsuario);
    setNombre(usuario.Nombre);
    setEmail(usuario.Email);
    setTelefono(usuario.Telefono);
    setEditMode(true);
    setEditingUserId(usuario.UsuarioID);
  };

  const handleDelete = (id) => {
    fetch(`http://localhost:5000/api/usuarios/${id}`, {
      method: 'DELETE',
    })
      .then(() => {
        setUsuarios(usuarios.filter((usuario) => usuario.UsuarioID !== id));
      })
      .catch((error) => console.error('Error al eliminar usuario:', error));
  };

  return (
    <div>
      <h1>Usuarios</h1>
      <table border="1">
        <thead>
          <tr>
            <th>UsuarioID</th>
            <th>NombreUsuario</th>
            <th>Rol</th>
            <th>Nombre</th>
            <th>Email</th>
            <th>Telefono</th>
            <th>Fecha Creación</th>
            <th>Acciones</th>
          </tr>
        </thead>
        <tbody>
          {usuarios.map((usuario) => (
            <tr key={usuario.UsuarioID}>
              <td>{usuario.UsuarioID}</td>
              <td>{usuario.NombreUsuario}</td>
              <td>{usuario.Rol}</td>
              <td>{usuario.Nombre}</td>
              <td>{usuario.Email}</td>
              <td>{usuario.Telefono}</td>
              <td>{new Date(usuario.FechaCreacion).toLocaleString()}</td>
              <td>
                <button onClick={() => handleEdit(usuario)}>Editar</button>
                <button onClick={() => handleDelete(usuario.UsuarioID)}>Eliminar</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      <h2>{editMode ? 'Editar Usuario' : 'Agregar Nuevo Usuario'}</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label>Nombre de Usuario:</label>
          <input
            type="text"
            value={nombreUsuario}
            onChange={(e) => setNombreUsuario(e.target.value)}
            required
          />
        </div>
        <div>
          <label>Nombre:</label>
          <input
            type="text"
            value={nombre}
            onChange={(e) => setNombre(e.target.value)}
            required
          />
        </div>
        <div>
          <label>Email:</label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>
        <div>
          <label>Telefono:</label>
          <input
            type="text"
            value={telefono}
            onChange={(e) => setTelefono(e.target.value)}
            required
          />
        </div>
        <button type="submit">{editMode ? 'Actualizar Usuario' : 'Crear Usuario'}</button>
      </form>
    </div>
  );
};

export default Usuarios;



