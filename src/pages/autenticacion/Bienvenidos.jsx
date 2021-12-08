import React from 'react';
import { Link } from 'react-router-dom';
import ButtonLoading from 'components/ButtonLoading';
import Input from 'components/input';
import useFormData from 'hooks/useFormData';
import { useMutation } from '@apollo/client';
import { LOGIN } from 'graphql/autenticacion/mutations';
import { useAuth } from 'context/contextoAutenticacion';
import { useNavigate } from 'react-router-dom';

const Bienvenidos = () => {
  const navigate = useNavigate();
  const { setToken } = useAuth();
  const { form, formData, updateFormData } = useFormData();

  const [login, { data: dataMutation, loading: mutationLoading, error: mutationError }] =
    useMutation(LOGIN);

  const submitForm = (e) => {
    e.preventDefault();
    login({
      variables: formData,
    });
  };

  useEffect(() => {
    if (dataMutation) {
      if (dataMutation.login.token) {
        setToken(dataMutation.login.token);
        navigate('/');
      }
    }
  }, [dataMutation, setToken, navigate]);

  return (
    <main className="fondo  flex place-content-center ">
      <div className="container px-10 py-10 ">
        <div className="relative pb-24 ">
          <h2 className="font-extrabold text-5xl pt-16 mb-16">
            EL mejor modelo de sistema de información
            <br></br>
            <span className="text-blue-500"> Soporta </span>
            La gestión tú proyectos de investigación y
            <span className="text-blue-500"> mejora tús procesos.</span>
          </h2>
          <div>
            <form className='flex flex-col' onSubmit={submitForm} onChange={updateFormData} ref={form}>
              <Input name='correo' type='email' label='Correo' required={true} />
              <Input name='password' type='password' label='Contraseña' required={true} />
              <ButtonLoading
                disabled={Object.keys(formData).length === 0}
                loading={mutationLoading}
                text='Iniciar Sesión'
              />
            </form>
          </div>
          <div className="inline-flex flex-col text-center">
            <Link to='/autenticacion/registro' className="text-3xl py-4 px-8 transition rounded-md font-semibold mb-1 text-white bg-blue-500 ring-transparent focus:outline-none hover:bg-blue-600">
              ¡Registrate
            </Link>
          </div>

        </div>
      </div>
    </main>
  );
};

export default Bienvenidos;