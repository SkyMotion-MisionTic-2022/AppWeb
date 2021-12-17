import React, { useRef, useState, useEffect } from 'react'
import { useParams, Link } from 'react-router-dom';
import { GET_USUARIO } from 'graphql/Usuarios/queries';
import { EDITAR_USUARIO } from 'graphql/Usuarios/mutations';
import { useQuery, useMutation } from '@apollo/client';
import Boton from '../../components/Boton';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';


const EditarUsuario = () => {
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


    const [editUser, { data: dataMutation, loading: loadingMutation, error: errorMutation }] =
        useMutation(EDITAR_USUARIO);


    useEffect(() => {

        if (queryData) {
            console.log('dq', queryData);
            console.log(queryData.Usuario);
            setUserData(queryData.Usuario);
        }
    }, [queryData]);

    const submitForm = async (e) => {
        console.log('si funciona')
        e.preventDefault();
        const fd = new FormData(form.current);

        const usuarioEditado = {};
        fd.forEach((value, key) => {
            usuarioEditado[key] = value;
        });
        console.log(usuarioEditado)
        await editUser({
            variables: { id: _id, ...usuarioEditado },
        });
        toast.success('Usuario editado con éxito');
        navigate('/usuarios');


    };
    return (
        <div>
            <h4 className='text-3xl font-extrabold text-gray-900 p-8 ml-64'>
                Editar usuario
            </h4>
            <form ref={form}
                onSubmit={submitForm}

            >
                <label>
                    Nombre
                    <input
                        className='bg-gray-50 border border-gray-600 p-2 rounded-lg m-2'
                        type='text'
                        defaultValue={userData.nombre}
                        disabled
                    />
                </label>

                <label>
                    Apellido
                    <input
                        className='bg-gray-50 border border-gray-600 p-2 rounded-lg m-2'
                        type='text'
                        placeholder='apellido'
                        disabled
                        defaultValue={userData.apellido}
                    />
                </label>

                <label>
                    Identificacion
                    <input
                        className='bg-gray-50 border border-gray-600 p-2 rounded-lg m-2'
                        type='text'
                        disabled
                        defaultValue={userData.identificacion}
                    />
                </label>

                <label>
                    Correo
                    <input
                        className='bg-gray-50 border border-gray-600 p-2 rounded-lg m-2'
                        type='email'
                        disabled
                        defaultValue={userData.correo}
                    />
                </label>

                <label>
                    Rol
                    <input
                        className='bg-gray-50 border border-gray-600 p-2 rounded-lg m-2'
                        type='text'
                        disabled
                        defaultValue={userData.rol}
                    />
                </label>


                <label htmlFor='estado'>
                    Estado
                    <select
                        className='bg-gray-50 border border-gray-600 p-2 rounded-lg m-2'
                        name='estado'
                        required
                    >

                        <option disabled value={0}>
                            Seleccione una opción
                        </option>
                        <option>PENDIENTE</option>
                        <option>AUTORIZADO</option>
                        <option>NO_AUTORIZADO</option>

                    </select>
                </label>

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

export default EditarUsuario
