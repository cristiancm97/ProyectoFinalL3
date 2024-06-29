import React from 'react'
import '../NavBar/NavBarUsuario.css'
import { useNavigate } from 'react-router-dom'
import LogoUsuario from '../Logo/LogoUsuario';

function NavBarUsuario() {

  const navigate = useNavigate();

  return (
    <div className='contenedor-nbu'>
      <div className='contenedor-grid-nbu'>
        <div className="grid-item1-nbu">
            <div className="contenedor-img-nav-nbu">
              <LogoUsuario/>
            </div>
        </div>
        <div className="grid-item2-nbu">
          <div className="opc1-nbu"></div>
          <div className="opc2-nbu"></div>
          <div className="opc3-nbu"></div>
        </div>
        <div className="grid-item3-nbu">
          <button className='btn-logout' id='btn-navbar' onClick={() => navigate("/")}>Logout</button>
        </div>
      </div>
    </div>
  )
}

export default NavBarUsuario