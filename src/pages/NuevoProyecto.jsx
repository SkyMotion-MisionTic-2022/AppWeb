import React, { useRef, useState } from 'react';
import { useMutation } from '@apollo/client';
import { CREAR_PROYECTO } from 'graphql/Proyectos/mutations';
import Boton from '../components/Boton';
import { Link } from 'react-router-dom';

const NuevoProyecto = () => {
    const form = useRef(null);
    const formObj = useRef(null);
    const [lideres, setlideres] = useState([]);
    const [objetivos, setObjetivos] = useState([]);
    const [crearProyecto, { data: dataMutation, loading: loadingMutation, error: errorMutation }] =
        useMutation(CREAR_PROYECTO);

    const submitFormObj = async (e) => {

        e.preventDefault();
        const fd = new FormData(formObj.current);

        const nuevoProyecto = {};
        fd.forEach((value, key) => {
            nuevoProyecto[key] = value;
        });
        
        setObjetivos(...nuevoProyecto);

        console.log([nuevoProyecto]);



    };

    const submitForm = async (e) => {

        e.preventDefault();
        const fd = new FormData(form.current);

        const nuevoProyecto = {};
        fd.forEach((value, key) => {
            nuevoProyecto[key] = value;
        });
        nuevoProyecto["presupuesto"] = parseFloat(nuevoProyecto["presupuesto"]);

        console.log(nuevoProyecto);

        await crearProyecto({
            variables: { ...nuevoProyecto },
        });


    };


    return (
        <div>
            <h4 className='flex justify-center p-4 text text-2xl m-14 text-blue-400'>
                Crear proyectos
            </h4>
            <Link to="/proyectos">
            <Boton titulo='Ver Proyecto'>
              
            </Boton>
            </Link>
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

                <h6 className='text-gray-900 p-8 ml-64'>
                    Crear objetivo
                </h6>
                <form ref={formObj}

                >
                    <label htmlFor='descripcion'>
                        Descripcion
                        <input
                            name='descripcion'
                            className='bg-gray-50 border border-gray-600 p-2 rounded-lg m-2'
                            type='text'
                            placeholder='Descripcion objetivo'
                            required
                        />
                    </label>

                    <label htmlFor='tipo'>
                     Tipo
                    <select
                        className='bg-gray-50 border border-gray-600 p-2 rounded-lg m-2'
                        name='tipo'
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
                        onClick={submitFormObj}
                        class='bg-transparent hover:bg-blue-500 text-blue-700 font-semibold hover:text-white py-2 px-4 border border-blue-500 hover:border-transparent rounded'
                    >
                    

                        Guardar objetivo
                    </button>

                    <table className='tabla'>
                <thead>
                    <tr>
                        <th>Descripcion</th>
                        <th>Tipo</th>
                        <th>Accion</th>
                    </tr>
                </thead>
                <tbody>
                   {objetivos.map((o) => {
                            return (
                                <tr>
                                    <td>{o.descripcion}</td>
                                    <td>{o.tipo}</td>

                                </tr>
                            );
                        })}
                    
                </tbody>
              
            </table>

                </form>


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
