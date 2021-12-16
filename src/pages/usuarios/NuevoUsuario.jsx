import React, { useRef, useState } from 'react'
import Boton from '../../components/Boton';
import { Link } from 'react-router-dom';
import { CREAR_USUARIO } from 'graphql/Usuarios/mutations';
import { useMutation } from '@apollo/client';

const NuevoUsuario = () => {
    const form = useRef(null);
    const [crearUsuario, { data: dataMutation, loading: loadingMutation, error: errorMutation }] =
        useMutation(CREAR_USUARIO);

    const submitForm = async (e) => {

        e.preventDefault();
        const fd = new FormData(form.current);

        const nuevoProyecto = {};
        fd.forEach((value, key) => {
            nuevoProyecto[key] = value;
        });
        console.log(nuevoProyecto);
        await crearUsuario({
            variables: { ...nuevoProyecto },
        });

    };

    return (
        <div>
            <h4 className='flex justify-center p-4 text text-2xl m-14 text-blue-400'>
                Crear usuario
            </h4>

            <form ref={form}
                onSubmit={submitForm}

            >
                <div className='items-center'>
                    <label htmlFor='nombre'>
                        Nombre
                        <input
                            name='nombre'
                            className='bg-gray-50 border border-gray-600 p-2 rounded-lg m-2'
                            type='text'
                            placeholder='Nombre'
                            required
                        />
                    </label>

                    <label htmlFor='apellido'>
                        Apellido
                        <input
                            name='apellido'
                            className='bg-gray-50 border border-gray-600 p-2 rounded-lg m-2'
                            type='text'
                            placeholder='apellido'
                            required
                        />
                    </label>

                    <label htmlFor='identificacion'>
                        Identificacion
                        <input
                            name='identificacion'
                            className='bg-gray-50 border border-gray-600 p-2 rounded-lg m-2'
                            type='text'
                            placeholder='identificacion'
                            required
                        />
                    </label>

                    <label htmlFor='correo'>
                        Correo
                        <input
                            name='correo'
                            className='bg-gray-50 border border-gray-600 p-2 rounded-lg m-2'
                            type='email'
                            required
                        />
                    </label>

                </div>
                <div className='place-content-around'>
            


                    <label htmlFor='password'>
                        Contraseña
                        <input
                            name='password'
                            className='bg-gray-50 border border-gray-600 p-2 rounded-lg m-2'
                            type='text'
                            placeholder='contraseña'
                            required
                        />
                    </label>

                    <label htmlFor='estado'>
                        Estado
                        <select
                            className='bg-gray-50 border border-gray-600 p-2 rounded-lg m-2'
                            name='estado'
                            required
                            defaultValue={0}
                        >

                            <option disabled value={0}>
                                Seleccione una opción
                            </option>
                            <option>PENDIENTE</option>
                            <option>AUTORIZADO</option>
                            <option>NO_AUTORIZADO</option>

                        </select>
                    </label>

                    <label htmlFor='rol'>
                    Rol
                    <select
                        className='bg-gray-50 border border-gray-600 p-2 rounded-lg m-2'
                        name='rol'
                        required
                        defaultValue={0}
                    >

                        <option disabled value={0}>
                            Seleccione una opción
                        </option>
                        <option>ESTUDIANTE</option>
                        <option>LIDER</option>
                        <option>ADMINISTRADOR</option>

                    </select>
                </label>


                </div>

        


                <div className='flex flex-row justify-around'>
                    <Link to="/usuarios">
                        <Boton titulo='ver usuarios'>
                        </Boton>
                    </Link>
                    <button
                        type='submit'
                        class='bg-transparent hover:bg-blue-500 text-blue-700 font-semibold hover:text-white py-2 px-4 border border-blue-500 hover:border-transparent rounded'
                    >
                        Guardar usuario
                    </button>
                </div>


            </form >



        </div>
    )
}

export default NuevoUsuario
