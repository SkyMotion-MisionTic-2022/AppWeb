import { gql } from '@apollo/client';
const CREAR_PROYECTO = gql`
mutation CrearProyecto($nombre: String!, $presupuesto: Float!, $fechaInicio: Date!, $fechaFin: Date!, $lider: String!) {
    crearProyecto(
        nombre: $nombre,
         presupuesto: $presupuesto, 
         fechaInicio: $fechaInicio, 
         fechaFin: $fechaFin, 
         lider: $lider) {
      nombre
    }
  }
`;

export {CREAR_PROYECTO}