import React, { useRef, useState, useEffect } from 'react'
import { useParams, Link } from 'react-router-dom';
import { GET_USUARIO } from 'graphql/Usuarios/queries';
import { EDITAR_USUARIO } from 'graphql/Usuarios/mutations';
import { useQuery, useMutation } from '@apollo/client';
import Boton from '../../components/Boton';
import { useNavigate } from 'react-router-dom';


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

        e.preventDefault();
        const fd = new FormData(form.current);

        const usuarioEditado = {};
        fd.forEach((value, key) => {
            usuarioEditado[key] = value;
        });
        await editUser({
            variables: { id:_id, ...usuarioEditado },
          });
      
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
                    Rol
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
