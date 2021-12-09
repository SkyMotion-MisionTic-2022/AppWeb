import { gql } from '@apollo/client';

const GET_PROYECTOS = gql`
query Proyectos {
    Proyectos {
      _id,
      nombre,
      fase,
      fechaInicio,
      fechaFin,
      estado
    }
  }
`;
const GET_PROYECTO = gql`
query Query($id: String!) {
  Proyecto(_id: $id) {
    nombre
    presupuesto
    fechaInicio
    fechaFin
    _id
    estado
    fase
    lider {
      correo
    }
    objetivos {
      _id
      descripcion
      tipo
    }
  }
}
`;

export {GET_PROYECTOS, GET_PROYECTO};