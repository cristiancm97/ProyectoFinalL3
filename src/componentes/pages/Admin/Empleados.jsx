import React, { useState } from 'react'
import NavBarAdmin from '../../NavBar/NavBarAdmin'
import "./Empleados.css"
import FormEmpleado from '../../FormRegistro/FormEmpleado'
import ListaEmpleado from '../../Listas/ListaEmpleado/ListaEmpleado'

function Empleados() {

  const [accionEmpleado,setAccionEmpleado] = useState ("Seleccion una opción")

  const renderComponent = () => {
    switch (accionEmpleado) {
        case "Dar de alta un empleado":
            return <FormEmpleado/>
        case "Ver lista de empleados":
            return <ListaEmpleado/>
        default:
            return null; // Renderiza null si no se ha seleccionado ninguna opción válida
    }
};

  return (
    <div>
      <NavBarAdmin/>
      <div className="acciones-admine">
        <h2 className="titulo-admine">Que desea hacer:</h2>
        <select className='acciones-titulo-admine' value={accionEmpleado} onChange={(e) => setAccionEmpleado(e.target.value)} required>
        <option value="Seleccione una opción">Seleccione una opción</option>
          <option value="Ver lista de empleados">Ver lista de empleados</option>
          <option value="Dar de alta un empleado">Dar de alta un empleado</option>
        </select>
      </div>
      <div>
        {renderComponent()}
      </div>
    </div>
  )
}

export default Empleados
