import React, { useEffect } from 'react'
import Boton from 'components/Boton';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { useQuery } from '@apollo/client';
import { GET_AVANCE } from 'graphql/Avances/queries';

const VerAvance = () => {
    const { _id } = useParams();

    const {
        data: queryData,
        error: queryError,
        loading: queryLoading,
    } = useQuery(GET_AVANCE, {
        variables: { id: _id },
    });

    useEffect(() => {
        console.log('query', queryData)
    }, [queryData])

    if (queryLoading) return <div>Cargando....</div>;

    return (
        <div>
            <h2 className='flex justify-center p-4 text text-2xl text-blue-400'>Detalles del Avance</h2>
            <div>
                <label htmlFor='proyecto'>
                    ID Proyecto
                    <input
                        name='proyecto'
                        className='bg-gray-50 border border-gray-600 p-2 rounded-lg m-2 h-6 w-60'
                        type='text'
                        placeholder='ID Proyecto'
                        defaultValue={queryData.Avance.proyecto._id}
                        disabled
                    />
                </label>
                <label htmlFor='creadoPor'>
                    ID Estudiante
                    <input
                        name='creadoPor'
                        className='bg-gray-50 border border-gray-600 p-2 rounded-lg m-2 h-6 w-60'
                        type='text'
                        placeholder='ID Estudiante'
                        defaultValue={queryData.Avance.creadoPor._id}
                        disabled
                    />
                </label><br />
                <label htmlFor='fecha'>
                    Fecha
                    <input
                        name='fecha'
                        className='bg-gray-50 border border-gray-600 p-2 rounded-lg m-2 h-6 w-42'
                        type='text'
                        defaultValue={queryData.Avance.fecha}
                        disabled
                    />
                </label><br />
                <label htmlFor='descripcion'>
                    Descripción
                    <input
                        name='descripcion'
                        className='bg-gray-50 border border-gray-600 p-2 rounded-lg m-2 h-48 w-96'
                        type='text'
                        defaultValue={queryData.Avance.descripcion}
                        disabled
                    />
                </label>
            </div>
            <div>
                {queryData.Avance.observaciones && queryData.Avance.observaciones.map((o) => {
                    return (
                        <div>
                            <div>
                                <label>
                                    Observación
                                    <input
                                        className='bg-gray-50 border border-gray-600 p-2 rounded-lg m-2 h-28 w-96'
                                        type='text'
                                        disabled
                                        defaultValue={o.observacion}

                                    />
                                </label>
                            </div>
                        </div>
                    )
                })

                }
            </div>

            <Link to={`/avances/${queryData.Avance.proyecto._id}`}>
                <Boton titulo='Volver'></Boton>
            </Link>

        </div>
    )
}

export default VerAvance
