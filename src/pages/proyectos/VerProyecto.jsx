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
import { EDITAR_PROYECTO_ADMIN } from 'graphql/Proyectos/mutations';

const VerProyecto = () => {
    const form = useRef(null);
    const { _id } = useParams();
    const [proyecData, setproyecData] = useState({});
    const { userData, setUserData } = useUser();
    let navigate = useNavigate();


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


    return (
        <div>
            <h4 className='flex justify-center p-4 text text-2xl m-14 text-blue-400'>
                Ver proyecto
            </h4>

            <form>
                <label>
                    Nombre
                    <input
                        className='bg-gray-50 border border-gray-600 p-2 rounded-lg m-2'
                        type='text'
                        disabled
                        defaultValue={proyecData.nombre}
                    />
                </label>
                <label>
                    Presupuesto
                    <input
                        className='bg-gray-50 border border-gray-600 p-2 rounded-lg m-2'
                        disabled
                        defaultValue={proyecData.presupuesto}
                    />
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

                <label>
                    Lider
                    <input
                        className='bg-gray-50 border border-gray-600 p-2 rounded-lg m-2'
                        type='text'
                        placeholder='Nombre proyecto'
                        disabled
                        defaultValue={userData.correo}
                    />
                </label>

                <label>
                    Estado
                    <input

                        className='bg-gray-50 border border-gray-600 p-2 rounded-lg m-2'
                        type='text'
                        disabled
                        defaultValue={proyecData.estado}
                    />
                </label>

                <label>
                    Fase
                    <input

                        className='bg-gray-50 border border-gray-600 p-2 rounded-lg m-2'
                        type='text'
                        disabled
                        defaultValue={proyecData.fase}
                    />

                </label>
                <div className='flex flex-row justify-around'>
                <span className='text-blue-400'> Objetivos del Proyecto:</span>
                </div>
                {proyecData.objetivos &&
                    proyecData.objetivos.map((p) => {
                        return (
                            <div className='flex flex-row justify-around' >
                               
                            <div className='flex items-center'>
                                <label>
                                    Descripcion
                                    <input
            
                                        className='bg-gray-50 border border-gray-600 p-2 rounded-lg m-2'
                                        type='text'
                                        disabled
                                        defaultValue={p.descripcion}

                                    />
                                </label>
                                <label>
                                    Tipo
                                    <input
            
                                        className='bg-gray-50 border border-gray-600 p-2 rounded-lg m-2'
                                        type='text'
                                        disabled
                                        defaultValue={p.tipo}

                                    />
                                </label>
                                
                            </div>
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
                   
                </div>


            </form >



        </div >
    )
}

export default VerProyecto
