import React, { useState, useEffect, useRef } from 'react';
import { useQuery, useMutation } from '@apollo/client';
import Boton from 'components/Boton';
import { GET_AVANCES_FILTRADOS } from 'graphql/Avances/queries';
import { Tooltip } from '@material-ui/core';
import { Link, useNavigate, useParams } from 'react-router-dom';
import Dialog from '@mui/material/Dialog';
import { toast } from 'react-toastify';
import { CREAR_AVANCE, EDITAR_AVANCE, CREAR_OBSERVACION } from 'graphql/Avances/mutations';
import { GET_PROYECTO } from 'graphql/Proyectos/queries';
import { useUser } from 'context/userContext';

const Avances = () => {
    const { _id } = useParams();
    const [openDCrear, setOpenDCrear] = useState(false);
    const [openDEditar, setOpenDEditar] = useState(false);
    const [openDObservacion, setOpenDObservacion] = useState(false);
    const [idAvance, setIdAvance] = useState('');

    const { data: dataP, error: errorP, loading: loadingP } = useQuery(GET_PROYECTO, {
        variables: { id: _id },
    });

    const {
        data: queryData,
        error: queryError,
        loading: queryLoading,
        refetch
    } = useQuery(GET_AVANCES_FILTRADOS, {
        variables: { idProyecto: _id }
    });

    const ActivarDEdicion = ({ identificador }) => {
        setIdAvance(identificador);
        setOpenDEditar(true);
    };

    useEffect(() => {
        refetch();
    }, []);

    useEffect(() => {
        if (errorP) {
            toast.error('Error consultando el Proyecto');
        }
    }, [errorP]);

    useEffect(() => {
        if (queryError) {
            toast.error('Error consultando los Avances');
        }
    }, [queryError]);

    if (queryLoading || loadingP) return <div>Cargando....</div>;

    return (
        <div className='place-items-center'>
            {/* <h2 className='flex justify-center p-4 text text-2xl text-blue-400'>Listado de Avances al Proyecto NN</h2> */}
            <h2 className='flex justify-center p-4 text text-2xl text-blue-400'>Listado de avances al proyecto: {dataP.Proyecto.nombre}</h2>
            <h4 className='mx-10'>Lider: {dataP.Proyecto.lider.nombre} {dataP.Proyecto.lider.apellido}</h4>
            <div className='flex flex-row justify-center p-4'>
                {queryData.filtrarAvance.length === 0 ?
                    <h4>No hay avances registrados al proyecto</h4> :
                    <table className='tabla'>
                        <thead>
                            <tr>
                                <th>ID Avance</th>
                                <th>Fecha</th>
                                <th>Descripción</th>
                                <th>Estudiante</th>
                                <th>Observaciones</th>
                                <th>Acciones</th>
                            </tr>
                        </thead>
                        <tbody>
                            {queryData && queryData.filtrarAvance.map((a) => {
                                return (
                                    <tr key={a._id}>
                                        <td>{a._id}</td>
                                        <td>{a.fecha}</td>
                                        <td>{a.descripcion}</td>
                                        <td>{a.creadoPor.nombre} {a.creadoPor.apellido} </td>
                                        <td>observacion </td>
                                        <td>
                                            <Tooltip title='Agregar Observación' arrow>
                                                <i className="fas fa-plus-circle" onClick={() => { setOpenDObservacion(true) }}></i>
                                            </Tooltip>
                                            <Tooltip title='Editar Avance' arrow>
                                                {/* <i className="fas fa-edit" onClick={() => setOpenDEditar(true)} ></i> */}
                                                <i className="fas fa-edit" onClick={() => ActivarDEdicion({ identificador: a._id })} ></i>
                                            </Tooltip>
                                        </td>
                                    </tr>
                                );
                            })}
                        </tbody>
                    </table>
                }

            </div>
            <div className='flex flex-row justify-around'>
                <Link to='/proyectos'>
                    <Boton titulo='Volver a Proyectos'></Boton>
                </Link>
                <button onClick={() => { setOpenDCrear(true) }}>Crear Avance</button>
            </div>
            <Dialog open={openDCrear} onClose={() => setOpenDCrear(false)}>
                <FormularioAvance idProyecto={dataP.Proyecto._id} />
            </Dialog>
            <Dialog open={openDEditar} onClose={() => setOpenDEditar(false)}>
                <FormularioEditar idProyecto={dataP.Proyecto._id} idAvance={idAvance} />
            </Dialog>
            <Dialog open={openDObservacion} onClose={() => setOpenDObservacion(false)}>
                <FormularioObservacion idProyecto={dataP.Proyecto._id} idAvance={idAvance} />
            </Dialog>
        </div>
    )
};

const FormularioAvance = ({ idProyecto }) => {
    const form = useRef(null);
    const { userData } = useUser();
    const [crearAvance, { data: dataMutation, loading, error }] = useMutation(CREAR_AVANCE);
    // let navigate = useNavigate();

    const sendForm = async (e) => {
        e.preventDefault();
        const fdA = new FormData(form.current);

        const nuevoAvance = {};
        fdA.forEach((value, key) => {
            nuevoAvance[key] = value;
        });
        // console.log('Variables FormData organizadas', nuevoAvance);

        await crearAvance({
            variables: { ...nuevoAvance }
        });
        toast.success('Avance creado con éxito');
        // navigate(`/avances/${idProyecto}`)
    };

    useEffect(() => {
        if (error) {
            toast.error('Error creando el avance');
        }
    }, [error]);

    if (loading) return <div>Cargando....</div>;

    return (
        <form
            ref={form} onSubmit={sendForm} >
            <h2>Agregar Avance</h2>
            <label htmlFor='proyecto'>
                ID Proyecto
                <input
                    name='proyecto'
                    className='bg-gray-50 border border-gray-600 p-2 rounded-lg m-2 h-6 w-60'
                    type='text'
                    placeholder='ID Proyecto'
                    defaultValue={idProyecto}
                    required
                />
            </label>
            <label htmlFor='creadoPor'>
                ID Estudiante
                <input
                    name='creadoPor'
                    className='bg-gray-50 border border-gray-600 p-2 rounded-lg m-2 h-6 w-60'
                    type='text'
                    placeholder='ID Estudiante'
                    defaultValue={userData._id}
                    required
                />
            </label>
            <label htmlFor='fecha'>
                Fecha
                <input
                    name='fecha'
                    className='bg-gray-50 border border-gray-600 p-2 rounded-lg m-2 h-6 w-42'
                    type='date'
                    required
                />
            </label>
            <label htmlFor='descripcion'>
                Descripción
                <input
                    name='descripcion'
                    className='bg-gray-50 border border-gray-600 p-2 rounded-lg m-2 h-48 w-96'
                    type='text'
                    placeholder='...'
                    required
                />
            </label>
            <button type='submit'>Agregar</button>
        </form>
    )
};

const FormularioEditar = ({ idProyecto, idAvance }) => {
    const { userData } = useUser();
    const form = useRef(null);

    const [editAvance, { data: dataEdAv, loading: loadingEdAv, error: errorEdAv }] =
        useMutation(EDITAR_AVANCE);

    const sendFormEditar = async (e) => {
        e.preventDefault();
        const fdEdAv = new FormData(form.current);

        const avanceEditado = {};
        fdEdAv.forEach((value, key) => {
            avanceEditado[key] = value;
        });
        // console.log('avanceEditado', avanceEditado)
        await editAvance({
            variables: { id: idAvance, ...avanceEditado }
        });
        toast.success('Avance modificado con éxito')
    };

    return (
        <form
            ref={form} onSubmit={sendFormEditar}
        >
            <h2>Editar Avance</h2>
            <label htmlFor='avance'>
                ID Avance
                <input
                    name='_id'
                    className='bg-gray-50 border border-gray-600 p-2 rounded-lg m-2 h-6 w-60'
                    type='text'
                    defaultValue={idAvance}
                    disabled={true}
                    required
                />
            </label>
            <label htmlFor='proyecto'>
                ID Proyecto
                <input
                    name='proyecto'
                    className='bg-gray-50 border border-gray-600 p-2 rounded-lg m-2 h-6 w-60'
                    type='text'
                    defaultValue={idProyecto}
                    disabled={true}
                    required
                />
            </label>
            <label htmlFor='creadoPor'>
                ID Estudiante
                <input
                    name='creadoPor'
                    className='bg-gray-50 border border-gray-600 p-2 rounded-lg m-2 h-6 w-60'
                    type='text'
                    defaultValue={userData._id}
                    disabled={true}
                    required
                />
            </label>
            <label htmlFor='fecha'>
                Fecha
                <input
                    name='fecha'
                    className='bg-gray-50 border border-gray-600 p-2 rounded-lg m-2 h-6 w-42'
                    type='date'
                    disabled={true}
                    required
                />
            </label>
            <label htmlFor='descripcion'>
                Descripción
                <input
                    name='descripcion'
                    className='bg-gray-50 border border-gray-600 p-2 rounded-lg m-2 h-48 w-96'
                    type='text'
                    placeholder='...'
                    required
                />
            </label>
            <button type='submit'>Editar</button>
        </form>
    )
};

const FormularioObservacion = ({ idProyecto, idAvance }) => {
    const form = useRef(null);

    const [addObservacion, { data: dataOb, loading: loadingOb, error: errorOb }] =
        useMutation(CREAR_OBSERVACION);

    const sendFormCrearOb = async (e) => {
        e.preventDefault();
        const fdCrOb = new FormData(form.current);

        const nuevaOb = {};
        fdCrOb.forEach((value, key) => {
            nuevaOb[key] = value;
        });
        console.log('nueva Ob', nuevaOb)
        // await addObservacion({
        //     variables: { idAvance: idAvance, ...nuevaOb }
        // });
        // toast.success('Avance modificado con éxito')
    };

    return (
        <form
            ref={form} onSubmit={sendFormCrearOb}
        >
            <h2>Ingresa una observación {idAvance}</h2>
            <br />
            <label htmlFor='avance'>
                ID Avance
                <input
                    name='_id'
                    className='bg-gray-50 border border-gray-600 p-2 rounded-lg m-2 h-6 w-60'
                    type='text'
                    defaultValue={idAvance}
                    disabled={true}
                    required
                />
            </label><br />
            <label htmlFor='observacion'>
                Observación: <br />
                <input
                    name='observacion'
                    className='bg-gray-50 border border-gray-600 p-2 rounded-lg m-2 h-48 w-96'
                    type='text'
                    placeholder='...'
                    required
                />
            </label>
            <br />
            <button type='submit'>Agregar</button>
        </form>

    )
};

export default Avances
