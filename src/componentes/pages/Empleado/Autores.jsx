import React from 'react'
import Footer from '../../Footer/Footer'
import NavBarEmpleado from '../../NavBar/NavBarEmpleado';
import FormAutor from '../../FormRegistro/FormAutor';
import ListaAutor from '../../Listas/ListaAutor/ListaAutor';

function Autorese() {
  return (
    <div>
      <NavBarEmpleado/>
      <ListaAutor/>
      <FormAutor/> 
      <Footer/>
    </div>
  )
}

export default Autorese;