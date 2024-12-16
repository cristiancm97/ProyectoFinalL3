// src/Productos.js
import React, { useState, useEffect } from 'react';

const Productos = () => {
  const [productos, setProductos] = useState([]);
  const [categorias, setCategorias] = useState([]);
  const [productoData, setProductoData] = useState({
    CategoriaID: '',
    NombreProducto: '',
    Descripcion: '',
    PrecioCompra: '',
    PrecioVenta: '',
    Stock: '',
  });
  const [editMode, setEditMode] = useState(false);
  const [editingProductoId, setEditingProductoId] = useState(null);

  // Cargar productos y categorías
  useEffect(() => {
    fetch('http://localhost:5000/api/productos')
      .then((response) => response.json())
      .then((data) => setProductos(data))
      .catch((error) => console.error('Error al obtener productos:', error));

    fetch('http://localhost:5000/api/categorias')
      .then((response) => response.json())
      .then((data) => setCategorias(data))
      .catch((error) => console.error('Error al obtener categorías:', error));
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();

    const newProducto = {
      CategoriaID: productoData.CategoriaID,
      NombreProducto: productoData.NombreProducto,
      Descripcion: productoData.Descripcion,
      PrecioCompra: productoData.PrecioCompra,
      PrecioVenta: productoData.PrecioVenta,
      Stock: productoData.Stock,
    };

    if (editMode) {
      // Editar producto
      fetch(`http://localhost:5000/api/productos/${editingProductoId}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(newProducto),
      })
        .then((response) => response.json())
        .then((data) => {
          const updatedProductos = productos.map((producto) =>
            producto.ProductoID === editingProductoId ? data : producto
          );
          setProductos(updatedProductos);
          setEditMode(false);
          setEditingProductoId(null);
          clearForm();
        })
        .catch((error) => console.error('Error al editar producto:', error));
    } else {
      // Crear nuevo producto
      fetch('http://localhost:5000/api/productos', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(newProducto),
      })
        .then((response) => response.json())
        .then((data) => {
          setProductos([...productos, data]);
          clearForm();
        })
        .catch((error) => console.error('Error al crear producto:', error));
    }
  };

  const handleEdit = (producto) => {
    setProductoData({
      CategoriaID: producto.CategoriaID,
      NombreProducto: producto.NombreProducto,
      Descripcion: producto.Descripcion,
      PrecioCompra: producto.PrecioCompra,
      PrecioVenta: producto.PrecioVenta,
      Stock: producto.Stock,
    });
    setEditMode(true);
    setEditingProductoId(producto.ProductoID);
  };

  const handleDelete = (id) => {
    fetch(`http://localhost:5000/api/productos/${id}`, {
      method: 'DELETE',
    })
      .then(() => {
        setProductos(productos.filter((producto) => producto.ProductoID !== id));
      })
      .catch((error) => console.error('Error al eliminar producto:', error));
  };

  const clearForm = () => {
    setProductoData({
      CategoriaID: '',
      NombreProducto: '',
      Descripcion: '',
      PrecioCompra: '',
      PrecioVenta: '',
      Stock: '',
    });
  };

  return (
    <div>
      <h1>Productos</h1>
      <table border="1">
        <thead>
          <tr>
            <th>ProductoID</th>
            <th>NombreProducto</th>
            <th>Categoria</th>
            <th>PrecioCompra</th>
            <th>PrecioVenta</th>
            <th>Stock</th>
            <th>Acciones</th>
          </tr>
        </thead>
        <tbody>
          {productos.map((producto) => (
            <tr key={producto.ProductoID}>
              <td>{producto.ProductoID}</td>
              <td>{producto.NombreProducto}</td>
              <td>{producto.NombreCategoria}</td>
              <td>{producto.PrecioCompra}</td>
              <td>{producto.PrecioVenta}</td>
              <td>{producto.Stock}</td>
              <td>
                <button onClick={() => handleEdit(producto)}>Editar</button>
                <button onClick={() => handleDelete(producto.ProductoID)}>Eliminar</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      <h2>{editMode ? 'Editar Producto' : 'Agregar Nuevo Producto'}</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label>Nombre del Producto:</label>
          <input
            type="text"
            value={productoData.NombreProducto}
            onChange={(e) => setProductoData({ ...productoData, NombreProducto: e.target.value })}
            required
          />
        </div>
        <div>
          <label>Categoria:</label>
          <select
            value={productoData.CategoriaID}
            onChange={(e) => setProductoData({ ...productoData, CategoriaID: e.target.value })}
            required
          >
            <option value="">Seleccionar Categoría</option>
            {categorias.map((categoria) => (
              <option key={categoria.CategoriaID} value={categoria.CategoriaID}>
                {categoria.NombreCategoria}
              </option>
            ))}
          </select>
        </div>
        <div>
          <label>Descripción:</label>
          <textarea
            value={productoData.Descripcion}
            onChange={(e) => setProductoData({ ...productoData, Descripcion: e.target.value })}
          ></textarea>
        </div>
        <div>
          <label>Precio de Compra:</label>
          <input
            type="number"
            value={productoData.PrecioCompra}
            onChange={(e) => setProductoData({ ...productoData, PrecioCompra: e.target.value })}
            required
          />
        </div>
        <div>
          <label>Precio de Venta:</label>
          <input
            type="number"
            value={productoData.PrecioVenta}
            onChange={(e) => setProductoData({ ...productoData, PrecioVenta: e.target.value })}
            required
          />
        </div>
        <div>
          <label>Stock:</label>
          <input
            type="number"
            value={productoData.Stock}
            onChange={(e) => setProductoData({ ...productoData, Stock: e.target.value })}
            required
          />
        </div>
        <button type="submit">{editMode ? 'Actualizar Producto' : 'Crear Producto'}</button>
      </form>
    </div>
  );
};

export default Productos;


