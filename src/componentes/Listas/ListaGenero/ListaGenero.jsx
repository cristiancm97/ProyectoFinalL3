import React from 'react';
import './ListaGenero.css'
import Genero from './Genero';

const generos = [
    {"nombre": "Novela", "descripcion": "Narrativa extensa que desarrolla personajes, tramas y conflictos en profundidad, explorando la condición humana y la sociedad."},
    {"nombre": "Poesía", "descripcion": "Expresión artística mediante el uso estilizado del lenguaje, a menudo con métrica y ritmo, para transmitir emociones, ideas y sensaciones."},
    {"nombre": "Drama", "descripcion": "Representación literaria que presenta conflictos y emociones intensas, usualmente enfocada en momentos cruciales y decisiones impactantes."},
    {"nombre": "Ciencia ficción", "descripcion": "Exploración especulativa de futuros posibles, tecnología avanzada y sus impactos en la humanidad, a menudo mezclando ciencia y imaginación."},
    {"nombre": "Fantasía", "descripcion": "Exploración de mundos imaginarios, magia y seres sobrenaturales, desafiando las leyes naturales y explorando lo extraordinario."}
  ];

function ListaGenero() {
  return (
      <div className='cnt-listagenero' >
        <h2 className="titulo-listaGeneros">Lista de Generos Literarios</h2>
        {generos.map((genero, index) => (
          <Genero key={index} {...genero} />
        ))}
      </div>
  );
}

export default ListaGenero;