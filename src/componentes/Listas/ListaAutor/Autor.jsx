import React, { useState, useRef, useEffect } from 'react';
import './Autor.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrash, faPencil } from '@fortawesome/free-solid-svg-icons';


function Autor({ nombre, bibliografia, fechaNac}) {
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
    <div className="contenedor-autor-item-lista">
      <div className="autor-container">
        <div 
          onClick={toggleDesplegable}
          className="autor-header"
        >
          <div className='detalles-autor'><strong>{nombre}</strong></div>
          <div className="btn-autor-editar">
            <FontAwesomeIcon icon={faPencil} style={{width: '20px', height:'20px', color:'white'}}/>
          </div>
          <div className="btn-autor-eliminar">
            <FontAwesomeIcon icon={faTrash} style={{width: '20px', height:'20px', color:'white'}}/>
          </div>
        </div>
        <div ref={detailsRef} className="autor-details">
          <p className='detalles-autor'>Bibliografia: {bibliografia}</p>
          <p className='detalles-autor'>Fecha de nacimiento: {fechaNac}</p>
        </div>
      </div>
    </div>
  );
}

export default Autor;