import React from 'react'
import { useNavigate } from 'react-router-dom'
import '../Logo/LogoAdmin.css'

function LogoAdmin({id}) {

    const navigate = useNavigate();

  return (
    <div>
      <div className="contenedor-img-logo-la" onClick={() => navigate(`/admin`)}></div>
    </div>
  )
}

export default LogoAdmin