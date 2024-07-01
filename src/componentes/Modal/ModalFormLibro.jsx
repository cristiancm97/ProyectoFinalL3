import React from 'react';
import Modal from 'react-modal';// Asegúrate de importar correctamente
import './ModalFormLibro.css'
import FormLibro from '../FormRegistro/FormLibro';


// Establece un contenedor para el modal en la app
Modal.setAppElement('#root');

const ModalFormLibro = ({ isOpen, onClose }) => {
  return (

    <Modal
      isOpen={isOpen}
      onRequestClose={onClose}
      contentLabel="Formulario de Registro"
    >
      <FormLibro/>
      <div className="contenedor-btnCerrar">
        <button className='agregarCerrar' onClick={onClose}><strong>Cerrar</strong></button>
      </div>
      
      
    </Modal>
  );
};

export default ModalFormLibro;