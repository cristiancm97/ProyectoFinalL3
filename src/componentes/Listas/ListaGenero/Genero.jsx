import React, { useState, useRef, useEffect } from 'react';
import './Genero.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrash, faPencil } from '@fortawesome/free-solid-svg-icons';


function Genero({ nombre, descripcion}) {
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
    <div className="contenedor-genero-item-lista">
      <div className="genero-container">
        <div 
          onClick={toggleDesplegable}
          className="genero-header"
        >
          <div className='detalles-genero'><strong>{nombre}</strong></div>
          <div className="btn-empleado-editar">
            <FontAwesomeIcon icon={faPencil} style={{width: '20px', height:'20px', color:'white'}}/>
          </div>
          <div className="btn-genero-eliminar">
            <FontAwesomeIcon icon={faTrash} style={{width: '20px', height:'20px', color:'white'}}/>
          </div>
        </div>
        <div ref={detailsRef} className="usuario-details">
          <p className='detalles-genero'>Descripcion: {descripcion}</p>
        </div>
      </div>
    </div>
  );
}

export default Genero;