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
function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Login/>}/>
          <Route path="/registro" element={<Registro/>}/>
          <Route path="/user" element={<HomeUsuario/>}/>
          <Route path="/admin" element={<HomeAdmin/>}/>
            <Route path='/admin/empleados' element={<Empleados/>}/>
            <Route path='/admin/socios' element={<Socios/>}/>
            <Route path='/admin/inventario' element={<Inventario/>}/>
          <Route path="/recuperar-password" element={<RecuperarPassword/>}/>
          <Route path='/empleados/:id' element={<HomeEmpleado/>}/>
          <Route path='/users/:id' element={<HomeUsuario/>}/>
        </Routes>
      </BrowserRouter>     
    </div>
  );
}

export default App;
