import React from 'react'
import FormEmpleado from '../FormRegistro/FormEmpleado'
import NavBarAdmin from '../NavBar/NavBarAdmin'
import Footer from '../Footer/Footer'

function HomeAdmin() {
  return (
    <div>
      <NavBarAdmin/>
      <FormEmpleado/>
      <Footer/>
    </div>
  )
}

export default HomeAdmin
