import React from 'react'
import { useNavigate } from 'react-router-dom'
import '../Logo/LogoEmpleado.css'

function LogoEmpleado({id}) {

    const navigate1 = useNavigate();

  return (
    <div>
      <div className="contenedor-img-logo-le" onClick={() => navigate1(`/empleados/${id}`)}></div>
    </div>
  )
}

export default LogoEmpleado