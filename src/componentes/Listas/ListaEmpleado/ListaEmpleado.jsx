import React from 'react';
import './ListaEmpleado.css'
import Empleado from './Empleado';

const empleados = [
    {"nombre": "Juan", "apellido": "Pérez", "celular": "123456789", "dni": "12345678", "domicilio": "Calle Falsa 123", "localidad": "Ciudad A", "posicion": "Gerente", "correo": "juan.perez@example.com", "usuario": "juanp"},
    {"nombre": "María", "apellido": "García", "celular": "987654321", "dni": "87654321", "domicilio": "Avenida Siempre Viva 742", "localidad": "Ciudad B", "posicion": "Analista", "correo": "maria.garcia@example.com", "usuario": "mariag"},
    {"nombre": "Carlos", "apellido": "Sánchez", "celular": "555123456", "dni": "11223344", "domicilio": "Boulevard Principal 456", "localidad": "Ciudad C", "posicion": "Desarrollador", "correo": "carlos.sanchez@example.com", "usuario": "carloss"},
    {"nombre": "Ana", "apellido": "Martínez", "celular": "666987654", "dni": "55667788", "domicilio": "Pasaje Secundario 789", "localidad": "Ciudad D", "posicion": "Diseñadora", "correo": "ana.martinez@example.com", "usuario": "anam"},
    {"nombre": "Luis", "apellido": "Rodríguez", "celular": "777123987", "dni": "22334455", "domicilio": "Calle Tercera 1011", "localidad": "Ciudad E", "posicion": "Consultor", "correo": "luis.rodriguez@example.com", "usuario": "luisr"},
    {"nombre": "Sofía", "apellido": "López", "celular": "888654321", "dni": "33445566", "domicilio": "Avenida Cuarta 1213", "localidad": "Ciudad F", "posicion": "Administradora", "correo": "sofia.lopez@example.com", "usuario": "sofial"}
    
];

function ListaEmpleado() {
  return (
      <div className='cnt-listaempleado' >
        <h2 className="titulo-listaEmpleados">Lista de Empleados</h2>
        {empleados.map((empleado, index) => (
          <Empleado key={index} {...empleado} />
        ))}
      </div>
  );
}

export default ListaEmpleado;