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

const GET_AVANCE = gql`
query Avance($id: String!) {
  Avance(_id: $id) {
    _id
    descripcion
    fecha
    proyecto {
      _id  
    }
    creadoPor {
      _id  
    }
    observaciones {
      observacion
    }
  }
}
`;

export { GET_AVANCES_FILTRADOS, GET_AVANCE };