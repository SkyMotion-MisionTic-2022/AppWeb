import { gql } from '@apollo/client';
const CREAR_PROYECTO = gql`
mutation Mutation($nombre: String!, $presupuesto: Float!, $fechaInicio: Date!, $fechaFin: Date!, $lider: String!, $objetivos: [crearObjetivo]) {
  crearProyecto(nombre: $nombre, presupuesto: $presupuesto, fechaInicio: $fechaInicio, fechaFin: $fechaFin, lider: $lider, objetivos: $objetivos) {
     nombre
    _id
  }
}
`;
const ELIMINAR_PROYECTO = gql`
mutation Mutation($id: String) {
  eliminarProyecto(_id: $id) {
     nombre
  }
}
`;

export {CREAR_PROYECTO, ELIMINAR_PROYECTO}