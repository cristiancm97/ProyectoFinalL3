import React from 'react'
import { useNavigate } from 'react-router-dom'
import '../NavBar/NavBarEmpleado.css'
import LogoEmpleado from '../Logo/LogoEmpleado';

function NavBarEmpleado({id}) {

  const navigate1 = useNavigate();

  return (
    <div className='contenedor-nbe'>
      <div className='contenedor-grid-nbe'>
        <div className="grid-item1-nbe">
            <div className="contenedor-img-nav-nbe">
              <LogoEmpleado/>
            </div>
        </div>
        <div className="grid-item2-nbe">
          <div className="opc1-nbe" onClick={()=> navigate1(`/empleados/${id}/sociose`)}>Socios</div>
          <div className="opc2-nbe" onClick={()=> navigate1(`/empleados/${id}/autorese`)}>Autores</div>
          <div className="opc3-nbe" onClick={()=> navigate1(`/empleados/${id}/generoe`)}>Generos</div>
          <div className="opc4-nbe" onClick={()=> navigate1(`/empleados/${id}/librose`)}>Libros</div>
          <div className="opc5-nbe" onClick={()=> navigate1(`/empleados/${id}/prestamose`)}>Prestamos</div>
        </div>
        <div className="grid-item3-nbe">
        <button className='btn-logout' id='btn-navbar' onClick={() => navigate1("/")}>Logout</button>
        </div>
      </div>
    </div>
  )
}

export default NavBarEmpleado