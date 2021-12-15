import { GET_PROYECTOS } from 'graphql/Proyectos/queries';
import React, { useEffect, useState } from 'react';
import { useQuery, useMutation } from '@apollo/client';
import Boton from '../../components/Boton';
import { Link } from 'react-router-dom';
import { ELIMINAR_PROYECTO } from 'graphql/Proyectos/mutations';
import { useUser } from 'context/userContext';
import PrivateComponent from 'components/PrivateComponent';
import { Tooltip } from '@material-ui/core';


const Proyectos = () => {
    // const { loading, error, data } = useQuery(GET_PROYECTOS);
    const { data, refetch, loading } = useQuery(GET_PROYECTOS);
    const { userData, setUserData } = useUser();
    const [mostrarAccion, setMostrarAccion] = useState(false);
    const [crearProyecto, setcrearProyecto] = useState(false);


    const [eliminarProyecto, { data: dataMutation, loading: loadingMutation, error: errorMutation }] =
        useMutation(ELIMINAR_PROYECTO);

    useEffect(() => {
        console.log('log de query data', data);
        // console.log('tamaño', data.Proyectos.length);
    }, [data]);

    useEffect(() => {
        console.log("user" + JSON.stringify(userData));
        if (userData.rol === "LIDER" || userData.rol === "ADMINISTRADOR") {
            setMostrarAccion(true)
        }
        if (userData.rol === "LIDER") {
            setcrearProyecto(true)
        }
        refetch();

    }, []);



    const Eliminar = (id) => {

        console.log(id);

        eliminarProyecto({
            variables: { _id: id },

        });
        refetch()
    };

    if (loading) return <div>Cargando....</div>;

    return (
        <div>
            <h4 className='flex justify-center p-4 font-bold text-3xl m-2 text-blue-600'>
                Gestion de proyectos
            </h4>
            <div>
                {data.Proyectos.length === 0 ?
                    <h4 className='flex justify-center p-4 font-bold'>No hay proyectos registrados a tu cargo</h4> :

                    <table className='tabla'>
                        <thead>
                            <tr>
                                <th>Nombre</th>
                                <th>Estado</th>
                                <th>Fase</th>
                                <th>Fecha inicio</th>
                                <th>Fecha fin</th>
                                <th>Acciones</th>

                            </tr>
                        </thead>
                        <tbody>
                            {data &&
                                data.Proyectos.map((p) => {
                                    return (
                                        <tr key={p._id}>
                                            <td>{p.nombre}</td>
                                            <td>{p.estado}</td>
                                            <td>{p.fase}</td>
                                            <td>{p.fechaInicio}</td>
                                            <td>{p.fechaFin}</td>
                                            <td>
                                                <div className='flex w-full justify-around'>
                                                    {mostrarAccion ? (

                                                        <div >
                                                            <Tooltip title='Editar' arrow>
                                                                <Link to={`/proyectos/editar/${p._id}`}>
                                                                    <i class="far fa-edit"></i>
                                                                </Link>
                                                            </Tooltip>

                                                        </div>

                                                    ) : console.log("no acciones")}
                                                    <PrivateComponent roleList={['LIDER']}>
                                                        <Tooltip title='Detalles' arrow>
                                                            <Link to={`/proyectos/${p._id}`}>
                                                                <i class="fas fa-search-plus"></i>
                                                            </Link>
                                                        </Tooltip>
                                                    </PrivateComponent>
                                                    <PrivateComponent roleList={['LIDER']}>
                                                        <Tooltip title='Inscripciones' arrow>
                                                            <Link to={`/inscripciones/${p._id}`}>
                                                                <i class="fas fa-user-check"></i>
                                                            </Link>
                                                        </Tooltip>
                                                    </PrivateComponent>
                                                    <PrivateComponent roleList={['LIDER', 'ESTUDIANTE']}>
                                                        <Tooltip title='Avances' arrow>
                                                            <Link to={`/avances/${p._id}`}>
                                                                <i class="fas fa-rocket"></i>
                                                            </Link>
                                                        </Tooltip>
                                                    </PrivateComponent>
                                                </div>
                                            </td>

                                        </tr>
                                    );
                                })}
                        </tbody>

                    </table>
                }
            </div>

            {crearProyecto ? (
                <div className='flex flex-row justify-around'>
                    <Link to="/crearproyecto">
                        <Boton titulo='Crear Proyecto'>
                        </Boton>
                    </Link>
                </div>
            ) : console.log("no muestra nada")}




        </div>
    )
}

export default Proyectos;
