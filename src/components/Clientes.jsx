// src/Clientes.js
import React, { useState, useEffect } from 'react';

const Clientes = () => {
  const [clientes, setClientes] = useState([]);
  const [nombreCliente, setNombreCliente] = useState('');
  const [telefono, setTelefono] = useState('');
  const [email, setEmail] = useState('');
  const [direccion, setDireccion] = useState('');
  const [editMode, setEditMode] = useState(false);
  const [editingClienteId, setEditingClienteId] = useState(null);

  useEffect(() => {
    fetch('http://localhost:5000/api/clientes')
      .then((response) => response.json())
      .then((data) => setClientes(data))
      .catch((error) => console.error('Error al obtener clientes:', error));
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();

    const newCliente = { 
      NombreCliente: nombreCliente, 
      Telefono: telefono, 
      Email: email, 
      Direccion: direccion
    };

    if (editMode) {
      // Editar cliente
      fetch(`http://localhost:5000/api/clientes/${editingClienteId}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(newCliente),
      })
        .then((response) => response.json())
        .then((data) => {
          const updatedClientes = clientes.map((cliente) =>
            cliente.ClienteID === editingClienteId ? data : cliente
          );
          setClientes(updatedClientes);
          setEditMode(false);
          setEditingClienteId(null);
          clearForm();
        })
        .catch((error) => console.error('Error al editar cliente:', error));
    } else {
      // Crear nuevo cliente
      fetch('http://localhost:5000/api/clientes', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(newCliente),
      })
        .then((response) => response.json())
        .then((data) => {
          setClientes([...clientes, data]);
          clearForm();
        })
        .catch((error) => console.error('Error al crear cliente:', error));
    }
  };

  const clearForm = () => {
    setNombreCliente('');
    setTelefono('');
    setEmail('');
    setDireccion('');
  };

  const handleEdit = (cliente) => {
    setNombreCliente(cliente.NombreCliente);
    setTelefono(cliente.Telefono);
    setEmail(cliente.Email);
    setDireccion(cliente.Direccion);
    setEditMode(true);
    setEditingClienteId(cliente.ClienteID);
  };

  const handleDelete = (id) => {
    fetch(`http://localhost:5000/api/clientes/${id}`, {
      method: 'DELETE',
    })
      .then(() => {
        setClientes(clientes.filter((cliente) => cliente.ClienteID !== id));
      })
      .catch((error) => console.error('Error al eliminar cliente:', error));
  };

  return (
    <div>
      <h1>Clientes</h1>
      <table border="1">
        <thead>
          <tr>
            <th>ClienteID</th>
            <th>NombreCliente</th>
            <th>Telefono</th>
            <th>Email</th>
            <th>Dirección</th>
            <th>Acciones</th>
          </tr>
        </thead>
        <tbody>
          {clientes.map((cliente) => (
            <tr key={cliente.ClienteID}>
              <td>{cliente.ClienteID}</td>
              <td>{cliente.NombreCliente}</td>
              <td>{cliente.Telefono}</td>
              <td>{cliente.Email}</td>
              <td>{cliente.Direccion}</td>
              <td>
                <button onClick={() => handleEdit(cliente)}>Editar</button>
                <button onClick={() => handleDelete(cliente.ClienteID)}>Eliminar</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      <h2>{editMode ? 'Editar Cliente' : 'Agregar Nuevo Cliente'}</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label>Nombre del Cliente:</label>
          <input
            type="text"
            value={nombreCliente}
            onChange={(e) => setNombreCliente(e.target.value)}
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
          <label>Email:</label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>
        <div>
          <label>Dirección:</label>
          <textarea
            value={direccion}
            onChange={(e) => setDireccion(e.target.value)}
          ></textarea>
        </div>
        <button type="submit">{editMode ? 'Actualizar Cliente' : 'Crear Cliente'}</button>
      </form>
    </div>
  );
};

export default Clientes;
