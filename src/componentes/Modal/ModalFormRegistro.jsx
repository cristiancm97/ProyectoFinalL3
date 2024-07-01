import React from 'react';
import Modal from 'react-modal';// Asegúrate de importar correctamente
import './ModalFormRegistro.css'
import FormRegistro from '../FormRegistro/FormRegistro'


// Establece un contenedor para el modal en la app
Modal.setAppElement('#root');

const ModalFormRegistro = ({ isOpen, onClose }) => {
  return (

    <Modal
      isOpen={isOpen}
      onRequestClose={onClose}
      contentLabel="Formulario de Registro"
    >
      <FormRegistro/>
      <div className="contenedor-btnCerrar">
        <button className='agregarCerrar' onClick={onClose}><strong>Cerrar</strong></button>
      </div>
      
    </Modal>
  );
};

export default ModalFormRegistro;