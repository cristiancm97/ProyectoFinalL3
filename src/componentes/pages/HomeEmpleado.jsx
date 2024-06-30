import React from 'react'
import Footer from '../Footer/Footer'
import NavBarEmpleado from '../NavBar/NavBarEmpleado'
import Recepcion from '../Recepcion/Recepcion'

function HomeEmpleado() {
  return (
    <div>
      <NavBarEmpleado/>
      <Recepcion
      nombre={"Cristian Alejandro"}/>
      <Footer/>
    </div>
  )
}

export default HomeEmpleado
