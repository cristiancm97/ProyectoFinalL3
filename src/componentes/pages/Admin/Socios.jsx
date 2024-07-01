import React,{useState} from 'react'
import NavBarAdmin from '../../NavBar/NavBarAdmin'
import Footer from '../../Footer/Footer'
import './Socios.css'
import FormRegistro from '../../FormRegistro/FormRegistro'
import ListaUsuarios from '../../Listas/ListaSocios/ListaUsuario'


function Socios() {

  const [accionSocio,setAccionSocio] = useState ("Seleccion una opción")

  const renderComponent = () => {
    switch (accionSocio) {
        case "Dar de alta un socio":
            return <FormRegistro/>
        case "Ver lista de socios":
            return <ListaUsuarios/>
        default:
            return null; // Renderiza null si no se ha seleccionado ninguna opción válida
    }
  }

  return (
    <div>
      <NavBarAdmin/>
      <div className="acciones-admine">
        <h2 className="titulo-admine">Que desea hacer:</h2>
        <select className='acciones-titulo-admine' value={accionSocio} onChange={(e) => setAccionSocio(e.target.value)} required>
        <option value="Seleccione una opción">Seleccione una opción</option>
          <option value="Ver lista de socios">Ver lista de socios</option>
          <option value="Dar de alta un socio">Dar de alta un socio</option>
        </select>
      </div>
      <div>
      {renderComponent()}
      </div>
      <Footer/>
    </div>
  )
}

export default Socios
