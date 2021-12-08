import React, { useEffect, useRef } from 'react';
import { LOGIN } from 'graphql/Auth/mutations';
import { Link } from 'react-router-dom';
import { useMutation } from '@apollo/client';
import { useAuth } from 'context/authContext';
import { useNavigate } from 'react-router-dom';

const Login = () => {
  const { setToken } = useAuth();
  const form = useRef(null);
  let navigate = useNavigate();

  const [login, { data: dataMutation, loading: loadingMutation, error: errorMutation }] =
    useMutation(LOGIN);

  const submitForm = (e) => {
    e.preventDefault();
    const fd = new FormData(form.current);

    const loginV = {};
    fd.forEach((value, key) => {
      loginV[key] = value;
    });
    console.log(loginV);
    login({ variables: loginV });
    console.log(dataMutation);
  };

  useEffect(() => {
    if (dataMutation) {
      if (dataMutation.login.error) {
        console.error('MOSTRAR MENSAJE DE ERROR AQUI');
      }
      setToken(dataMutation.login.token);
      navigate('/');
    }
  }, [dataMutation, setToken, navigate]);

  return (
    <div className='flex flex-col items-center justify-center w-full h-full p-10'>
      <h1 className='text-xl font-bold text-gray-900'>Iniciar sesión</h1>
      <form className='flex flex-col' onSubmit={submitForm} ref={form}>
        <label htmlFor='correo'>
          Correo
          <input
            name='correo'
            className='bg-gray-50 border border-gray-600 p-2 rounded-lg m-2'
            type='email'
            required
          />
        </label>


        <label htmlFor='password'>
          Contraseña
          <input
            name='password'
            className='bg-gray-50 border border-gray-600 p-2 rounded-lg m-2'
            type='password'
            placeholder='contraseña'
            required
          />
        </label>
        <button
          type='submit'
          class='bg-transparent hover:bg-blue-500 text-blue-700 font-semibold hover:text-white py-2 px-4 border border-blue-500 hover:border-transparent rounded'
        >
          Iniciar sesion
        </button>

      </form>
      <span>¿No tienes una cuenta?</span>
      <Link to='/auth/register'>
        <span className='text-blue-700'>Regístrate</span>
      </Link>
    </div>
  );
};

export default Login;
