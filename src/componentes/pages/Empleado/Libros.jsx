import React,{useState} from 'react'
import Footer from '../../Footer/Footer'
import NavBarEmpleado from '../../NavBar/NavBarEmpleado'
import ListaLibro from '../../Listas/ListaLibro/ListaLibro'
import ModalFormLibro from '../../Modal/ModalFormLibro'

function Librose() {

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
        <button className='agregarSocio' onClick={openModal}><strong>Agregar libro</strong></button>
      </div>
      <ModalFormLibro isOpen={modalIsOpen} onClose={closeModal} />
      <ListaLibro/>
      <Footer/>
    </div>
  )
}

export default Librose