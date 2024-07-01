import React from 'react'
import Footer from '../../Footer/Footer'
import NavBarEmpleado from '../../NavBar/NavBarEmpleado'
import FormGenero from '../../FormRegistro/FormGenero'
import ListaGenero from '../../Listas/ListaGenero/ListaGenero'

function Generoe() {
  return (
    <div>
      <NavBarEmpleado/>
      <ListaGenero/>
      <FormGenero/>
      <Footer/>
    </div>
  )
}

export default Generoe
