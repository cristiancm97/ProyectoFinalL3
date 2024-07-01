import React, { useState, useEffect } from 'react';
import './FormAutor.css';
import Modal from '../Modal/Modal';

function FormAutor() {
  const [nombre, setNombre] = useState('');
  const [bibliografia, setBibliografia] = useState('');
  const [fechaNac, setFechaNac] = useState('');
  const [isSubmitDisabled, setIsSubmitDisabled] = useState(true);
  const [modalVisible, setModalVisible] = useState(false);
  const [mensaje, setMensaje] = useState('');

  useEffect(() => {
    // Habilitar el botón de envío solo si todos los campos están completos
    const isFormValid =
      nombre && bibliografia && fechaNac;
    setIsSubmitDisabled(!isFormValid);
  }, [nombre, bibliografia, fechaNac]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const autor = {
        nombre,
        bibliografia,
        fechaNac,
      };
    
    console.log(autor)

    // Limpia los campos del formulario después de enviarlo
    setNombre('');
    setBibliografia('');
    setFechaNac('');
    
  
    // Mostrar el modal
    setModalVisible(true);

    // Oculta el modal después de 1 segundo y limpia el mensaje
    setTimeout(() => {
      setModalVisible(false);
      setMensaje('');
    }, 1000);
  };
  

  return (
    <div className="form-container">
      <h1>Formulario alta de categoria de autor literario</h1>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label>Nombre:</label>
          <input type="text" value={nombre} onChange={(e) => setNombre(e.target.value)} required />
        </div>
        <div className="form-group">
          <label>Bibliografia:</label>
          <textarea value={bibliografia} onChange={(e) => setBibliografia(e.target.value)} id='input-descripcion-libro'required />
        </div>
        <div className="form-group">
          <label>Fecha de Nacimiento:</label>
          <input type="date" value={fechaNac} onChange={(e) => setFechaNac(e.target.value)} required />
        </div>
        <div className="button-container">
          <button id='btn-registro' type="submit" disabled={isSubmitDisabled}>Enviar</button>
        </div>
      </form>

    
      {/* Renderiza el modal si modalVisible es true */}
      {modalVisible && (
        <Modal
        tituloMsj="Categoria de genero creado"
        cuerpoMsj={"Genero cargado en el sistema"}
      />
      )}
    </div>
  );
}

export default FormAutor;