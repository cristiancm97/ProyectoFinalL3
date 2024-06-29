import React, { useEffect } from 'react';
import './Modal.css';

function Modal({tituloMsj,cuerpoMsj}) {
  useEffect(() => {
    // Oculta el modal después de 1 segundo
    const timer = setTimeout(() => {
      document.getElementById('modal').style.display = 'none';
    }, 1000);

    return () => clearTimeout(timer);
  }, []);

  return (
    <div id="modal" className="modal-overlay">
      <div className="modal">
        <h2>{tituloMsj}</h2>
        <p>{cuerpoMsj}</p>
      </div>
    </div>
  );
}

export default Modal;
