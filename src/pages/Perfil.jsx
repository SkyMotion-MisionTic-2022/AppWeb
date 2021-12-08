import React from 'react'

const perfil = () => {
    return (
        <div className='place-content-center'>
            <div>
            <h2 className='flex justify-center p-4 text text-2xl text-blue-400'>Edita tu Perfil</h2>
            </div>
            <div className='flex flex-row justify-center p-4'>
                <table className='table-auto bg-gray-200 rounded-md divide-white'>
                    <tr className='bg-white'>
                        <th>Nombre</th>
                        <th>Identificación</th>
                        <th>Correo</th>
                        <th>Contraseña</th>
                        <th>Rol</th>
                        <th>Acciones</th>
                    </tr>
                    <tr>
                        <td>Juliana Vanegas</td>
                        <td>30567843</td>
                        <td>jvanegas@gmail.com</td>
                        <td>password</td>
                        <td>Estudiante</td>
                        <td>
                            <i class="far fa-edit"></i>
                        </td>
                    </tr>
                </table>
            </div>
        </div>
    )
}

export default perfil
