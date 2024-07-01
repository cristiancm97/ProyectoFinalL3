import React from 'react';
import './ListaLibro.css'
import Libro from './Libro';

const libros = [
    {"titulo": "Cien años de soledad", "autor": "Gabriel García Márquez", "anio_publicacion": 1967, "genero": "Novela"},
    {"titulo": "La Odisea", "autor": "Homero", "anio_publicacion": -800, "genero": "Poesía"},
    {"titulo": "Hamlet", "autor": "William Shakespeare", "anio_publicacion": 1603, "genero": "Drama"},
    {"titulo": "Fahrenheit 451", "autor": "Ray Bradbury", "anio_publicacion": 1953, "genero": "Ciencia ficción"},
    {"titulo": "El señor de los anillos", "autor": "J.R.R. Tolkien", "anio_publicacion": 1954, "genero": "Fantasía"}
  ];

function ListaLibro() {
  return (
      <div className='cnt-listalibro' >
        <h2 className="titulo-listaLibros">Lista de Libros</h2>
        {libros.map((libro, index) => (
          <Libro key={index} {...libro} />
        ))}
      </div>
  );
}

export default ListaLibro;