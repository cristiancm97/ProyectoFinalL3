import React, { useState, useRef, useEffect } from 'react';
import './Empleado.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrash, faPencil } from '@fortawesome/free-solid-svg-icons';


function Empleado({ nombre, apellido, celular, dni, domicilio, localidad,posicion, correo, usuario  }) {
  const [desplegado, setDesplegado] = useState(false);
  const detailsRef = useRef(null);

  const toggleDesplegable = () => {
    setDesplegado(!desplegado);
  };

  useEffect(() => {
    if (desplegado) {
      detailsRef.current.style.maxHeight = `${detailsRef.current.scrollHeight}px`;
    } else {
      detailsRef.current.style.maxHeight = '0px';
    }
  }, [desplegado]);

  return (
    <div className="contenedor-empleado-item-lista">
      <div className="empleado-container">
        <div 
          onClick={toggleDesplegable}
          className="empleado-header"
        >
          <div className='detalles-empleado'><strong>{apellido}, {nombre}</strong></div>
          <div className="btn-empleado-editar">
            <FontAwesomeIcon icon={faPencil} style={{width: '20px', height:'20px', color:'white'}}/>
          </div>
          <div className="btn-empleado-eliminar">
            <FontAwesomeIcon icon={faTrash} style={{width: '20px', height:'20px', color:'white'}}/>
          </div>
        </div>
        <div ref={detailsRef} className="usuario-details">
          <p className='detalles-empleado'>Celular: {celular}</p>
          <p className='detalles-empleado'>DNI: {dni}</p>
          <p className='detalles-empleado'>Domicilio: {domicilio}</p>
          <p className='detalles-empleado'>Localidad: {localidad}</p>
          <p className='detalles-empleado'>Puesto: {posicion}</p>
          <p className='detalles-empleado'>Correo: {correo}</p>
          <p className='detalles-empleado'>Usuario: {usuario}</p>
        </div>
      </div>
    </div>
  );
}

export default Empleado;