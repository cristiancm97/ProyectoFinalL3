import React, {useState} from 'react'
import Footer from '../../Footer/Footer';
import NavBarEmpleado from '../../NavBar/NavBarEmpleado';
import ListaUsuarios from '../../Listas/ListaSocios/ListaUsuario';
import './Socios.css'
import ModalFormRegistro from '../../Modal/ModalFormRegistro';

function Sociose() {

  const [modalIsOpen, setModalIsOpen] = useState(false);

  const openModal = () => {
    setModalIsOpen(true);
  };

  const closeModal = () => {
    setModalIsOpen(false);
  };

  return (
    <div>
      <NavBarEmpleado/>
      <div className="contenedor-btnAgregarSocio">
        <button className='agregarSocio' onClick={openModal}><strong>Agregar socio</strong></button>
      </div>
      <ModalFormRegistro isOpen={modalIsOpen} onClose={closeModal} />
      <ListaUsuarios/>
      <Footer/>
    </div>
  )
}

export default Sociose;