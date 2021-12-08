import React from 'react';
import Boton from '../components/Boton';

const avances = () => {
    return (
        <div className='place-items-center'>
            <h2 className='flex justify-center p-4 text text-2xl text-blue-400'>Listado de Avances al Proyecto NN</h2>
            <div className='flex flex-row justify-center p-4'>
                <table className='tabla'>
                    <tr>
                        <th>ID Avance</th>
                        <th>Fecha</th>
                        <th>Descripción</th>
                        <th>Observaciones</th>
                        <th>Acciones</th>
                    </tr>
                    <tr>
                        <td>235462352</td>
                        <td>30-11-2021</td>
                        <td>Se realizó una revisión de bibliografía</td>
                        <td>Se recomienda revisar el artículo académico "xx"</td>
                        <td>
                            <i class="fas fa-plus-circle"></i>
                        </td>
                    </tr>
                </table>
            </div>
            <div className='flex flex-row justify-around'>
                <Boton titulo='Volver a Proyectos'></Boton>
                <Boton titulo='Crea un Avance'></Boton>
            </div>
        </div>
    )
}

export default avances
