import { gql } from '@apollo/client';

const GET_PROYECTOS = gql`
query Proyectos {
    Proyectos {
      _id,
      nombre,
      fase,
      fechaInicio,
      fechaFin
    }
  }
`;

export {GET_PROYECTOS};