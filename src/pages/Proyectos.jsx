import { GET_PROYECTOS } from 'graphql/Proyectos/queries';
import React, { useEffect } from 'react';
import { useQuery } from '@apollo/client';



const Proyectos = () => {
    // const { loading, error, data } = useQuery(GET_PROYECTOS);
    const { data, loading, error } = useQuery(GET_PROYECTOS);

    useEffect(() => {
        console.log(data);
    }, [data]);


    return (
        <div>
            <h4 className='text-3xl font-extrabold text-gray-900 p-8 ml-64'>
                Gestion de proyectos
            </h4>
            <table className='tabla' >
                <thead>
                    <tr>
                        <th>Nombre</th>
                        <th>Fase</th>
                        <th>Fecha inicio</th>
                        <th>Fecha fin</th>
                    
                    </tr>
                </thead>
                <tbody>
                    {data &&
                        data.Proyectos.map((p) => {
                            return (
                                <tr key={p._id}>
                                    <td>{p.nombre}</td>
                                    <td>{p.fase}</td>
                                    <td>{p.fechaInicio}</td>
                                    <td>{p.fechaFin}</td>
                                
                                </tr>
                            );
                        })}
                </tbody>
            </table>

        </div>
    )
}

export default Proyectos
