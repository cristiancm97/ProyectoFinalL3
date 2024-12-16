// src/Proveedores.js
import React, { useState, useEffect } from 'react';

const Proveedores = () => {
  const [proveedores, setProveedores] = useState([]);
  const [nombreProveedor, setNombreProveedor] = useState('');
  const [contacto, setContacto] = useState('');
  const [telefono, setTelefono] = useState('');
  const [email, setEmail] = useState('');
  const [direccion, setDireccion] = useState('');
  const [editMode, setEditMode] = useState(false);
  const [editingProveedorId, setEditingProveedorId] = useState(null);

  useEffect(() => {
    fetch('http://localhost:5000/api/proveedores')
      .then((response) => response.json())
      .then((data) => setProveedores(data))
      .catch((error) => console.error('Error al obtener proveedores:', error));
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();

    const newProveedor = { 
      NombreProveedor: nombreProveedor, 
      Contacto: contacto, 
      Telefono: telefono, 
      Email: email, 
      Direccion: direccion
    };

    if (editMode) {
      // Editar proveedor
      fetch(`http://localhost:5000/api/proveedores/${editingProveedorId}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(newProveedor),
      })
        .then((response) => response.json())
        .then((data) => {
          const updatedProveedores = proveedores.map((proveedor) =>
            proveedor.ProveedorID === editingProveedorId ? data : proveedor
          );
          setProveedores(updatedProveedores);
          setEditMode(false);
          setEditingProveedorId(null);
          clearForm();
        })
        .catch((error) => console.error('Error al editar proveedor:', error));
    } else {
      // Crear nuevo proveedor
      fetch('http://localhost:5000/api/proveedores', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(newProveedor),
      })
        .then((response) => response.json())
        .then((data) => {
          setProveedores([...proveedores, data]);
          clearForm();
        })
        .catch((error) => console.error('Error al crear proveedor:', error));
    }
  };

  const clearForm = () => {
    setNombreProveedor('');
    setContacto('');
    setTelefono('');
    setEmail('');
    setDireccion('');
  };

  const handleEdit = (proveedor) => {
    setNombreProveedor(proveedor.NombreProveedor);
    setContacto(proveedor.Contacto);
    setTelefono(proveedor.Telefono);
    setEmail(proveedor.Email);
    setDireccion(proveedor.Direccion);
    setEditMode(true);
    setEditingProveedorId(proveedor.ProveedorID);
  };

  const handleDelete = (id) => {
    fetch(`http://localhost:5000/api/proveedores/${id}`, {
      method: 'DELETE',
    })
      .then(() => {
        setProveedores(proveedores.filter((proveedor) => proveedor.ProveedorID !== id));
      })
      .catch((error) => console.error('Error al eliminar proveedor:', error));
  };

  return (
    <div>
      <h1>Proveedores</h1>
      <table border="1">
        <thead>
          <tr>
            <th>ProveedorID</th>
            <th>NombreProveedor</th>
            <th>Contacto</th>
            <th>Telefono</th>
            <th>Email</th>
            <th>Direccion</th>
            <th>Acciones</th>
          </tr>
        </thead>
        <tbody>
          {proveedores.map((proveedor) => (
            <tr key={proveedor.ProveedorID}>
              <td>{proveedor.ProveedorID}</td>
              <td>{proveedor.NombreProveedor}</td>
              <td>{proveedor.Contacto}</td>
              <td>{proveedor.Telefono}</td>
              <td>{proveedor.Email}</td>
              <td>{proveedor.Direccion}</td>
              <td>
                <button onClick={() => handleEdit(proveedor)}>Editar</button>
                <button onClick={() => handleDelete(proveedor.ProveedorID)}>Eliminar</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      <h2>{editMode ? 'Editar Proveedor' : 'Agregar Nuevo Proveedor'}</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label>Nombre del Proveedor:</label>
          <input
            type="text"
            value={nombreProveedor}
            onChange={(e) => setNombreProveedor(e.target.value)}
            required
          />
        </div>
        <div>
          <label>Contacto:</label>
          <input
            type="text"
            value={contacto}
            onChange={(e) => setContacto(e.target.value)}
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
        <button type="submit">{editMode ? 'Actualizar Proveedor' : 'Crear Proveedor'}</button>
      </form>
    </div>
  );
};

export default Proveedores;


