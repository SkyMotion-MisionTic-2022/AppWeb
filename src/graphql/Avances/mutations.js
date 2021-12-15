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

const EDITAR_AVANCE = gql`
mutation EditarAvance(
  $id: String!, 
  $proyecto: String, 
  $fecha: Date, 
  $descripcion: String, 
  $creadoPor: String) {
  editarAvance(
    _id: $id, 
    proyecto: $proyecto, 
    fecha: $fecha, 
    descripcion: $descripcion, 
    creadoPor: $creadoPor) {
    _id
  }
}
`;

const CREAR_OBSERVACION = gql`
mutation CrearObservacion(
  $idAvance: String!, 
  $campos: camposObservacion) {
  crearObservacion(
    idAvance: $idAvance, 
    campos: $campos) {
    _id
  }
}

`;

export { CREAR_AVANCE, EDITAR_AVANCE, CREAR_OBSERVACION }