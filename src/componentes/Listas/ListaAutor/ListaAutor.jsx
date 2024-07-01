import React from 'react';
import './ListaAutor.css'
import Autor from './Autor';

const autores = [
    {"nombre": "Gabriel García Márquez", "bibliografia": "Cien años de soledad, El amor en los tiempos del cólera", "fechaNac": "1927/03/06"},
    {"nombre": "William Shakespeare", "bibliografia": "Hamlet, Romeo y Julieta, Macbeth", "fechaNac": "1564/04/23"},
    {"nombre": "J.R.R. Tolkien", "bibliografia": "El señor de los anillos, El hobbit", "fechaNac": "1892/01/03"},
    {"nombre": "Jane Austen", "bibliografia": "Orgullo y prejuicio, Sentido y sensibilidad", "fechaNac": "1775/12/16"},
    {"nombre": "George Orwell", "bibliografia": "1984, Rebelión en la granja", "fechaNac": "1903/06/25"},
    {"nombre": "Leo Tolstoy", "bibliografia": "Guerra y paz, Anna Karénina", "fechaNac": "1828/09/09"},
    {"nombre": "Homer", "bibliografia": "La Ilíada, La Odisea", "fechaNac": "-800/01/01"}
  ];

function ListaAutor() {
  return (
      <div className='cnt-listaautor' >
        <h2 className="titulo-listaAutores">Lista de Autores Literarios</h2>
        {autores.map((autor, index) => (
          <Autor key={index} {...autor} />
        ))}
      </div>
  );
}

export default ListaAutor;