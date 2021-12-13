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
      <section className="flex flex-col border-2  border-blue-400 rounded-3xl p-12 m-8">
        <h1 className='flex justify-center text-2xl'>
          Iniciar sesión
        </h1>
        <form className='flex flex-col' onSubmit={submitForm} ref={form}>
          <label htmlFor='correo'>
            <input
              name='correo'
              className='registro-input m-2'
              placeholder='Correo'
              type='email'
              required
            />
          </label>


          <label htmlFor='password'>
            <input
              name='password'
              className='registro-input  m-2'
              type='password'
              placeholder='Contraseña'
              required
            />
          </label>
          <button
            type='submit'
            className='bg-transparent hover:bg-blue-500 text-blue-700 font-semibold hover:text-white py-2 px-2 border border-blue-500 hover:border-transparent  rounded-full'
          >
            Iniciar sesion
          </button>

        </form>
        <span className='flex justify-center mt-4'>¿No tienes una cuenta?</span>
        <Link to='/auth/registro'>
          <span className='flex justify-center text-blue-700'>Regístrate</span>
        </Link>
      </section>
    </div>
  );
};

export default Login;
