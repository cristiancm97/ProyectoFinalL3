import React from 'react'
import './Recepcion.css'

function Recepcion({nombre}) {
  return (
    <div className='contenedor-recepcion'>
      <h2 className="titulo-recepcion">Bienvenido, {nombre} a Biblioteca Sabiduria</h2>
      <h3 className="subtitulo-recepcion">Seleccione que desea gestionar</h3>

    </div>
  )
}

export default Recepcion
