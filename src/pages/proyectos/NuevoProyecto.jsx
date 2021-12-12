import React, { useRef, useState } from 'react';
import { useMutation } from '@apollo/client';
import { CREAR_PROYECTO } from 'graphql/Proyectos/mutations';
import Boton from '../../components/Boton';
import { Link } from 'react-router-dom';
import { nanoid } from 'nanoid';
import { CreateObjectiveContext } from 'context/createObjectiveContext';
import { useCreateObjective } from 'context/createObjectiveContext';
import { useUser } from 'context/userContext';

const NuevoProyecto = () => {
    const form = useRef(null);
    const { userData, setUserData } = useUser();
    const [crearProyecto, { data: dataMutation, loading: loadingMutation, error: errorMutation }] =
        useMutation(CREAR_PROYECTO);




    const submitForm = async (e) => {

        e.preventDefault();
        const fd = new FormData(form.current);

        const nuevoProyecto = {};
        /*fd.forEach((value, key) => {
            nuevoProyecto[key] = value;
        });*/
        fd.forEach((value, key) => {
            if (key.includes('nested')) {
              const [p0, p1, p2, p3] = key.split('||');
              if (Object.keys(nuevoProyecto).includes(p1)) {
                if (Object.keys(nuevoProyecto[p1]).includes(p2)) {
                    nuevoProyecto[p1][p2][p3] = value;
                } else {
                    nuevoProyecto[p1][p2] = {
                    [p3]: value,
                  };
                }
              } else {
                nuevoProyecto[p1] = {
                  [p2]: {
                    [p3]: value,
                  },
                };
              }
            } else {
                nuevoProyecto[key] = value;
            }
          });

          nuevoProyecto["objetivos"] = Object.values(nuevoProyecto.objetivos);  
        nuevoProyecto["presupuesto"] = parseFloat(nuevoProyecto["presupuesto"]);
        nuevoProyecto["lider"]=userData._id;

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
                    <input
                        name='lider'
                        className='bg-gray-50 border border-gray-600 p-2 rounded-lg m-2'
                        type='text'
                        placeholder='Nombre proyecto'
                        required
                        disabled
                        defaultValue={userData.correo}
                    />
                </label>
                <div className='flex flex-row justify-around' >
                <Objetivos />

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
const Objetivos = () => {
    const [listaObjetivos, setListaObjetivos] = useState([]);

    const removeObjetivo = (obj) => {
        setListaObjetivos(listaObjetivos.filter((el) => el.props.id !== obj));
    };

    const addObjetivo = () => {
        const id = nanoid();
        return <Objetivo key={id} id={id} />;
    };

    return (
        <CreateObjectiveContext.Provider value={{ removeObjetivo }}>
            <div>
                <span className='text-blue-400'> Adicionar objetivos del Proyecto:</span>
                <i
                    className='fas fa-plus rounded-full bg-green-500 hover:bg-green-400 text-white p-2 mx-2 cursor-pointer'
                    onClick={() => {
                        setListaObjetivos([...listaObjetivos, addObjetivo()]);
                    }}
                />
                {listaObjetivos.map((El) => {
                    return El;
                })}
            </div>
        </CreateObjectiveContext.Provider>
    );
};

const Objetivo = ({ id }) => {
    const { removeObjetivo } = useCreateObjective();
    return (
        <div className='flex items-center'>
            <label htmlFor={`nested||objetivos||${id}||descripcion`}>
                Descripcion
                <input
                    name={`nested||objetivos||${id}||descripcion`}
                    className='bg-gray-50 border border-gray-600 p-2 rounded-lg m-2'
                    type='text'
                    placeholder='Descripcion'
                    required
                />
            </label>

            <label htmlFor={`nested||objetivos||${id}||tipo`}>
                Tipo
                <select
                    className='bg-gray-50 border border-gray-600 p-2 rounded-lg m-2'
                    name={`nested||objetivos||${id}||tipo`}
                    required
                    defaultValue={0}
                >

                    <option disabled value={0}>
                        Seleccione una opción
                    </option>
                    <option>GENERAL</option>
                    <option>ESPECIFICO</option>

                </select>
            </label>

            <i
                className='fas fa-minus mt-6 bg-red-500 text-white p-2 rounded-full cursor-pointer hover:bg-red-400'
                onClick={() => removeObjetivo(id)}
            />
        </div>
    );
};


export default NuevoProyecto
