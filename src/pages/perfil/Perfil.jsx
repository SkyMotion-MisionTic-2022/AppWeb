import React, { useEffect, useState } from 'react';
import { useUser } from 'context/userContext';
import { useQuery } from '@apollo/client';
import { Link } from 'react-router-dom';
import { GET_USUARIO } from 'graphql/Usuarios/queries';
import { Tooltip } from '@material-ui/core';

const Perfil = () => {
    const { userData } = useUser();
    const id = userData._id;
    const [dataGql, setDataGql] = useState({});

    const {
        data: queryData,
        error: queryError,
        loading: queryLoading,
        refetch
    } = useQuery(GET_USUARIO, {
        variables: { id: id },
    });

    useEffect(() => {
        if (queryData) {
            setDataGql(queryData.Usuario);
        }
    }, [queryData])

    useEffect(() => {
        refetch();
    }, []);

    return (
        <div className='place-content-center'>
            <div>
                <h2 className='flex justify-center p-4 font-bold text-3xl m-2 text-blue-600'>
                    Perfil
                </h2>
            </div>
            <div className='flex flex-row justify-center p-4'>
                <table className='tabla'>
                    <tr className='bg-white'>
                        <th>Nombre</th>
                        <th>Apellido</th>
                        <th>Identificación</th>
                        <th>Correo</th>
                        <th>Contraseña</th>
                        <th>Rol</th>
                        <th>Acciones</th>
                    </tr>
                    <tr>
                        <td>{dataGql.nombre}</td>
                        <td>{dataGql.apellido}</td>
                        <td>{dataGql.identificacion}</td>
                        <td>{dataGql.correo}</td>
                        <td>******</td>
                        {/* <td>{dataGql.password}</td> */}
                        <td>{dataGql.rol}</td>
                        <td>
                            <Tooltip title='Editar' arrow>
                                <Link to={`/editarperfil/${userData._id}`}>
                                    <i class="far fa-edit"></i>
                                </Link>
                            </Tooltip>
                        </td>
                    </tr>
                </table>
            </div>
        </div>
    )
}

export default Perfil
