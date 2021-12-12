import { gql } from "@apollo/client";

const CREAR_AVANCE = gql`
mutation CrearAvance(
    $proyecto: String!, 
    $fecha: Date!, 
    $descripcion: String!, 
    $creadoPor: String!) {
    crearAvance(
        proyecto:$proyecto, 
        fecha: $fecha, 
        descripcion: $descripcion, 
        creadoPor: $creadoPor) {
      _id
    }
  }
`;

export { CREAR_AVANCE }