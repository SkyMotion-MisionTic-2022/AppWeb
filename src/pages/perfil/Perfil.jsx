import React, { useEffect } from 'react';
import { useUser } from 'context/userContext';

const Perfil = () => {

    const { userData } = useUser();
    console.log(userData);
    return (
        <div className='place-content-center'>
            <div>
                <h2 className='flex justify-center p-4 text text-2xl text-blue-400'>Edita tu Perfil</h2>
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
                        <td>{userData.nombre}</td>
                        <td>{userData.apellido}</td>
                        <td>{userData.identificacion}</td>
                        <td>{userData.correo}</td>
                        <td>{userData.password}</td>
                        <td>{userData.rol}</td>
                        <td>
                            <i class="far fa-edit"></i>
                        </td>
                    </tr>
                </table>
            </div>
        </div>
    )
}

export default Perfil
