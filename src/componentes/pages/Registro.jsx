import React from 'react'
import BtnFlotanteWp from '../BtnFlotanteWsp/BtnFlotanteWsp'
import FormRegistro from '../FormRegistro/FormRegistro'
import './Registro.css'
import Footer from '../Footer/Footer'
import NavBar from '../NavBar/NavBar'

function Registro() {
  return (
    <div className='contenedorRegistro'>
        <NavBar/>
        <FormRegistro/>
        <div className="contenedor-btnFlotanteWsp">
            <BtnFlotanteWp
          NroCelular={'3814653130'}
        />
      </div>
      <Footer/>
    </div>
  )
}

export default Registro