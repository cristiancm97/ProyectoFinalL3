// server.js (o app.js)
const express = require('express');
const mysql = require('mysql2');
const cors = require('cors');

const app = express();
const port = 5000;

app.use(express.json());
app.use(cors());

// Configuración de la base de datos
const db = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: '',
  database: 'Tienda',
});


//-----------------------------------------------------SECCION LOGIN------------------------------------------------------------
// Ruta para iniciar sesión
app.post('/api/login', (req, res) => {
  const { NombreUsuario, Contrasena } = req.body;

  if (!NombreUsuario || !Contrasena) {
    return res.status(400).json({ message: 'Usuario y contraseña son requeridos' });
  }

  // Verificar si el usuario existe en la base de datos
  const query = 'SELECT * FROM Usuarios WHERE NombreUsuario = ? AND Contrasena = ?';

  db.query(query, [NombreUsuario, Contrasena], (err, results) => {
    if (err) {
      console.error(err);
      return res.status(500).json({ message: 'Error en la base de datos' });
    }

    if (results.length === 0) {
      return res.status(404).json({ message: 'Usuario o contraseña incorrectos' });
    }

    const user = results[0];

    // Autenticación exitosa, devolver la información del usuario
    const userData = {
      UsuarioID: user.UsuarioID,
      NombreUsuario: user.NombreUsuario,
      Rol: user.Rol,
      Nombre: user.Nombre,
      Email: user.Email,
      Telefono: user.Telefono,
    };

    res.json(userData);
  });
});





//-----------------------------------------------------SECCION USUARIOS------------------------------------------------------------
// Ruta para obtener los usuarios
app.get('/api/usuarios', (req, res) => {
  db.query('SELECT * FROM Usuarios', (err, results) => {
    if (err) {
      console.error(err);
      return res.status(500).send('Error al obtener los usuarios');
    }
    res.json(results);
  });
});

// Ruta para crear un nuevo usuario
app.post('/api/usuarios', (req, res) => {
  const { NombreUsuario, Nombre, Email, Telefono, Contrasena } = req.body;

  if (!NombreUsuario || !Nombre || !Email || !Telefono || !Contrasena) {
    return res.status(400).send('Todos los campos son requeridos');
  }

  const query = `
    INSERT INTO Usuarios (NombreUsuario, Contrasena, Rol, Nombre, Email, Telefono)
    VALUES (?, ?, 'Empleado', ?, ?, ?)
  `;

  db.query(query, [NombreUsuario, Contrasena, Nombre, Email, Telefono], (err, results) => {
    if (err) {
      console.error(err);
      return res.status(500).send('Error al crear el usuario');
    }
    res.status(201).json({
      id: results.insertId,
      NombreUsuario,
      Nombre,
      Email,
      Telefono,
      Rol: 'Empleado',
      Contrasena,
    });
  });
});

// Ruta para editar un usuario
app.put('/api/usuarios/:id', (req, res) => {
  const { id } = req.params;
  const { NombreUsuario, Nombre, Email, Telefono, Contrasena } = req.body;

  const query = `
    UPDATE Usuarios
    SET NombreUsuario = ?, Nombre = ?, Email = ?, Telefono = ?, Contrasena = ?
    WHERE UsuarioID = ?
  `;

  db.query(query, [NombreUsuario, Nombre, Email, Telefono, Contrasena, id], (err, results) => {
    if (err) {
      console.error(err);
      return res.status(500).send('Error al actualizar el usuario');
    }
    res.json({
      id,
      NombreUsuario,
      Nombre,
      Email,
      Telefono,
      Rol: 'Empleado',
      Contrasena,
    });
  });
});


// Ruta para eliminar un usuario
app.delete('/api/usuarios/:id', (req, res) => {
  const { id } = req.params;

  const query = 'DELETE FROM Usuarios WHERE UsuarioID = ?';

  db.query(query, [id], (err, results) => {
    if (err) {
      console.error(err);
      return res.status(500).send('Error al eliminar el usuario');
    }
    res.status(204).send(); // No content response for successful deletion
  });
});




//-----------------------------------------------------SECCION CATEGORIAS------------------------------------------------------------
// Ruta para obtener las categorías
app.get('/api/categorias', (req, res) => {
  db.query('SELECT * FROM Categorias', (err, results) => {
    if (err) {
      console.error(err);
      return res.status(500).send('Error al obtener las categorías');
    }
    res.json(results);
  });
});

// Ruta para crear una nueva categoría
app.post('/api/categorias', (req, res) => {
  const { NombreCategoria, Descripcion } = req.body;

  if (!NombreCategoria || !Descripcion) {
    return res.status(400).send('Todos los campos son requeridos');
  }

  const query = `
    INSERT INTO Categorias (NombreCategoria, Descripcion)
    VALUES (?, ?)
  `;

  db.query(query, [NombreCategoria, Descripcion], (err, results) => {
    if (err) {
      console.error(err);
      return res.status(500).send('Error al crear la categoría');
    }
    res.status(201).json({ CategoriaID: results.insertId, NombreCategoria, Descripcion });
  });
});

// Ruta para editar una categoría
app.put('/api/categorias/:id', (req, res) => {
  const { id } = req.params;
  const { NombreCategoria, Descripcion } = req.body;

  const query = `
    UPDATE Categorias
    SET NombreCategoria = ?, Descripcion = ?
    WHERE CategoriaID = ?
  `;

  db.query(query, [NombreCategoria, Descripcion, id], (err, results) => {
    if (err) {
      console.error(err);
      return res.status(500).send('Error al actualizar la categoría');
    }
    res.json({ CategoriaID: id, NombreCategoria, Descripcion });
  });
});

// Ruta para eliminar una categoría
app.delete('/api/categorias/:id', (req, res) => {
  const { id } = req.params;

  const query = 'DELETE FROM Categorias WHERE CategoriaID = ?';

  db.query(query, [id], (err, results) => {
    if (err) {
      console.error(err);
      return res.status(500).send('Error al eliminar la categoría');
    }
    res.status(204).send(); // No content response for successful deletion
  });
});




//-----------------------------------------------------SECCION PROVEEDORES------------------------------------------------------------
// Ruta para obtener los proveedores
app.get('/api/proveedores', (req, res) => {
  db.query('SELECT * FROM Proveedores', (err, results) => {
    if (err) {
      console.error(err);
      return res.status(500).send('Error al obtener los proveedores');
    }
    res.json(results);
  });
});

// Ruta para crear un nuevo proveedor
app.post('/api/proveedores', (req, res) => {
  const { NombreProveedor, Contacto, Telefono, Email, Direccion } = req.body;

  if (!NombreProveedor || !Telefono) {
    return res.status(400).send('NombreProveedor y Telefono son requeridos');
  }

  const query = `
    INSERT INTO Proveedores (NombreProveedor, Contacto, Telefono, Email, Direccion)
    VALUES (?, ?, ?, ?, ?)
  `;

  db.query(query, [NombreProveedor, Contacto, Telefono, Email, Direccion], (err, results) => {
    if (err) {
      console.error(err);
      return res.status(500).send('Error al crear el proveedor');
    }
    res.status(201).json({ ProveedorID: results.insertId, NombreProveedor, Contacto, Telefono, Email, Direccion });
  });
});

// Ruta para editar un proveedor
app.put('/api/proveedores/:id', (req, res) => {
  const { id } = req.params;
  const { NombreProveedor, Contacto, Telefono, Email, Direccion } = req.body;

  const query = `
    UPDATE Proveedores
    SET NombreProveedor = ?, Contacto = ?, Telefono = ?, Email = ?, Direccion = ?
    WHERE ProveedorID = ?
  `;

  db.query(query, [NombreProveedor, Contacto, Telefono, Email, Direccion, id], (err, results) => {
    if (err) {
      console.error(err);
      return res.status(500).send('Error al actualizar el proveedor');
    }
    res.json({ ProveedorID: id, NombreProveedor, Contacto, Telefono, Email, Direccion });
  });
});

// Ruta para eliminar un proveedor
app.delete('/api/proveedores/:id', (req, res) => {
  const { id } = req.params;

  const query = 'DELETE FROM Proveedores WHERE ProveedorID = ?';

  db.query(query, [id], (err, results) => {
    if (err) {
      console.error(err);
      return res.status(500).send('Error al eliminar el proveedor');
    }
    res.status(204).send(); // No content response for successful deletion
  });
});




//-----------------------------------------------------SECCION CLIENTES------------------------------------------------------------
// Ruta para obtener los clientes
app.get('/api/clientes', (req, res) => {
  db.query('SELECT * FROM Clientes', (err, results) => {
    if (err) {
      console.error(err);
      return res.status(500).send('Error al obtener los clientes');
    }
    res.json(results);
  });
});

// Ruta para crear un nuevo cliente
app.post('/api/clientes', (req, res) => {
  const { NombreCliente, Telefono, Email, Direccion } = req.body;

  if (!NombreCliente || !Telefono) {
    return res.status(400).send('NombreCliente y Telefono son requeridos');
  }

  const query = `
    INSERT INTO Clientes (NombreCliente, Telefono, Email, Direccion)
    VALUES (?, ?, ?, ?)
  `;

  db.query(query, [NombreCliente, Telefono, Email, Direccion], (err, results) => {
    if (err) {
      console.error(err);
      return res.status(500).send('Error al crear el cliente');
    }
    res.status(201).json({ ClienteID: results.insertId, NombreCliente, Telefono, Email, Direccion });
  });
});

// Ruta para editar un cliente
app.put('/api/clientes/:id', (req, res) => {
  const { id } = req.params;
  const { NombreCliente, Telefono, Email, Direccion } = req.body;

  const query = `
    UPDATE Clientes
    SET NombreCliente = ?, Telefono = ?, Email = ?, Direccion = ?
    WHERE ClienteID = ?
  `;

  db.query(query, [NombreCliente, Telefono, Email, Direccion, id], (err, results) => {
    if (err) {
      console.error(err);
      return res.status(500).send('Error al actualizar el cliente');
    }
    res.json({ ClienteID: id, NombreCliente, Telefono, Email, Direccion });
  });
});

// Ruta para eliminar un cliente
app.delete('/api/clientes/:id', (req, res) => {
  const { id } = req.params;

  const query = 'DELETE FROM Clientes WHERE ClienteID = ?';

  db.query(query, [id], (err, results) => {
    if (err) {
      console.error(err);
      return res.status(500).send('Error al eliminar el cliente');
    }
    res.status(204).send(); // No content response for successful deletion
  });
});




//-----------------------------------------------------SECCION PRODUCTOS------------------------------------------------------------
// Ruta para obtener los productos
app.get('/api/productos', (req, res) => {
  const query = `
    SELECT p.ProductoID, p.NombreProducto, p.Descripcion, p.PrecioCompra, p.PrecioVenta, p.Stock, c.NombreCategoria 
    FROM Productos p 
    JOIN Categorias c ON p.CategoriaID = c.CategoriaID
  `;
  db.query(query, (err, results) => {
    if (err) {
      console.error(err);
      return res.status(500).send('Error al obtener los productos');
    }
    res.json(results);
  });
});

// Ruta para obtener todas las categorías
app.get('/api/categorias', (req, res) => {
  db.query('SELECT * FROM Categorias', (err, results) => {
    if (err) {
      console.error(err);
      return res.status(500).send('Error al obtener las categorías');
    }
    res.json(results);
  });
});

// Ruta para crear un nuevo producto
app.post('/api/productos', (req, res) => {
  const { CategoriaID, NombreProducto, Descripcion, PrecioCompra, PrecioVenta, Stock } = req.body;

  if (!CategoriaID || !NombreProducto || !PrecioCompra || !PrecioVenta) {
    return res.status(400).send('Todos los campos son requeridos');
  }

  const query = `
    INSERT INTO Productos (CategoriaID, NombreProducto, Descripcion, PrecioCompra, PrecioVenta, Stock)
    VALUES (?, ?, ?, ?, ?, ?)
  `;

  db.query(query, [CategoriaID, NombreProducto, Descripcion, PrecioCompra, PrecioVenta, Stock], (err, results) => {
    if (err) {
      console.error(err);
      return res.status(500).send('Error al crear el producto');
    }
    res.status(201).json({ ProductoID: results.insertId, NombreProducto, Descripcion, PrecioCompra, PrecioVenta, Stock });
  });
});

// Ruta para editar un producto
app.put('/api/productos/:id', (req, res) => {
  const { id } = req.params;
  const { CategoriaID, NombreProducto, Descripcion, PrecioCompra, PrecioVenta, Stock } = req.body;

  const query = `
    UPDATE Productos
    SET CategoriaID = ?, NombreProducto = ?, Descripcion = ?, PrecioCompra = ?, PrecioVenta = ?, Stock = ?
    WHERE ProductoID = ?
  `;

  db.query(query, [CategoriaID, NombreProducto, Descripcion, PrecioCompra, PrecioVenta, Stock, id], (err, results) => {
    if (err) {
      console.error(err);
      return res.status(500).send('Error al actualizar el producto');
    }
    res.json({ ProductoID: id, NombreProducto, Descripcion, PrecioCompra, PrecioVenta, Stock });
  });
});

// Ruta para eliminar un producto
app.delete('/api/productos/:id', (req, res) => {
  const { id } = req.params;

  const query = 'DELETE FROM Productos WHERE ProductoID = ?';

  db.query(query, [id], (err, results) => {
    if (err) {
      console.error(err);
      return res.status(500).send('Error al eliminar el producto');
    }
    res.status(204).send(); // No content response for successful deletion
  });
});




//-----------------------------------------------------SECCION COMPRAS------------------------------------------------------------
// Ruta para obtener proveedores
app.get('/api/proveedores', (req, res) => {
  const query = 'SELECT * FROM Proveedores';
  db.query(query, (err, results) => {
    if (err) {
      return res.status(500).json({ message: 'Error al obtener proveedores' });
    }
    res.json(results);
  });
});

// Ruta para obtener productos
app.get('/api/productos', (req, res) => {
  const query = 'SELECT * FROM Productos';
  db.query(query, (err, results) => {
    if (err) {
      return res.status(500).json({ message: 'Error al obtener productos' });
    }
    res.json(results);
  });
});

// Ruta para crear una nueva compra
app.post('/api/compras', (req, res) => {
  const { proveedorID, usuarioID, productos } = req.body;

  // Calcular el total de la compra
  const totalCompra = productos.reduce((total, producto) => total + producto.precioUnitario * producto.cantidad, 0);

  // Insertar la compra en la base de datos
  const queryCompra = 'INSERT INTO Compras (ProveedorID, UsuarioID, TotalCompra) VALUES (?, ?, ?)';
  db.query(queryCompra, [proveedorID, usuarioID, totalCompra], (err, result) => {
    if (err) {
      return res.status(500).json({ message: 'Error al registrar la compra' });
    }

    // Obtener el ID de la compra recién creada
    const compraID = result.insertId;

    // Insertar los productos en el detalle de la compra
    const detalleQuery = 'INSERT INTO DetalleCompras (CompraID, ProductoID, Cantidad, PrecioUnitario, Subtotal) VALUES (?, ?, ?, ?, ?)';
    productos.forEach(producto => {
      const subtotal = producto.precioUnitario * producto.cantidad;
      db.query(detalleQuery, [compraID, producto.productoID, producto.cantidad, producto.precioUnitario, subtotal], (err) => {
        if (err) {
          console.error('Error al insertar el detalle de la compra:', err);
        }
      });

      // Actualizar el stock del producto en la base de datos
      const queryActualizarStock = 'UPDATE Productos SET Stock = Stock + ? WHERE ProductoID = ?';
      db.query(queryActualizarStock, [producto.cantidad, producto.productoID], (err) => {
        if (err) {
          console.error('Error al actualizar el stock del producto:', err);
        }
      });
    });

    res.status(200).json({ message: 'Compra registrada correctamente' });
  });
});

// Ruta para obtener todas las compras
app.get('/api/compras', (req, res) => {
  const query = 'SELECT * FROM Compras';
  db.query(query, (err, results) => {
    if (err) {
      return res.status(500).json({ message: 'Error al obtener compras' });
    }
    res.json(results);
  });
});

// Ruta para obtener el detalle de una compra
app.get('/api/compras/:compraID', (req, res) => {
  const { compraID } = req.params;
  const query = `
    SELECT dc.DetalleCompraID, p.NombreProducto, dc.Cantidad, dc.PrecioUnitario, dc.Subtotal
    FROM DetalleCompras dc
    JOIN Productos p ON dc.ProductoID = p.ProductoID
    WHERE dc.CompraID = ?
  `;
  db.query(query, [compraID], (err, results) => {
    if (err) {
      return res.status(500).json({ message: 'Error al obtener el detalle de la compra' });
    }
    res.json(results);
  });
});




//-----------------------------------------------------SECCION VENTAS------------------------------------------------------------
// Ruta para crear una nueva venta
app.post('/api/ventas', (req, res) => {
  const { clienteID, productos } = req.body;
  const usuarioID = req.headers['usuario-id'];  // Obtener el UsuarioID desde los headers

  // Calcular el total de la venta
  const totalVenta = productos.reduce((total, producto) => total + producto.precioUnitario * producto.cantidad, 0);

  // Insertar la venta en la base de datos
  const queryVenta = 'INSERT INTO Ventas (ClienteID, UsuarioID, TotalVenta) VALUES (?, ?, ?)';
  db.query(queryVenta, [clienteID, usuarioID, totalVenta], (err, result) => {
    if (err) {
      return res.status(500).json({ message: 'Error al registrar la venta' });
    }

    // Obtener el ID de la venta recién creada
    const ventaID = result.insertId;

    // Insertar los productos en el detalle de la venta
    const detalleQuery = 'INSERT INTO DetalleVentas (VentaID, ProductoID, Cantidad, PrecioUnitario, Subtotal) VALUES (?, ?, ?, ?, ?)';
    productos.forEach(producto => {
      const subtotal = producto.precioUnitario * producto.cantidad;
      db.query(detalleQuery, [ventaID, producto.productoID, producto.cantidad, producto.precioUnitario, subtotal], (err) => {
        if (err) {
          console.error('Error al insertar el detalle de la venta:', err);
        }
      });

      // Actualizar el stock del producto en la base de datos
      const queryActualizarStock = 'UPDATE Productos SET Stock = Stock - ? WHERE ProductoID = ?';
      db.query(queryActualizarStock, [producto.cantidad, producto.productoID], (err) => {
        if (err) {
          console.error('Error al actualizar el stock del producto:', err);
        }
      });
    });

    res.status(200).json({ message: 'Venta registrada correctamente' });
  });
});





app.listen(port, () => {
  console.log(`Servidor corriendo en http://localhost:${port}`);
});

