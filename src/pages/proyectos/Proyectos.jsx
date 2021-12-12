import { GET_PROYECTOS } from 'graphql/Proyectos/queries';
import React, { useEffect, useState } from 'react';
import { useQuery, useMutation } from '@apollo/client';
import Boton from '../../components/Boton';
import { Link } from 'react-router-dom';
import { ELIMINAR_PROYECTO } from 'graphql/Proyectos/mutations';
import { useUser } from 'context/userContext';


const Proyectos = () => {
    // const { loading, error, data } = useQuery(GET_PROYECTOS);
    const { data, refetch } = useQuery(GET_PROYECTOS);
    const { userData, setUserData } = useUser();
    const [mostrarAccion, setMostrarAccion] = useState(false);
    const [crearProyecto, setcrearProyecto] = useState(false);


    const [eliminarProyecto, { data: dataMutation, loading: loadingMutation, error: errorMutation }] =
        useMutation(ELIMINAR_PROYECTO);

    useEffect(() => {
        console.log(data);
    }, [data]);

    useEffect(() => {
        console.log("user" + JSON.stringify(userData));
        if (userData.rol === "LIDER" || userData.rol === "ADMINISTRADOR") {
            setMostrarAccion(true)
        }
        if (userData.rol === "LIDER") {
            setcrearProyecto(true)
        }

    }, []);



    const Eliminar = (id) => {

        console.log(id);

        eliminarProyecto({
            variables: { _id: id },

        });
        refetch()
    };



    return (
        <div>
            <h4 className='flex justify-center p-4 text text-2xl m-14 text-blue-400'>
                Gestion de proyectos
            </h4>


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

                                                    <Link to={`/proyectos/editar/${p._id}`}>
                                                        <i class="far fa-edit"></i>
                                                    </Link>
                                                  
                                                </div>

                                            ) : console.log("no acciones")}

                                            <i class="fas fa-search-plus"></i>
                                            <Link to={`/inscripciones/${p._id}`}>
                                            <i class="fas fa-user-plus"></i>
                                            </Link>
                                            <Link to={`/avances/${p._id}`}>
                                            <i class="fas fa-tasks"></i>
                                            </Link>
                                        </div>
                                    </td>

                                </tr>
                            );
                        })}
                </tbody>

            </table>
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
