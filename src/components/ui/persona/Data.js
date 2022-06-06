import React from 'react';

const handleClick = title => {
  console.log(`You clicked me! ${title}`);
};

export const columns = [
  {
    name: 'ID',
    selector: 'idpersona',
    sortable: true,
  },
  {
    name: 'Nombres',
    selector: 'nombre',
    sortable: true,
  },
  {
    name: 'Apellidos',
    selector: 'apellido',
    sortable: true,
  },
  {
    name: 'DNI',
    selector: 'dni',
    sortable: true,
  },
  {
    name: 'Usuario',
    selector: 'usuario',
    sortable: true,
  },
  {
    name: 'Sexo',
    selector: 'sexo',
    sortable: true,
  },
  {
    name: 'Activo',
    selector: 'activo',
    sortable: true,
  },
  {
    name: 'Acciones',
    selector: 'null',
    sortable: false,
    cell: d => [
      <i
        key={d.idPerfilPersona}
        onClick={handleClick.bind(this, d.perfil)}
        className="fas fa-edit"
      ></i>,
      <i
        onClick={handleClick.bind(this, d.perfil)}
        className="fas fa-trash"
      ></i>,
    ],
  },
];
