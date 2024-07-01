import React, { useState, useEffect } from 'react';
import './FormLibro.css';
import Modal from '../Modal/Modal';

function FormLibro() {

    const autores = [
        {"nombre": "Gabriel García Márquez", "bibliografia": "Cien años de soledad, El amor en los tiempos del cólera", "fechaNac": "1927/03/06"},
        {"nombre": "William Shakespeare", "bibliografia": "Hamlet, Romeo y Julieta, Macbeth", "fechaNac": "1564/04/23"},
        {"nombre": "J.R.R. Tolkien", "bibliografia": "El señor de los anillos, El hobbit", "fechaNac": "1892/01/03"},
        {"nombre": "Jane Austen", "bibliografia": "Orgullo y prejuicio, Sentido y sensibilidad", "fechaNac": "1775/12/16"},
        {"nombre": "George Orwell", "bibliografia": "1984, Rebelión en la granja", "fechaNac": "1903/06/25"},
        {"nombre": "Leo Tolstoy", "bibliografia": "Guerra y paz, Anna Karénina", "fechaNac": "1828/09/09"},
        {"nombre": "Homer", "bibliografia": "La Ilíada, La Odisea", "fechaNac": "-800/01/01"}
    ];

    const generos = [
        {"nombre": "Novela", "descripcion": "Narrativa extensa que desarrolla personajes, tramas y conflictos en profundidad, explorando la condición humana y la sociedad."},
        {"nombre": "Poesía", "descripcion": "Expresión artística mediante el uso estilizado del lenguaje, a menudo con métrica y ritmo, para transmitir emociones, ideas y sensaciones."},
        {"nombre": "Drama", "descripcion": "Representación literaria que presenta conflictos y emociones intensas, usualmente enfocada en momentos cruciales y decisiones impactantes."},
        {"nombre": "Ciencia ficción", "descripcion": "Exploración especulativa de futuros posibles, tecnología avanzada y sus impactos en la humanidad, a menudo mezclando ciencia y imaginación."},
        {"nombre": "Fantasía", "descripcion": "Exploración de mundos imaginarios, magia y seres sobrenaturales, desafiando las leyes naturales y explorando lo extraordinario."}
    ];

  const [titulo, setTitulo] = useState('');
  const [autorLibro, setAutorLibro] = useState('');
  const [anioPub, setAnioPub] = useState('');
  const [copias, setCopias] = useState('');
  const [generoLibro, setGeneroLibro] = useState('');
  const [isSubmitDisabled, setIsSubmitDisabled] = useState(true);
  const [modalVisible, setModalVisible] = useState(false);
  const [mensaje, setMensaje] = useState('');

  useEffect(() => {
    // Habilitar el botón de envío solo si todos los campos están completos
    const isFormValid =
      titulo && autorLibro && anioPub && copias && generoLibro;
    setIsSubmitDisabled(!isFormValid);
  }, [titulo, autorLibro, anioPub, copias, generoLibro]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const genero = {
        titulo,
        autorLibro,
        anioPub,
        copias,
        generoLibro,
      };
    
    console.log(genero)

    // Limpia los campos del formulario después de enviarlo
    setTitulo('');
    setAutorLibro('Seleccione un autor');
    setAnioPub('');
    setCopias('');
    setGeneroLibro('Seleccione un genero');
    
  
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
      <h1>Formulario alta de categoria de libro</h1>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label>Titulo:</label>
          <input type="text" value={titulo} onChange={(e) => setTitulo(e.target.value)} required />
        </div>

        <div className="form-group">
            <label>Autor:</label>
            <select value={autorLibro} onChange={(e) => setAutorLibro(e.target.value)} id='type-select' required>
                <option value="Seleccione un autor">Seleccione un autor</option>
                    {autores.map((autor, index) => (
                <option key={index} value={autor.nombre}>{autor.nombre}</option>
                ))}
            </select>
        </div>

        <div className="form-group">
            <label>Genero:</label>
            <select value={generoLibro} onChange={(e) => setGeneroLibro(e.target.value)} id='type-select' required>
                <option value="Seleccione un genero">Seleccione un genero</option>
                    {generos.map((genero, index) => (
                <option key={index} value={genero.nombre}>{genero.nombre}</option>
                ))}
            </select>
        </div>

        <div className="form-group">
          <label>Año de publicacion:</label>
          <input type="number" value={anioPub} onChange={(e) => setAnioPub(e.target.value)} required />
        </div>
        <div className="form-group">
          <label>Cantidad de copias:</label>
          <input type="number" value={copias} onChange={(e) => setCopias(e.target.value)} required />
        </div>
        <div className="button-container">
          <button id='btn-registro' type="submit" disabled={isSubmitDisabled}>Enviar</button>
        </div>
      </form>

    
      {/* Renderiza el modal si modalVisible es true */}
      {modalVisible && (
        <Modal
        tituloMsj="Perfil de libro creado"
        cuerpoMsj={"Libro cargado en el sistema"}
      />
      )}
    </div>
  );
}

export default FormLibro;