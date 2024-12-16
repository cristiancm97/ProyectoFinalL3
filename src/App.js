import React from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import Login from './components/Login';
import Dashboard from './components/Dashboard';
import Usuarios from './components/Usuarios';
import Productos from './components/Productos';
import Proveedores from './components/Proveedores';
import Categorias from './components/Categorias';
import Ventas from './components/Ventas';
import Compras from './components/Compras';
import ProtectedRoute from './components/ProtectedRoute';
import Clientes from './components/Clientes';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/" element={<ProtectedRoute><Dashboard /></ProtectedRoute>}>
          <Route path="productos" element={<Productos />} />
          <Route path="proveedores" element={<Proveedores />} />
          <Route path="categorias" element={<Categorias />} />
          <Route path="clientes" element={<Clientes />}/>
          <Route path="ventas" element={<Ventas />} />
          <Route path="compras" element={<Compras />} />
          <Route path="usuarios" element={<ProtectedRoute allowedRoles={['Dueño']}><Usuarios /></ProtectedRoute>} />
        </Route>
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </Router>
  );
}

export default App;
