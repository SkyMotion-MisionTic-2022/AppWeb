import { gql } from "@apollo/client";

const GET_AVANCES_FILTRADOS = gql`
query FiltrarAvances($idProyecto: String!) {
    filtrarAvance(idProyecto: $idProyecto) {
      _id
      descripcion
      fecha
      proyecto {
        nombre
      }
      creadoPor {
        nombre
        apellido
      }
      observaciones {
        observacion
        _id
      }    
    }
  }
`;

export { GET_AVANCES_FILTRADOS };