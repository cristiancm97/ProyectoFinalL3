import React, { useState, useRef, useEffect } from 'react';
import './Libro.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrash, faPencil } from '@fortawesome/free-solid-svg-icons';


function Libro({ titulo, autor, anio_publicacion, genero , copias }) {
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
    <div className="contenedor-libro-item-lista">
      <div className="libro-container">
        <div 
          onClick={toggleDesplegable}
          className="libro-header"
        >
          <div className='detalles-libro'><strong>{titulo}</strong></div>
          <div className="btn-libro-editar">
            <FontAwesomeIcon icon={faPencil} style={{width: '20px', height:'20px', color:'white'}}/>
          </div>
          <div className="btn-libro-eliminar">
            <FontAwesomeIcon icon={faTrash} style={{width: '20px', height:'20px', color:'white'}}/>
          </div>
        </div>
        <div ref={detailsRef} className="libro-details">
          <p className='detalles-libro'>Autor: {autor}</p>
          <p className='detalles-libro'>Año de Publicacion: {anio_publicacion}</p>
          <p className='detalles-libro'>Genero: {genero}</p>
          <p className='detalles-libro'>Copias disponibles: {copias}</p>
        </div>
      </div>
    </div>
  );
}

export default Libro;