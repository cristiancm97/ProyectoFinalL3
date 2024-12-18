import React, { useState, useEffect } from 'react';
import "./Usuarios.css"

const Usuarios = () => {
  const [usuarios, setUsuarios] = useState([]);
  const [nombreUsuario, setNombreUsuario] = useState('');
  const [nombre, setNombre] = useState('');
  const [email, setEmail] = useState('');
  const [telefono, setTelefono] = useState('');
  const [contrasena, setContrasena] = useState('');
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

    const newUser = {
      NombreUsuario: nombreUsuario,
      Nombre: nombre,
      Email: email,
      Telefono: telefono,
      Contrasena: contrasena,
    };

    if (editMode) {
      fetch(`http://localhost:5000/api/usuarios/${editingUserId}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
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
      fetch('http://localhost:5000/api/usuarios', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
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

  const handleDelete = (id) => {
    if (window.confirm('¿Estás seguro de que deseas eliminar este usuario?')) {
      fetch(`http://localhost:5000/api/usuarios/${id}`, {
        method: 'DELETE',
      })
        .then((response) => {
          if (response.ok) {
            const updatedUsers = usuarios.filter((usuario) => usuario.UsuarioID !== id);
            setUsuarios(updatedUsers);
          } else {
            console.error('Error al eliminar usuario');
          }
        })
        .catch((error) => console.error('Error al eliminar usuario:', error));
    }
  };

  const clearForm = () => {
    setNombreUsuario('');
    setNombre('');
    setEmail('');
    setTelefono('');
    setContrasena('');
  };

  const handleEdit = (usuario) => {
    setNombreUsuario(usuario.NombreUsuario);
    setNombre(usuario.Nombre);
    setEmail(usuario.Email);
    setTelefono(usuario.Telefono);
    setContrasena(usuario.Contrasena);
    setEditMode(true);
    setEditingUserId(usuario.UsuarioID);
  };

  return (
    <div>
      <h1>Usuarios</h1>
      <table border="1">
        <thead>
          <tr>
            <th>UsuarioID</th>
            <th>Usuario</th>
            <th>Rol</th>
            <th>Nombre</th>
            <th>Email</th>
            <th>Telefono</th>
            <th>Contraseña</th>
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
              <td>{usuario.Contrasena}</td>
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
          <label>Usuario:</label>
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
        <div>
          <label>Contraseña:</label>
          <input
            type="password"
            value={contrasena}
            onChange={(e) => setContrasena(e.target.value)}
            required
          />
        </div>
        <button type="submit">{editMode ? 'Actualizar Usuario' : 'Crear Usuario'}</button>
      </form>
    </div>
  );
};

export default Usuarios;





