import React from 'react'
import { useNavigate } from 'react-router-dom'
import '../Logo/LogoUsuario.css'

function LogoUsuario({id}) {

    const navigate = useNavigate();

  return (
    <div>
      <div className="contenedor-img-logo-lu" onClick={() => navigate(`/users/${id}`)}></div>
    </div>
  )
}

export default LogoUsuario