import React from 'react'
import '../NavBar/NavBarUsuario.css'
import { useNavigate } from 'react-router-dom'
import LogoUsuario from '../Logo/LogoUsuario';

function NavBarUsuario({id}) {

  const navigate2 = useNavigate();

  return (
    <div className='contenedor-nbu'>
      <div className='contenedor-grid-nbu'>
        <div className="grid-item1-nbu">
            <div className="contenedor-img-nav-nbu">
              <LogoUsuario/>
            </div>
        </div>
        <div className="grid-item2-nbu">
          <div className="opc1-nbu" onClick={()=> navigate2(`/users/${id}/perfilu`)}>Mi Perfil</div>
          <div className="opc2-nbu" onClick={()=> navigate2(`/users/${id}/librosu`)}>Libros</div>
          <div className="opc3-nbu" onClick={()=> navigate2(`/users/${id}/reservasu`)}>Mis Reservas</div>
        </div>
        <div className="grid-item3-nbu">
        <button className='btn-logout' id='btn-navbar' onClick={() => navigate2("/")}>Logout</button>
        </div>
      </div>
    </div>
  )
}

export default NavBarUsuario