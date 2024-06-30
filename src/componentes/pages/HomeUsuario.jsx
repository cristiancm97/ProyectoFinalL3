import React from 'react'
import Footer from '../Footer/Footer'
import NavBarUsuario from '../NavBar/NavBarUsuario'
import BtnFlotanteWp from '../BtnFlotanteWsp/BtnFlotanteWsp'
import Recepcion from '../Recepcion/Recepcion'

function HomeUsuario() {
  return (
    <div>
      <NavBarUsuario/>
      <Recepcion
        nombre={"Cristian Alejandro"}/>
      <Footer/>
      <div className="contenedor-btnFlotanteWsp">
            <BtnFlotanteWp
          NroCelular={'3814653130'}
        />
      </div>
    </div>
  )
}

export default HomeUsuario