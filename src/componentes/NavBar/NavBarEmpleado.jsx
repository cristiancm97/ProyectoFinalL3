import React from 'react'
import { useNavigate } from 'react-router-dom'
import '../NavBar/NavBarEmpleado.css'
import LogoEmpleado from '../Logo/LogoEmpleado';

function NavBarEmpleado() {

  const navigate = useNavigate();

  return (
    <div className='contenedor-nbe'>
      <div className='contenedor-grid-nbe'>
        <div className="grid-item1-nbe">
            <div className="contenedor-img-nav-nbe">
              <LogoEmpleado/>
            </div>
        </div>
        <div className="grid-item2-nbe"></div>
        <div className="grid-item3-nbe"></div>
        <div className="grid-item4-nbe">
        <button className='btn-logout' id='btn-navbar' onClick={() => navigate("/")}>Logout</button>
        </div>
      </div>
    </div>
  )
}

export default NavBarEmpleado