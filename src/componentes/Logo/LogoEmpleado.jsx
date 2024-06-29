import React from 'react'
import { useNavigate } from 'react-router-dom'
import '../Logo/LogoEmpleado.css'

function LogoEmpleado({id}) {

    const navigate = useNavigate();

  return (
    <div>
      <div className="contenedor-img-logo-le" onClick={() => navigate(`/empleados/${id}`)}></div>
    </div>
  )
}

export default LogoEmpleado