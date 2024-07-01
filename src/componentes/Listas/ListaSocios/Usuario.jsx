import React, { useState, useRef, useEffect } from 'react';
import './Usuario.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrash, faPencil } from '@fortawesome/free-solid-svg-icons';


function Usuario({ nombre, apellido, celular, dni, domicilio, localidad, correo, usuario  }) {
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
    <div className="contenedor-usuario-item-lista">
      <div className="usuario-container">
        <div 
          onClick={toggleDesplegable}
          className="usuario-header"
        >
          <div className='detalles-socio'><strong>{apellido}, {nombre}</strong></div>
          <div className="btn-usuario-editar">
            <FontAwesomeIcon icon={faPencil} style={{width: '20px', height:'20px', color:'white'}}/>
          </div>
          <div className="btn-usuario-eliminar">
            <FontAwesomeIcon icon={faTrash} style={{width: '20px', height:'20px', color:'white'}}/>
          </div>
        </div>
        <div ref={detailsRef} className="usuario-details">
          <p className='detalles-socio'>Celular: {celular}</p>
          <p className='detalles-socio'>DNI: {dni}</p>
          <p className='detalles-socio'>Domicilio: {domicilio}</p>
          <p className='detalles-socio'>Localidad: {localidad}</p>
          <p className='detalles-socio'>Correo: {correo}</p>
          <p className='detalles-socio'>Usuario: {usuario}</p>
        </div>
      </div>
    </div>
  );
}

export default Usuario;