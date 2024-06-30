import React, { useState, useEffect } from 'react';
import './FormEmpleado.css';
import Modal from '../Modal/Modal';

function FormEmpleado() {
  const [nombre, setNombre] = useState('');
  const [apellido, setApellido] = useState('');
  const [celular, setCelular] = useState('');
  const [dni, setDni] = useState('');
  const [domicilio, setDomicilio] = useState('');
  const [localidad, setLocalidad] = useState('San Miguel de Tucumán');
  const [posicion, setPosicion] = useState('Secretario/a');
  const [correo, setCorreo] = useState('');
  const [usuario, setUsuario] = useState('');
  const [password, setPassword] = useState('');
  const [isSubmitDisabled, setIsSubmitDisabled] = useState(true);
  const [modalVisible, setModalVisible] = useState(false);
  const [mensaje, setMensaje] = useState('');

  useEffect(() => {
    // Habilitar el botón de envío solo si todos los campos están completos
    const isFormValid =
      nombre && apellido && celular && dni && domicilio && posicion && correo && usuario && password;
    setIsSubmitDisabled(!isFormValid);
  }, [nombre, apellido, celular, dni, domicilio, posicion, correo,  usuario, password]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const user = {
        nombre,
        apellido,
        celular,
        dni,
        domicilio,
        localidad,
        posicion,
        correo,
        usuario,
        password,
        role:"empleado",
      };
    
    console.log(user)

    // Limpia los campos del formulario después de enviarlo
    setNombre('');
    setApellido('');
    setCelular('');
    setDni('');
    setDomicilio('');
    setPosicion('Secretario/a');;
    setCorreo('');
    setUsuario('');
    setPassword('');
    
  
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
      <h1>Formulario alta de empleado</h1>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label>Nombre/s:</label>
          <input type="text" value={nombre} onChange={(e) => setNombre(e.target.value)} required />
        </div>
        <div className="form-group">
          <label>Apellido/s:</label>
          <input type="text" value={apellido} onChange={(e) => setApellido(e.target.value)} required />
        </div>
        <div className="form-group">
          <label>Nro de celular:</label>
          <input type="number" value={celular} onChange={(e) => setCelular(e.target.value)} required />
        </div>
        <div className="form-group">
          <label>DNI:</label>
          <input type="number" value={dni} onChange={(e) => setDni(e.target.value)} required />
        </div>
        <div className="form-group">
          <label>Domicilio:</label>
          <input type="text" value={domicilio} onChange={(e) => setDomicilio(e.target.value)} required />
        </div>
        <div className="form-group">
          <label>Localidad:</label>
          <select id="select" value={localidad} onChange={(e) => setLocalidad(e.target.value)} required>
            <option value="San Miguel de Tucumán">San Miguel de Tucumán</option>
            <option value="Yerba Buena">Yerba Buena</option>
            <option value="Tafí Viejo">Tafí Viejo</option>
            <option value="Banda del rio sali">Banda del rio sali</option>
            <option value="Alderetes">Alderetes</option>
          </select>
        </div>
        <div className="form-group">
          <label>Puesto de trabajo:</label>
          <select id="select" value={posicion} onChange={(e) => setPosicion(e.target.value)} required>
            <option value="Secretario/a">Secretario/a</option>
            <option value="Personal de salon">Personal de salon</option>
            <option value="Encargado/a">Encargado/a</option>
          </select>
        </div>
        <div className="form-group">
          <label>Correo Electrónico:</label>
          <input type="email" value={correo} onChange={(e) => setCorreo(e.target.value)} required />
        </div>
        <div className="form-group">
          <label>Usuario:</label>
          <input type="text" value={usuario} onChange={(e) => setUsuario(e.target.value)} required />
        </div>
        <div className="form-group">
          <label>Contraseña:</label>
          <input type="text" value={password} onChange={(e) => setPassword(e.target.value)} required />
        </div>
        <div className="button-container">
          <button id='btn-registro' type="submit" disabled={isSubmitDisabled}>Enviar</button>
        </div>
      </form>

    
      {/* Renderiza el modal si modalVisible es true */}
      {modalVisible && (
        <Modal
        tituloMsj="Perfil creado"
        cuerpoMsj={"Bienvenido al equipo"}
      />
      )}
    </div>
  );
}

export default FormEmpleado;