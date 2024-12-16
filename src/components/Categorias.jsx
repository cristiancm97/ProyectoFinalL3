// src/Categorias.js
import React, { useState, useEffect } from 'react';

const Categorias = () => {
  const [categorias, setCategorias] = useState([]);
  const [nombreCategoria, setNombreCategoria] = useState('');
  const [descripcion, setDescripcion] = useState('');
  const [editMode, setEditMode] = useState(false);
  const [editingCategoriaId, setEditingCategoriaId] = useState(null);

  useEffect(() => {
    fetch('http://localhost:5000/api/categorias')
      .then((response) => response.json())
      .then((data) => setCategorias(data))
      .catch((error) => console.error('Error al obtener categorías:', error));
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();

    const newCategoria = { NombreCategoria: nombreCategoria, Descripcion: descripcion };

    if (editMode) {
      // Editar categoría
      fetch(`http://localhost:5000/api/categorias/${editingCategoriaId}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(newCategoria),
      })
        .then((response) => response.json())
        .then((data) => {
          const updatedCategorias = categorias.map((categoria) =>
            categoria.CategoriaID === editingCategoriaId ? data : categoria
          );
          setCategorias(updatedCategorias);
          setEditMode(false);
          setEditingCategoriaId(null);
          clearForm();
        })
        .catch((error) => console.error('Error al editar categoría:', error));
    } else {
      // Crear nueva categoría
      fetch('http://localhost:5000/api/categorias', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(newCategoria),
      })
        .then((response) => response.json())
        .then((data) => {
          setCategorias([...categorias, data]);
          clearForm();
        })
        .catch((error) => console.error('Error al crear categoría:', error));
    }
  };

  const clearForm = () => {
    setNombreCategoria('');
    setDescripcion('');
  };

  const handleEdit = (categoria) => {
    setNombreCategoria(categoria.NombreCategoria);
    setDescripcion(categoria.Descripcion);
    setEditMode(true);
    setEditingCategoriaId(categoria.CategoriaID);
  };

  const handleDelete = (id) => {
    fetch(`http://localhost:5000/api/categorias/${id}`, {
      method: 'DELETE',
    })
      .then(() => {
        setCategorias(categorias.filter((categoria) => categoria.CategoriaID !== id));
      })
      .catch((error) => console.error('Error al eliminar categoría:', error));
  };

  return (
    <div>
      <h1>Categorías</h1>
      <table border="1">
        <thead>
          <tr>
            <th>CategoriaID</th>
            <th>NombreCategoria</th>
            <th>Descripción</th>
            <th>Acciones</th>
          </tr>
        </thead>
        <tbody>
          {categorias.map((categoria) => (
            <tr key={categoria.CategoriaID}>
              <td>{categoria.CategoriaID}</td>
              <td>{categoria.NombreCategoria}</td>
              <td>{categoria.Descripcion}</td>
              <td>
                <button onClick={() => handleEdit(categoria)}>Editar</button>
                <button onClick={() => handleDelete(categoria.CategoriaID)}>Eliminar</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      <h2>{editMode ? 'Editar Categoría' : 'Agregar Nueva Categoría'}</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label>Nombre de la Categoría:</label>
          <input
            type="text"
            value={nombreCategoria}
            onChange={(e) => setNombreCategoria(e.target.value)}
            required
          />
        </div>
        <div>
          <label>Descripción:</label>
          <textarea
            value={descripcion}
            onChange={(e) => setDescripcion(e.target.value)}
            required
          ></textarea>
        </div>
        <button type="submit">{editMode ? 'Actualizar Categoría' : 'Crear Categoría'}</button>
      </form>
    </div>
  );
};

export default Categorias;


