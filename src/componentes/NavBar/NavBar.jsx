import React from 'react'
import '../NavBar/NavBar.css'
import Logo from '../Logo/Logo';

function NavBar() {

  return (
    <div className='contenedor'>
      <div className='contenedor-grid'>
        <div className="grid-item1">
            <div className="contenedor-img-nav">
              <Logo/>
            </div>
        </div>
        <div className="grid-item2"></div>
        <div className="grid-item3"></div>
        <div className="grid-item4"></div>
      </div>
    </div>
  )
}

export default NavBar