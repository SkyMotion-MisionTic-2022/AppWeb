import { GET_USUARIOS } from 'graphql/Usuarios/queries';
import React, { useEffect, useState } from 'react';
import { useQuery, useMutation } from '@apollo/client';
import { ELIMINAR_USUARIO } from 'graphql/Usuarios/mutations';
import Boton from '../../components/Boton';
import { Link } from 'react-router-dom';

const Usuarios = () => {

  var { data, refetch } = useQuery(GET_USUARIOS);
  const [eliminarUsuario, { data: dataMutation, loading: loadingMutation, error: errorMutation }] =
    useMutation(ELIMINAR_USUARIO);



  useEffect(() => {
    console.log(data);
  }, [data]);

  const Eliminar = (iden) => {

    //setId(iden);

    eliminarUsuario({
      variables: { correo: iden },
    });

    refetch();


  };

  return (
    <div>
      <h4 className='text-3xl font-extrabold text-gray-900 p-8 ml-64'>
        Gestion de usuarios
      </h4>

      <table className='tabla'>
        <thead>
          <tr>
            <th>Nombre</th>
            <th>Apellido</th>
            <th>Identificacion</th>
            <th>Correo</th>
            <th>Rol</th>
            <th>Estado</th>
            <th>Acciones</th>

          </tr>
        </thead>
        <tbody>
          {data &&
            data.Usuarios.map((p) => {
              return (
                <tr key={p._id}>
                  <td>{p.nombre}</td>
                  <td>{p.apellido}</td>
                  <td>{p.identificacion}</td>
                  <td>{p.correo}</td>
                  <td>{p.rol}</td>
                  <td>{p.estado}</td>
                  <td>
                    <div className='flex w-full justify-around'>
                      <i class="far fa-edit"></i>
                      <i className='fas fa-trash'

                        onClick={() => Eliminar(p.correo)
                        }>
                      </i>
                    </div>
                  </td>

                </tr>
              );
            })}
        </tbody>

      </table>

      <div className='flex flex-row justify-around'>
        <Link to="/crearusuario">
          <Boton titulo='Crear Usuario'>
          </Boton>
        </Link>
      </div>

    </div>
  );
};

export default Usuarios;
