import React from 'react'
import { useNavigate } from 'react-router-dom'
import '../NavBar/NavBarAdmin.css'
import LogoAdmin from '../Logo/LogoAdmin';

function NavBarAdmin() {

  const navigate = useNavigate();

  return (
    <div className='contenedor-nba'>
      <div className='contenedor-grid-nba'>
        <div className="grid-item1-nba">
            <div className="contenedor-img-nav-nba">
              <LogoAdmin/>
            </div>
        </div>
        <div className="grid-item2-nba">
          <div className="opc1-nba" onClick={()=> navigate("/admin/empleados")}>Empleados</div>
          <div className="opc2-nba" onClick={()=> navigate("/admin/socios")}>Socios</div>
          <div className="opc3-nba" onClick={()=> navigate("/admin/inventario")}>Inventario</div>
        </div>
        <div className="grid-item3-nba">
        <button className='btn-logout' id='btn-navbar' onClick={() => navigate("/")}>Logout</button>
        </div>
      </div>
    </div>
  )
}

export default NavBarAdmin