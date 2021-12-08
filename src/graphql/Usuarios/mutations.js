import { gql } from '@apollo/client';
const ELIMINAR_USUARIO = gql`
mutation EliminarUsuario($correo: String) {
    eliminarUsuario(correo: $correo) {
      correo
    }
  }
`;

const CREAR_USUARIO = gql`
mutation Mutation($nombre: String!, $apellido: String!, $identificacion: String!, $correo: String!, $password: String!, $rol: Enum_Rol, $estado: Enum_EstadoUsuario) {
  crearUsuario(nombre: $nombre, apellido: $apellido, identificacion: $identificacion, correo: $correo, password: $password, rol: $rol, estado: $estado) {
    _id
  }
}
`;
export {CREAR_USUARIO,ELIMINAR_USUARIO}