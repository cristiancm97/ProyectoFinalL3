import React from 'react'
import Footer from '../../Footer/Footer'
import NavBarEmpleado from '../../NavBar/NavBarEmpleado'
import ListaLibro from '../../Listas/ListaLibro/ListaLibro'

function Librose() {
  return (
    <div>
      <NavBarEmpleado/>
      <div className="contenedor-btnAgregarSocio">
        <button className='agregarSocio'><strong>Agregar libro</strong></button>
      </div>
      <ListaLibro/>
      <Footer/>
    </div>
  )
}

export default Librose