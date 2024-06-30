import './App.css';
import { BrowserRouter,Routes, Route } from 'react-router-dom';
import Registro from './componentes/pages/Registro';
import Login from './componentes/pages/Home';
import HomeUsuario from './componentes/pages/HomeUsuario';
import HomeEmpleado from './componentes/pages/HomeEmpleado';
import RecuperarPassword from './componentes/pages/RecuperarPassword';
import HomeAdmin from './componentes/pages/HomeAdmin';
import Empleados from './componentes/pages/Admin/Empleados';
import Socios from './componentes/pages/Admin/Socios';
import Inventario from './componentes/pages/Admin/Inventario';
import Librose from './componentes/pages/Empleado/Libros';
import Autorese from './componentes/pages/Empleado/Autores';
import Sociose from './componentes/pages/Empleado/Socios';
import Generoe from './componentes/pages/Empleado/Genero';
import Librosu from './componentes/pages/Usuario/Libros';
import Perfilu from './componentes/pages/Usuario/Perfil';
import Reservasu from './componentes/pages/Usuario/Reservas';

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Login/>}/>
          <Route path="/registro" element={<Registro/>}/>
          <Route path="/admin" element={<HomeAdmin/>}/>
            <Route path='/admin/empleados' element={<Empleados/>}/>
            <Route path='/admin/socios' element={<Socios/>}/>
            <Route path='/admin/inventario' element={<Inventario/>}/>
          <Route path="/recuperar-password" element={<RecuperarPassword/>}/>
          <Route path='/empleados/:id' element={<HomeEmpleado/>}/>
            <Route path='/empleados/:id/sociose' element={<Sociose/>}/>
            <Route path='/empleados/:id/autorese/' element={<Autorese/>}/>
            <Route path='/empleados/:id/generoe' element={<Generoe/>}/>
            <Route path='/empleados/:id/librose' element={<Librose/>}/>
          <Route path='/users/:id' element={<HomeUsuario/>}/>
            <Route path='/users/:id/perfilu' element={<Perfilu/>}/>
            <Route path='/users/:id/librosu' element={<Librosu/>}/>
            <Route path='/users/:id/reservasu' element={<Reservasu/>}/>
        </Routes>
      </BrowserRouter>     
    </div>
  );
}

export default App;
