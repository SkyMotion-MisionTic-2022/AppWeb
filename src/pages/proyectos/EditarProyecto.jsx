import React, { useRef, useState } from 'react';
import { useMutation } from '@apollo/client';
import { CREAR_PROYECTO } from 'graphql/Proyectos/mutations';
import Boton from '../../components/Boton';
import { Link } from 'react-router-dom';
import { nanoid } from 'nanoid';
import { CreateObjectiveContext } from 'context/createObjectiveContext';
import { useCreateObjective } from 'context/createObjectiveContext';

const EditarProyecto = () => {
    const form = useRef(null);
    const [crearProyecto, { data: dataMutation, loading: loadingMutation, error: errorMutation }] =
        useMutation(CREAR_PROYECTO);


    const submitForm = async (e) => {

        e.preventDefault();
        const fd = new FormData(form.current);

    };


    return (
        <div>
            <h4 className='flex justify-center p-4 text text-2xl m-14 text-blue-400'>
                Editar proyecto
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
                        placeholder='Nombre proyecto'
                        required
                    />
                </label>
                <label htmlFor='presupuesto'>
                    Presupuesto
                    <input
                        name='presupuesto'
                        className='bg-gray-50 border border-gray-600 p-2 rounded-lg m-2'
                        type='number'
                        placeholder='70.000'
                        required
                    />
                </label>

                <label htmlFor='fechaInicio'>
                    Fecha inicio
                    <input
                        name='fechaInicio'
                        className='bg-gray-50 border border-gray-600 p-2 rounded-lg m-2'
                        type="date"
                        required
                    />
                </label>
                <label htmlFor='fechaFin'>
                    Fecha fin
                    <input
                        name='fechaFin'
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
                <div className='flex flex-row justify-around' >
               

                </div>

                <div className='flex flex-row justify-around'>
                    <Link to="/proyectos">
                        <Boton titulo='ver proyectos'>
                        </Boton>
                    </Link>
                    <button
                        type='submit'
                        class='bg-transparent hover:bg-blue-500 text-blue-700 font-semibold hover:text-white py-2 px-4 border border-blue-500 hover:border-transparent rounded'
                    >
                        Guardar proyecto
                    </button>
                </div>


            </form >



        </div >
    )
};

export default EditarProyecto