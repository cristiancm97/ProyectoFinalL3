import React, { useState, useEffect } from 'react';
import "./Compras.css"

const Compras = () => {
  const [proveedores, setProveedores] = useState([]);
  const [productos, setProductos] = useState([]);
  const [compras, setCompras] = useState([]);
  const [nuevaCompra, setNuevaCompra] = useState({
    proveedorID: '',
    productos: [{ productoID: '', cantidad: 1, precioUnitario: 0 }],
  });

  const [detalleCompra, setDetalleCompra] = useState([]);
  const [modalVisible, setModalVisible] = useState(false); // Estado para manejar la visibilidad del modal

  const fetchCompras = async () => {
    const response = await fetch('http://localhost:5000/api/compras');
    const data = await response.json();
    setCompras(data);
  };

  useEffect(() => {
    // Cargar proveedores y productos al iniciar
    const fetchProveedores = async () => {
      const response = await fetch('http://localhost:5000/api/proveedores');
      const data = await response.json();
      setProveedores(data);
    };

    const fetchProductos = async () => {
      const response = await fetch('http://localhost:5000/api/productos');
      const data = await response.json();
      setProductos(data);
    };

    fetchProveedores();
    fetchProductos();
    fetchCompras();
  }, []);

  const handleInputChange = (e, index) => {
    const { name, value } = e.target;
    const newProductos = [...nuevaCompra.productos];
    newProductos[index] = { ...newProductos[index], [name]: value };
    setNuevaCompra({ ...nuevaCompra, productos: newProductos });
  };

  const handleAddProducto = () => {
    setNuevaCompra({
      ...nuevaCompra,
      productos: [...nuevaCompra.productos, { productoID: '', cantidad: 1, precioUnitario: 0 }],
    });
  };

  const handleRemoveProducto = (index) => {
    const newProductos = nuevaCompra.productos.filter((_, i) => i !== index);
    setNuevaCompra({ ...nuevaCompra, productos: newProductos });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const userID = localStorage.getItem('userID');
    const usuarioID = userID;

    // Primero, registrar la compra
    const response = await fetch('http://localhost:5000/api/compras', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ ...nuevaCompra, usuarioID }),
    });

    if (response.ok) {
      const compraData = await response.json();
      alert(compraData.message);

      // Luego, registrar los detalles de la compra
      const detalles = nuevaCompra.productos.map((producto) => ({
        CompraID: compraData.CompraID,
        ProductoID: producto.productoID,
        Cantidad: producto.cantidad,
        PrecioUnitario: producto.precioUnitario,
        Subtotal: producto.cantidad * producto.precioUnitario,
      }));

      // Registrar los detalles de la compra
      const detalleResponse = await fetch('http://localhost:5000/api/detallecompras', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(detalles),
      });

      if (detalleResponse.ok) {
        // Ahora, actualizar el stock de los productos
        for (const producto of nuevaCompra.productos) {
          await fetch(`http://localhost:5000/api/productos/${producto.productoID}/stock`, {
            method: 'PATCH',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ cantidad: producto.cantidad }),
          });
        }

        // Limpiar formulario y recargar compras
        setNuevaCompra({
          proveedorID: '',
          productos: [{ productoID: '', cantidad: 1, precioUnitario: 0 }],
        });
        fetchCompras();  // Recargar compras después de completar el proceso
      } else {
        console.log('Hubo un error al registrar los detalles de la compra');
        fetchCompras(); 
      }
    } else {
      alert('Hubo un error al registrar la compra');
    }
  };

  const handleVerDetalle = async (compraID) => {
    const response = await fetch(`http://localhost:5000/api/compras/${compraID}`);
    const data = await response.json();
    setDetalleCompra(data);
    setModalVisible(true); // Mostrar el modal al obtener los detalles
  };

  const handleCloseModal = () => {
    setModalVisible(false); // Cerrar el modal
  };

  return (
    <div className="compras">
      <h2>Gestión de Compras</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="proveedorID">Proveedor:</label>
          <select
            id="proveedorID"
            name="proveedorID"
            value={nuevaCompra.proveedorID}
            onChange={(e) => setNuevaCompra({ ...nuevaCompra, proveedorID: e.target.value })}
            required
          >
            <option value="">Seleccione Proveedor</option>
            {proveedores.map((proveedor) => (
              <option key={proveedor.ProveedorID} value={proveedor.ProveedorID}>
                {proveedor.NombreProveedor}
              </option>
            ))}
          </select>
        </div>

        {nuevaCompra.productos.map((producto, index) => (
          <div key={index}>
            <div>
              <label htmlFor={`productoID-${index}`}>Producto:</label>
              <select
                id={`productoID-${index}`}
                name="productoID"
                value={producto.productoID}
                onChange={(e) => handleInputChange(e, index)}
                required
              >
                <option value="">Seleccione Producto</option>
                {productos.map((p) => (
                  <option key={p.ProductoID} value={p.ProductoID}>
                    {p.NombreProducto}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label htmlFor={`cantidad-${index}`}>Cantidad:</label>
              <input
                id={`cantidad-${index}`}
                type="number"
                name="cantidad"
                value={producto.cantidad}
                onChange={(e) => handleInputChange(e, index)}
                min="1"
                required
              />
            </div>

            <div>
              <label htmlFor={`precioUnitario-${index}`}>Precio Unitario:</label>
              <input
                id={`precioUnitario-${index}`}
                type="number"
                name="precioUnitario"
                value={producto.precioUnitario}
                onChange={(e) => handleInputChange(e, index)}
                min="0"
                step="0.01"
                required
              />
            </div>

            <button type="button" onClick={() => handleRemoveProducto(index)}>
              Eliminar
            </button>
          </div>
        ))}

        <button type="button" onClick={handleAddProducto}>
          Agregar Producto
        </button>
        <button type="submit">Crear Compra</button>
      </form>

      <h3>Lista de Compras</h3>
      <table>
        <thead>
          <tr>
            <th>ID</th>
            <th>Proveedor</th>
            <th>Fecha</th>
            <th>Usuario</th>
            <th>Total</th>
            <th>Detalle</th>
          </tr>
        </thead>
        <tbody>
          {compras.map((compra) => (
            <tr key={compra.CompraID}>
              <td>{compra.IdCompra}</td>
              <td>{compra.Proveedor}</td>
              <td>{new Date(compra.Fecha).toLocaleString()}</td>
              <td>{compra.Usuario || 'N/A'}</td>
              <td>${compra.Total}</td>
              <td>
                <button onClick={() => handleVerDetalle(compra.IdCompra)}>Ver Detalle</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      

      {/* Modal */}
      {modalVisible && (
        <div className="modal-overlay" onClick={handleCloseModal}>
          <div className="modal" onClick={(e) => e.stopPropagation()}>
            <h3>Detalle de la Compra</h3>
            <table>
              <thead>
                <tr>
                  <th>Producto</th>
                  <th>Cantidad</th>
                  <th>Precio Unitario</th>
                  <th>Subtotal</th>
                </tr>
              </thead>
              <tbody>
                {detalleCompra.map((detalle) => (
                  <tr key={detalle.DetalleCompraID}>
                    <td>{detalle.NombreProducto}</td>
                    <td>{detalle.Cantidad}</td>
                    <td>${detalle.PrecioUnitario}</td>
                    <td>${detalle.Subtotal}</td>
                  </tr>
                ))}
              </tbody>
            </table>
            <button onClick={handleCloseModal}>Cerrar</button>
          </div>
        </div>
      )}


    </div>
  );
};

export default Compras;






