import React, { useRef, useEffect }from 'react'
import { REGISTRO } from 'graphql/Auth/mutations';
import { useMutation } from '@apollo/client';
import { useAuth } from 'context/authContext';
import { useNavigate } from 'react-router-dom';

const Registro = () => {
    const form = useRef(null);
    const { setToken } = useAuth();
    let navigate = useNavigate();

    const [regis, { data: dataMutation, loading: loadingMutation, error: errorMutation }] =
    useMutation(REGISTRO);

    useEffect(() => {
        if (dataMutation) {
          if (dataMutation.registro.error) {
            console.error('MOSTRAR MENSAJE DE ERROR AQUI');
          }
          setToken(dataMutation.registro.token);
          navigate('/');
        }
      }, [dataMutation, setToken, navigate]);


    const submitForm = async (e) => {

        e.preventDefault();
        const fd = new FormData(form.current);

        const registro = {};
        fd.forEach((value, key) => {
            registro[key] = value;
        });
        console.log(registro);
        regis({ variables: registro });
    }    
    return (
      <div className=" ">
        <form ref={form} onSubmit={submitForm}>
          <div className="bg-color flex flex-col items-center">
            <section className="flex flex-col border-2  border-gray-100 rounded-3xl p-20 m-8">
              <h4 className="flex justify-center p-2  text-2xl text-gray-100">
                Regístrate
              </h4>
              <label htmlFor="nombre ">
                <input
                  name="nombre"
                  className="registro-input  m-2 "
                  type="text"
                  placeholder="Nombre"
                  required
                />
              </label>

              <label htmlFor="apellido">
                <input
                  name="apellido"
                  className="registro-input  m-2"
                  type="text"
                  placeholder="Apellido"
                  required
                />
              </label>

              <label htmlFor="identificacion">
                <input
                  name="identificacion"
                  className="registro-input  m-2"
                  type="text"
                  placeholder="Identificacion"
                  required
                />
              </label>

              <label htmlFor="correo">
                <input
                  name="correo"
                  className="registro-input  m-2"
                  type="email"
                  placeholder="Correo"
                  required
                />
              </label>

              <label htmlFor="password">
                <input
                  name="password"
                  className="registro-input b m-2"
                  type="password"
                  placeholder="Contraseña"
                  required
                />
              </label>

              <label htmlFor="rol">
                <select
                  className="registro-input  text-gray-100 m-2"
                  name="rol"
                  required
                  defaultValue={0}
                >
                  <option disabled value={0}>
                    Seleccione un Rol:
                  </option>
                  <option className='text-black'>ESTUDIANTE</option>
                  <option className='text-black'>LIDER</option>
                  <option className='text-black'>ADMINISTRADOR</option>
                </select>
              </label>
              <div className="flex flex-row justify-around">
                <button
                  type="submit"
                  class="bg-transparent hover:bg-blue-500 text-gray-100 font-semibold hover:text-white m-4 py-2 px-16 border rounded-full  border-gray-100 hover:border-transparent"
                >
                  Registro
                </button>
              </div>
            </section>
          </div>
        </form>
      </div>
    );
}

            export default Registro
