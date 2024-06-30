import React, {useState} from 'react'
import '../pages/Home.css'
import BtnFlotanteWp from '../BtnFlotanteWsp/BtnFlotanteWsp';

function Login() {
  const [usuario, setUsuario] = useState("");
  const [password, setPassword] = useState("");

  const handleRecuperarPassword = () => {
      window.location.href = '/recuperar-password'; // Reemplaza con la URL de tu página de recuperación de contraseña
  };

  const handleRegistroClub = () => {
      window.location.href = '/registro'; // Reemplaza con la URL de tu página de registro
  };

  const mensaje = () => {
      const usuarioInput = document.getElementById('user').value;
      const passwordInput = document.getElementById('password').value;

      // Verificar usuario y contraseña
      if (usuarioInput === 'admin' && passwordInput === '123') {
          // Redireccionar al link deseado
          window.location.href = '/admin'; // Reemplaza con la URL a donde quieras redireccionar
      } else if (usuarioInput === 'user' && passwordInput === '123') {
          // Redireccionar al link deseado
          window.location.href = `/users/${usuarioInput}`; // Reemplaza con la URL a donde quieras redireccionar
      } else if (usuarioInput === 'empleado' && passwordInput === '123') {
          // Redireccionar al link deseado
          window.location.href = `/empleados/${usuarioInput}`; // Reemplaza con la URL a donde quieras redireccionar
      } else {
          alert("Usuario o contraseña incorrectos");
          // Limpiar campos de usuario y contraseña
          setUsuario("");
          setPassword("");
      }
  };

  return (
    <div>
        <div id='contenedor-login'>
            <div className='flex-login'>
                <div className="contenedor-img-login" id='img-negocio'></div>                    
                <h2 className='titulo-login'>Bienvenido</h2>
                <div className="formulario-user">
                  <input type='text' placeholder='   Usuario' className='input-usuario' id='user' value={usuario} onChange={(e) => setUsuario(e.target.value)} />
                  <input type='password' placeholder='   Contraseña' className='input-contraseña' id='password' value={password} onChange={(e) => setPassword(e.target.value)} />                       
                  <button className='btn-iniciar-sesion' onClick={mensaje}>Iniciar Sesión</button>
                </div>
                <p className='recuperar-password-user' onClick={handleRecuperarPassword}>¿Has olvidado tu contraseña?</p>
                <p className='registro-user' onClick={handleRegistroClub}>¿Eres nuevo? Resgistrate aquí</p>
            </div>
        </div>
        <div className="contenedor-btnFlotanteWsp">
            <BtnFlotanteWp
          NroCelular={'3814653130'}
        />
        </div>
    </div>
  )
}

export default Login