import React, { useState, useEffect } from 'react';

function Ventas() {
  const [ventas, setVentas] = useState([]);
  const [productos, setProductos] = useState([]);
  const [clientes, setClientes] = useState([]);
  const [nuevaVenta, setNuevaVenta] = useState({
    clienteID: '',
    productos: [{ productoID: '', cantidad: 1 }],
  });

  const [DetalleVenta, setDetalleVenta] = useState([]);
  const [modalVisible, setModalVisible] = useState(false); // Estado para manejar la visibilidad del modal

  useEffect(() => {
    fetchVentas();
    fetchProductos();
    fetchClientes();
  }, []);

  const fetchVentas = async () => {
    try {
      const response = await fetch('http://localhost:5000/api/ventas');
      const data = await response.json();
      setVentas(data);
    } catch (error) {
      console.error('Error al obtener ventas:', error);
    }
  };

  const fetchProductos = async () => {
    try {
      const response = await fetch('http://localhost:5000/api/productos');
      const data = await response.json();
      setProductos(data);
    } catch (error) {
      console.error('Error al obtener productos:', error);
    }
  };

  const fetchClientes = async () => {
    try {
      const response = await fetch('http://localhost:5000/api/clientes');
      const data = await response.json();
      setClientes(data);
    } catch (error) {
      console.error('Error al obtener clientes:', error);
    }
  };

  const handleInputChange = (e, index) => {
    if (e.target.name === 'clienteID') {
      setNuevaVenta({ ...nuevaVenta, clienteID: e.target.value });
    } else {
      const updatedProductos = nuevaVenta.productos.map((producto, i) => {
        if (i === index) {
          return { ...producto, [e.target.name]: e.target.value };
        }
        return producto;
      });
      setNuevaVenta({ ...nuevaVenta, productos: updatedProductos });
    }
  };

  const handleAddProducto = () => {
    setNuevaVenta({
      ...nuevaVenta,
      productos: [...nuevaVenta.productos, { productoID: '', cantidad: 1 }],
    });
  };

  const handleRemoveProducto = (index) => {
    const updatedProductos = nuevaVenta.productos.filter((_, i) => i !== index);
    setNuevaVenta({ ...nuevaVenta, productos: updatedProductos });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch('http://localhost:5000/api/ventas', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(nuevaVenta),
      });
      if (response.ok) {
        fetchVentas();
        setNuevaVenta({
          clienteID: '',
          productos: [{ productoID: '', cantidad: 1 }],
        });
      }
    } catch (error) {
      console.error('Error al crear venta:', error);
    }
  };


  const handleVerDetalle = async (VentaID) => {
    const response = await fetch(`http://localhost:5000/api/ventas/${VentaID}`);
    const data = await response.json();
    setDetalleVenta(data);
    setModalVisible(true); // Mostrar el modal al obtener los detalles
  };

  const handleCloseModal = () => {
    setModalVisible(false); // Cerrar el modal
  };

  return (
    <div className="ventas">
      <h2>Gestión de Ventas</h2>
      <form onSubmit={handleSubmit}>
        <select name="clienteID" value={nuevaVenta.clienteID} onChange={handleInputChange} required>
          <option value="">Seleccione Cliente</option>
          {clientes.map(cliente => (
            <option key={cliente.ClienteID} value={cliente.ClienteID}>{cliente.NombreCliente}</option>
          ))}
        </select>
        {nuevaVenta.productos.map((producto, index) => (
          <div key={index}>
            <select
              name="productoID"
              value={producto.productoID}
              onChange={(e) => handleInputChange(e, index)}
              required
            >
              <option value="">Seleccione Producto</option>
              {productos.map(p => (
                <option key={p.ProductoID} value={p.ProductoID}>{p.NombreProducto}</option>
              ))}
            </select>
            <input
              type="number"
              name="cantidad"
              value={producto.cantidad}
              onChange={(e) => handleInputChange(e, index)}
              min="1"
              required
            />
            <button type="button" onClick={() => handleRemoveProducto(index)}>Eliminar</button>
          </div>
        ))}
        <button type="button" onClick={handleAddProducto}>Agregar Producto</button>
        <button type="submit">Crear Venta</button>
      </form>
      <table>
        <thead>
          <tr>
            <th>ID</th>
            <th>Cliente</th>
            <th>Usuario</th>
            <th>Total</th>
            <th>Fecha</th>
            <th>Detalle</th>
          </tr>
        </thead>
        <tbody>
          {ventas.map(venta => (
            <tr key={venta.VentaID}>
              <td>{venta.VentaID}</td>
              <td>{venta.NombreCliente}</td>
              <td>{venta.NombreUsuario}</td>
              <td>${venta.TotalVenta}</td>
              <td>{new Date(venta.FechaVenta).toLocaleString()}</td>
              <td>
                <button onClick={() => handleVerDetalle(venta.VentaID)}>Ver Detalle</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>


      {/* Modal */}
      {modalVisible && (
        <div className="modal-overlay" onClick={handleCloseModal}>
          <div className="modal" onClick={(e) => e.stopPropagation()}>
            <h3>Detalle de la Venta</h3>
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
                {DetalleVenta.map((detalle) => (
                  <tr key={detalle.DetalleVentaID}>
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
}

export default Ventas;

/*import React, { useState, useEffect } from 'react';

const Ventas = () => {
  const [clientes, setClientes] = useState([]);
  const [productos, setProductos] = useState([]);
  const [ventas, setVentas] = useState([]);
  const [nuevaVenta, setNuevaVenta] = useState({
    clienteID: '',
    productos: [{ productoID: '', cantidad: 1 }],
  });

  useEffect(() => {
    // Obtener clientes y productos al cargar la página
    fetch('/api/clientes')
      .then(res => res.json())
      .then(data => setClientes(data));

    fetch('/api/productos')
      .then(res => res.json())
      .then(data => setProductos(data));

    fetch('/api/ventas')
      .then(res => res.json())
      .then(data => setVentas(data));
  }, []);

  const handleInputChange = (e, index) => {
    const { name, value } = e.target;
    const nuevaVentaData = { ...nuevaVenta };
    if (name === 'clienteID') {
      nuevaVentaData.clienteID = value;
    } else {
      nuevaVentaData.productos[index][name] = value;
    }
    setNuevaVenta(nuevaVentaData);
  };

  const handleAddProducto = () => {
    setNuevaVenta({
      ...nuevaVenta,
      productos: [...nuevaVenta.productos, { productoID: '', cantidad: 1 }],
    });
  };

  const handleRemoveProducto = (index) => {
    const productosActualizados = nuevaVenta.productos.filter((_, i) => i !== index);
    setNuevaVenta({ ...nuevaVenta, productos: productosActualizados });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const usuarioID = localStorage.getItem('userID');  // Obtener el UsuarioID del localStorage

    fetch('/api/ventas', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'usuario-id': usuarioID,  // Enviar el UsuarioID en los headers
      },
      body: JSON.stringify({
        clienteID: nuevaVenta.clienteID,
        productos: nuevaVenta.productos,
      }),
    })
      .then(res => res.json())
      .then(data => {
        if (data.message === 'Venta registrada correctamente') {
          alert('Venta registrada correctamente');
          // Refrescar las ventas o hacer algo después de la venta
        }
      });
  };

  return (
    <div className="ventas">
      <h2>Gestión de Ventas</h2>
      <form onSubmit={handleSubmit}>
        <select name="clienteID" value={nuevaVenta.clienteID} onChange={handleInputChange} required>
          <option value="">Seleccione Cliente</option>
          {clientes.map(cliente => (
            <option key={cliente.ClienteID} value={cliente.ClienteID}>{cliente.NombreCliente}</option>
          ))}
        </select>
        {nuevaVenta.productos.map((producto, index) => (
          <div key={index}>
            <select
              name="productoID"
              value={producto.productoID}
              onChange={(e) => handleInputChange(e, index)}
              required
            >
              <option value="">Seleccione Producto</option>
              {productos.map(p => (
                <option key={p.ProductoID} value={p.ProductoID}>{p.NombreProducto}</option>
              ))}
            </select>
            <input
              type="number"
              name="cantidad"
              value={producto.cantidad}
              onChange={(e) => handleInputChange(e, index)}
              min="1"
              required
            />
            <button type="button" onClick={() => handleRemoveProducto(index)}>Eliminar</button>
          </div>
        ))}
        <button type="button" onClick={handleAddProducto}>Agregar Producto</button>
        <button type="submit">Crear Venta</button>
      </form>
      <table>
        <thead>
          <tr>
            <th>ID</th>
            <th>Cliente</th>
            <th>Fecha</th>
            <th>Total</th>
          </tr>
        </thead>
        <tbody>
          {ventas.map(venta => (
            <tr key={venta.VentaID}>
              <td>{venta.VentaID}</td>
              <td>{venta.NombreCliente}</td>
              <td>{new Date(venta.FechaVenta).toLocaleString()}</td>
              <td>${venta.TotalVenta}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Ventas;*/


