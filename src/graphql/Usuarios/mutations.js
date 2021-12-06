import { gql } from '@apollo/client';
const ELIMINAR_USUARIO = gql`
mutation EliminarUsuario($correo: String) {
    eliminarUsuario(correo: $correo) {
      correo
    }
  }
`;

export {ELIMINAR_USUARIO}