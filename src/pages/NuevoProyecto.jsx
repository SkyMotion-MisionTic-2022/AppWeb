import React, { useRef } from 'react';
import { useMutation } from '@apollo/client';
import { CREAR_PROYECTO } from 'graphql/Proyectos/mutations';


const NuevoProyecto = () => {
    const form = useRef(null);
    const [crearProyecto, { data: dataMutation, loading: loadingMutation, error: errorMutation }] =
    useMutation(CREAR_PROYECTO);

    const submitForm = async (e) => {
        e.preventDefault();
        const fd = new FormData(form.current);
        await crearProyecto({
            variables: {...fd },
          });


    };
    return (
        <div>
            <h4 className='text-3xl font-extrabold text-gray-900 p-8 ml-64'>
                Crear proyectos
            </h4>
            <form ref={form} onSubmit={submitForm}

            // className='flex flex-col items-center justify-center'
            >
                <label htmlFor='nombre'>
                    Nombre
                    <input
                        name='nombre'
                        className='bg-gray-50 border border-gray-600 p-2 rounded-lg m-2'
                        type='text'
                        placeholder='Nombre proyecto'
                        required
                    />
                </label>

                <label htmlFor='presupuesto'>
                    Presupuesto
                    <input
                        className='bg-gray-50 border border-gray-600 p-2 rounded-lg m-2'
                        type='text'
                        placeholder='70.000'
                        required
                    />
                </label>

                <label htmlFor='fechaInicio'>
                    Fecha inicio
                    <input
                        className='bg-gray-50 border border-gray-600 p-2 rounded-lg m-2'
                        type="date"
                        required
                    />
                </label>
                <label htmlFor='fechaFin'>
                    Fecha fin
                    <input
                        className='bg-gray-50 border border-gray-600 p-2 rounded-lg m-2'
                        type="date"
                        required
                    />
                </label>

                <label htmlFor='lider'>
                    Lider
                    <select
                        className='bg-gray-50 border border-gray-600 p-2 rounded-lg m-2'
                        name='lider'
                        required
                        defaultValue={0}
                    >

                        <option disabled value={0}>
                            Seleccione una opción
                        </option>
                        <option>619adf7960d6c38bb4ce1d22</option>
                        <option>619ceafc20aed9151fcc0d38</option>

                    </select>
                </label>

                <button
                    type='submit'
                    class='bg-transparent hover:bg-blue-500 text-blue-700 font-semibold hover:text-white py-2 px-4 border border-blue-500 hover:border-transparent rounded'
                >
                    Guardar proyecto
                </button>

            </form>

        </div>
    )
}

export default NuevoProyecto
