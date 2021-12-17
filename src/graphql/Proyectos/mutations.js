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
    _id
  }
}
`;
const EDITAR_PROYECTO_ADMIN = gql`
mutation EditarProyecto($id: String!, $estado: Enum_EstadoProyecto, $fase: Enum_FaseProyecto) {
  editarProyecto(_id: $id, estado: $estado, fase: $fase) {
    _id
  }
}
`;

const EDITAR_PROYECTO_LIDER = gql`
mutation Mutation($id: String!, $nombre: String, $presupuesto: Float) {
  editarProyecto(_id: $id, nombre: $nombre, presupuesto: $presupuesto) {
    _id
  }
}
`;


export {CREAR_PROYECTO, ELIMINAR_PROYECTO, EDITAR_PROYECTO_ADMIN,EDITAR_PROYECTO_LIDER}