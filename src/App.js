import './App.css';
import { BrowserRouter,Routes, Route } from 'react-router-dom';
import Registro from './componentes/pages/Registro';
import Login from './componentes/pages/Home';
import HomeUsuario from './componentes/pages/HomeUsuario';
import HomeEmpleado from './componentes/pages/HomeEmpleado';
import RecuperarPassword from './componentes/pages/RecuperarPassword';
function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Login/>}/>
          <Route path="/registro" element={<Registro/>}/>
          <Route path="/user" element={<HomeUsuario/>}/>
          <Route path="/admin" element={<HomeEmpleado/>}/>
          <Route path="/recuperar-password" element={<RecuperarPassword/>}/>
        </Routes>
      </BrowserRouter>     
    </div>
  );
}

export default App;
