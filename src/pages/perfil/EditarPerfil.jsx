import React, { useRef, useState, useEffect } from 'react';
import Boton from 'components/Boton';
import { useParams, Link } from 'react-router-dom';
import { GET_USUARIO } from 'graphql/Usuarios/queries';
import { EDITAR_PERFIL } from 'graphql/Usuarios/mutations';
import { useQuery, useMutation } from '@apollo/client';
import { useNavigate } from 'react-router-dom';

const EditarPerfil = () => {
    const { _id } = useParams();
    const form = useRef(null);
    const [userData, setUserData] = useState({});
    let navigate = useNavigate();

    const {
        data: queryData,
        error: queryError,
        loading: queryLoading,
    } = useQuery(GET_USUARIO, {
        variables: { id: _id },
    });

    const [editPerfil, {
        data: dataMutation,
        loading: loadingMutation,
        error: errorMutation }] =
        useMutation(EDITAR_PERFIL);

    useEffect(() => {

        if (queryData) {
            console.log('QueryData: ', queryData);
            console.log(queryData.Usuario);
            setUserData(queryData.Usuario);
        }
    }, [queryData]);

    const submitForm = async (e) => {
        e.preventDefault();
        const fd = new FormData(form.current);

        const perfilEditado = {};
        console.log('variable fd:', fd)
        fd.forEach((value, key) => {
            perfilEditado[key] = value;
        });
        await editPerfil({
            variables: { id: _id, ...perfilEditado }
        });
        navigate('/perfil')
    };

    return (
        <div className='flex flex-col'>
            <section className=' flex flex-col   items-center justify-center bg-blue-100 border-2 border-blue-400 mx-44 my-4 rounded-3xl'>
            <h2 className='  p-4 text text-2xl text-blue-400'>
            Edita tu Perfil
            </h2>
                <form ref={form}
                    onSubmit={submitForm}
                    className='grid justify-items-center'
                >
                    <label htmlFor='nombre'>
                        Nombre
                        <input
                            name='nombre'
                            className='bg-gray-50 border border-gray-600 p-2 rounded-lg m-2'
                            type='text'
                            placeholder='Nombre'
                            required
                            defaultValue={userData.nombre}
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
                            defaultValue={userData.apellido}
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
                            defaultValue={userData.identificacion}
                        />
                    </label>

                    <label htmlFor='correo'>
                        Correo
                        <input
                            name='correo'
                            className='bg-gray-50 border border-gray-600 p-2 rounded-lg m-2'
                            type='email'
                            required
                            defaultValue={userData.correo}
                        />
                    </label>

                    <label htmlFor='password'>
                        Password
                        <input
                            name='password'
                            className='bg-gray-50 border border-gray-600 p-2 rounded-lg m-2'
                            type='password'
                            required
                            defaultValue={userData.password}
                        />
                    </label>

                    <label htmlFor='rol'>
                        Rol
                        <select
                            className='bg-gray-50 border border-gray-600 p-2 rounded-lg m-2'
                            name='rol'
                            required
                            defaultValue={userData.rol}
                        >

                            <option disabled value={0}>
                                Seleccione una opción
                            </option>
                            <option>ESTUDIANTE</option>
                            <option>LIDER</option>
                            <option>ADMINISTRADOR</option>

                        </select>
                    </label>

                    <label htmlFor='estado'>
                        Estado
                        <select
                            className='bg-gray-50 border border-gray-600 p-2 rounded-lg m-2'
                            name='estado'
                            required
                            defaultValue={userData.estado}
                        >

                            <option disabled value={0}>
                                Seleccione una opción
                            </option>
                            <option>PENDIENTE</option>
                            <option>AUTORIZADO</option>
                            <option>NO_AUTORIZADO</option>

                        </select>
                    </label>


                    <div className='flex flex-row justify-around my-6'>
                        <Link to='/perfil'>
                            <Boton titulo={'Volver a Perfil'} />
                        </Link>
                        <button
                            type='submit'
                            className="bg-transparent hover:bg-blue-500 text-blue-700 font-semibold hover:text-white py-2 px-4 border border-blue-500 hover:border-transparent rounded"
                        >
                            Guardar Cambios
                        </button>
                    </div>
                </form>
              
            </section>
        </div>
    )
}

export default EditarPerfil
