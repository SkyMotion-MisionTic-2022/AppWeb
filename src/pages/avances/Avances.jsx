import React, { useState, useEffect } from 'react';
import { useQuery, useMutation } from '@apollo/client';
import Boton from 'components/Boton';
import { GET_AVANCES_FILTRADOS } from 'graphql/Avances/queries';
import { Tooltip } from '@material-ui/core';
import { Link } from 'react-router-dom';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import Button from '@mui/material/Button';
import useFormData from 'hooks/useFormData';
import { CREAR_AVANCE } from 'graphql/Avances/mutations';


const Avances = () => {
    const [dataAvance, setDataAvance] = useState([]);
    const [open, setOpen] = useState(false);

    const {
        data: queryData,
        error: queryError,
        loading: queryLoading,
        refetch
    } = useQuery(GET_AVANCES_FILTRADOS, {
        variables: { idProyecto: "61b52c31fbf38c8b816bd15d" }
    });

    useEffect(() => {
        setDataAvance(queryData);
    }, [queryData]);

    useEffect(() => {
        // console.log('info aqui', dataAvance);
    }, [dataAvance])

    return (
        <div className='place-items-center'>
            <h2 className='flex justify-center p-4 text text-2xl text-blue-400'>Listado de Avances al Proyecto NN</h2>
            {/* <h2 className='flex justify-center p-4 text text-2xl text-blue-400'>Listado de Avances al Proyecto {dataAvance[0].proyecto.nombre}</h2> */}
            <h4 className='mx-10'>Lider: Nombre del Lider</h4>
            <div className='flex flex-row justify-center p-4'>
                <table className='tabla'>
                    <thead>
                        <tr>
                            <th>ID Avance</th>
                            <th>Fecha</th>
                            <th>Descripción</th>
                            <th>Estudiante</th>
                            <th>Observaciones</th>
                            <th>Acciones</th>
                        </tr>
                    </thead>
                    <tbody>
                        {queryData && queryData.filtrarAvance.map((a) => {
                            return (
                                <tr key={a._id}>
                                    <td>{a._id}</td>
                                    <td>{a.fecha}</td>
                                    <td>{a.descripcion}</td>
                                    <td>{a.creadoPor.nombre} {a.creadoPor.apellido} </td>
                                    <td>observacion </td>
                                    <td>
                                        <Tooltip title='Agregar Observación' arrow>

                                            <i className="fas fa-plus-circle"></i>
                                        </Tooltip>

                                    </td>
                                </tr>
                            );
                        })}
                    </tbody>
                </table>
            </div>
            <div className='flex flex-row justify-around'>
                <Boton titulo='Volver a Proyectos'></Boton>
                <Link to='/crearAvance'>
                    <Boton titulo='crear Avance'></Boton>
                </Link>
                <button onClick={() => { setOpen(true) }}>Oprima</button>
            </div>
            <Dialog open={open} onClose={() => setOpen(false)}>
                <FormularioAvance />
            </Dialog>
        </div>
    )
};

const FormularioAvance = () => {
    const { form, formData, updateFormData } = useFormData();
    const [crearAvance, { data: dataMutation, loading, error }] = useMutation(CREAR_AVANCE);

    const sendForm = (e) => {
        e.preventDefault();

        crearAvance({
            variables: { formData }
        })

    };

    return (
        <form
            ref={form} onChange={updateFormData}
        ><h2>Agregar Avance</h2>
            <label htmlFor='proyecto'>
                ID Proyecto
                <input
                    name='proyecto'
                    className='bg-gray-50 border border-gray-600 p-2 rounded-lg m-2 h-6 w-40'
                    type='text'
                    placeholder='ID proyecto'
                />
            </label>
            <label htmlFor='creadoPor'>
                ID Estudiante
                <input
                    name='creadoPor'
                    className='bg-gray-50 border border-gray-600 p-2 rounded-lg m-2 h-6 w-40'
                    type='text'
                    placeholder='ID Estudiante'
                />
            </label>
            <label htmlFor='fecha'>
                Fecha
                <input
                    name='fecha'
                    className='bg-gray-50 border border-gray-600 p-2 rounded-lg m-2 h-6 w-42'
                    type='date'

                />
            </label>
            <label htmlFor='descripcion'>
                Descripción
                <input
                    name='descripcion'
                    className='bg-gray-50 border border-gray-600 p-2 rounded-lg m-2 h-48 w-96'
                    type='text'
                    placeholder='...'
                />
            </label>
            <Button onClick={sendForm}>Agregar</Button>
        </form>
    )
};


export default Avances
