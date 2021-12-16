import React, { useRef, useState, useEffect } from 'react';
import { useMutation, useQuery } from '@apollo/client';
import { GET_PROYECTO } from 'graphql/Proyectos/queries';
import Boton from '../../components/Boton';
import { useParams, Link } from 'react-router-dom';
import { nanoid } from 'nanoid';
import { CreateObjectiveContext } from 'context/createObjectiveContext';
import { useCreateObjective } from 'context/createObjectiveContext';
import { useUser } from 'context/userContext';
import { useNavigate } from 'react-router-dom';
import { EDITAR_PROYECTO_ADMIN, EDITAR_PROYECTO_LIDER } from 'graphql/Proyectos/mutations';

const EditarProyecto = () => {
    const form = useRef(null);
    const { _id } = useParams();
    const [proyecData, setproyecData] = useState({});
    const { userData, setUserData } = useUser();
    const [esAdmin, setesAdmin] = useState(true);
    let navigate = useNavigate();
    const [listaObjetivos, setListaObjetivos] = useState([]);

    const [editProy, { data: dataMutation, loading: loadingMutation, error: errorMutation }] =
        useMutation(EDITAR_PROYECTO_ADMIN);

    const [editProyLider, { data: dataMutationp, loading: loadingMutationp, error: errorMutationp }] =
    useMutation(EDITAR_PROYECTO_LIDER);    

    const {
        data: queryData,
        error: queryError,
        loading: queryLoading,
    } = useQuery(GET_PROYECTO, {
        variables: { id: _id },
    });
    useEffect(() => {

        if (queryData) {
            //console.log('dq', queryData);
            console.log(queryData.Proyecto);
            setproyecData(queryData.Proyecto);

        }
    }, [queryData]);

    useEffect(() => {
        if (userData.rol === "LIDER") {
            setesAdmin(false);
        }

    }, []);

    const submitForm = async (e) => {
        e.preventDefault();
        const fd = new FormData(form.current);
        const proyectoEditado = {};
        fd.forEach((value, key) => {
            proyectoEditado[key] = value;
        });
       

        if (esAdmin) {
           
            editProy({
                variables: { id: _id, ...proyectoEditado },
            });

        }else{
           
            proyectoEditado["presupuesto"] = parseFloat(proyectoEditado["presupuesto"]);
            console.log(proyectoEditado);
            editProyLider({
                variables: { id: _id, ...proyectoEditado },
            });


        }


        navigate('/proyectos');

    };


    return (
        <div>
            <h4 className='flex justify-center p-4 text text-2xl m-14 text-blue-400'>
                Editar proyecto
            </h4>

            <form ref={form}
                onSubmit={submitForm}

            >
                <label htmlFor='nombre'>
                    Nombre
                    {esAdmin ? (<input
                        className='bg-gray-50 border border-gray-600 p-2 rounded-lg m-2'
                        type='text'
                        disabled
                        defaultValue={proyecData.nombre}
                    />) : (<input
                        name='nombre'
                        className='bg-gray-50 border border-gray-600 p-2 rounded-lg m-2'
                        type='text'
                        placeholder='Nombre proyecto'
                        required
                        defaultValue={proyecData.nombre}
                    />)}
                </label>
                <label htmlFor='presupuesto'>
                    Presupuesto
                    {esAdmin ? (<input
                        className='bg-gray-50 border border-gray-600 p-2 rounded-lg m-2'
                        disabled
                        defaultValue={proyecData.presupuesto}
                    />) : (<input
                        name='presupuesto'
                        className='bg-gray-50 border border-gray-600 p-2 rounded-lg m-2'
                        type='number'
                        placeholder='70.000'
                        required
                        defaultValue={proyecData.presupuesto}
                    />)}
                </label>

                <label>
                    Fecha inicio
                    <input

                        className='bg-gray-50 border border-gray-600 p-2 rounded-lg m-2'
                        type="text"
                        disabled
                        defaultValue={proyecData.fechaInicio}
                    />
                </label>
                <label>
                    Fecha fin
                    <input

                        className='bg-gray-50 border border-gray-600 p-2 rounded-lg m-2'
                        type="text"
                        disabled
                        defaultValue={proyecData.fechaFin}
                    />
                </label>

                <label htmlFor='lider'>
                    Lider
                    <input

                        className='bg-gray-50 border border-gray-600 p-2 rounded-lg m-2'
                        type='text'
                        placeholder='Nombre proyecto'
                        disabled
                        defaultValue={userData.correo}
                    />
                </label>
                <label htmlFor='estado'>
                    Estado
                    {esAdmin ? (<select
                        className='bg-gray-50 border border-gray-600 p-2 rounded-lg m-2'
                        name='estado'
                        required
                        defaultValue={proyecData.estado}
                    >

                        <option disabled value={0}>
                            Seleccione una opción
                        </option>
                        <option>ACTIVO</option>
                        <option>INACTIVO</option>

                    </select>) : (<input

                        className='bg-gray-50 border border-gray-600 p-2 rounded-lg m-2'
                        type='text'
                        disabled
                        defaultValue={proyecData.estado}
                    />
                    )}
                </label>

                <label htmlFor='fase'>
                    Fase
                    {esAdmin ? (<select
                        className='bg-gray-50 border border-gray-600 p-2 rounded-lg m-2'
                        name='fase'
                        required
                        defaultValue={proyecData.fase}
                    >

                        <option disabled value={0}>
                            Seleccione una opción
                        </option>
                        <option>INICIADO</option>
                        <option>DESARROLLO</option>
                        <option>TERMINADO</option>
                        <option>NULO</option>

                    </select>
                    ) : (
                        <input

                            className='bg-gray-50 border border-gray-600 p-2 rounded-lg m-2'
                            type='text'
                            disabled
                            defaultValue={proyecData.fase}
                        />

                    )}
                </label>
                {console.log("objetivos" + JSON.stringify(proyecData.objetivos))}
                {proyecData.objetivos &&
                    proyecData.objetivos.map((p) => {
                        return (
                            <div className='flex items-center'>
                            <label htmlFor={`nested||objetivos||${p.id}||descripcion`}>
                                Descripcion
                                <input
                                    name={`nested||objetivos||${p.id}||descripcion`}
                                    className='bg-gray-50 border border-gray-600 p-2 rounded-lg m-2'
                                    type='text'
                                    placeholder='Descripcion'
                                    required
                                    defaultValue={p.descripcion}
                                    
                                />
                            </label>
                
                            <label htmlFor={`nested||objetivos||${p.id}||tipo`}>
                                Tipo
                                <select
                                    className='bg-gray-50 border border-gray-600 p-2 rounded-lg m-2'
                                    name={`nested||objetivos||${p.id}||tipo`}
                                    required
                                    defaultValue={p.descripcion}
                                >
                
                                    <option disabled value={0}>
                                        Seleccione una opción
                                    </option>
                                    <option>GENERAL</option>
                                    <option>ESPECIFICO</option>
                
                                </select>
                            </label>
                
                            <i
                                className='fas fa-minus mt-6 bg-red-500 text-white p-2 rounded-full cursor-pointer hover:bg-red-400'
                                //onClick={() => removeObjetivo(id)}
                            />
                            </div>

                        );
                    })}

                <div className='flex flex-row justify-around' >


                </div>

                <div className='flex flex-row justify-around'>
                    <Link to="/proyectos">
                        <Boton titulo='ver proyectos'>
                        </Boton>
                    </Link>
                    <button
                        type='submit'
                        class='bg-transparent hover:bg-blue-500 text-blue-700 font-semibold hover:text-white py-2 px-4 border border-blue-500 hover:border-transparent rounded'
                    >
                        Guardar proyecto
                    </button>
                </div>


            </form >



        </div >
    )
};

export default EditarProyecto
