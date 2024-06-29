import React from 'react'
import { useNavigate } from 'react-router-dom'
import '../NavBar/NavBarAdmin.css'
import LogoEmpleado from '../Logo/LogoEmpleado';

function NavBarAdmin() {

  const navigate = useNavigate();

  return (
    <div className='contenedor-nba'>
      <div className='contenedor-grid-nba'>
        <div className="grid-item1-nba">
            <div className="contenedor-img-nav-nba">
              <LogoEmpleado/>
            </div>
        </div>
        <div className="grid-item2-nba"></div>
        <div className="grid-item3-nba"></div>
        <div className="grid-item4-nba">
        <button className='btn-logout' id='btn-navbar' onClick={() => navigate("/")}>Logout</button>
        </div>
      </div>
    </div>
  )
}

export default NavBarAdmin