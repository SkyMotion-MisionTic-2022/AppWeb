import { gql } from '@apollo/client';

const GET_USUARIOS = gql`
query Usuarios {
    Usuarios {
      _id
      nombre
      apellido
      identificacion
      correo
      rol
      estado
    }
  }
`;

const GET_USUARIO = gql`
query Query($id: String!) {
  Usuario(_id: $id) {
   nombre
   apellido
   correo
  identificacion
    rol
    estado
    password
  }
}
`;

export { GET_USUARIOS, GET_USUARIO };