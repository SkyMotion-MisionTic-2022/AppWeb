import React, { useState } from 'react';

import Boton from 'components/Boton';
import { Link } from 'react-router-dom';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import Button from '@mui/material/Button';

const CrearAvance = () => {
    const [open, setOpen] = React.useState(false);

    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

    return (
        <div>
            <h2 className='flex justify-center p-4 text text-2xl text-blue-400'>Crear Avances al Proyecto NN</h2>
            <form>
                <label htmlFor="">Descripción</label>
                <input type="text" />
            </form>
            <div>
                <Link to='/avances'>
                    <Boton titulo='Volver'></Boton>
                </Link>
            </div>
            <button onClick={handleClickOpen}>Crear</button>
            <Dialog open={open} onClose={handleClose}>
                <DialogContent>

                    <form>
                        <label htmlFor="">Nombre</label>
                        <input type="text" name='nombre' label='nombre' />
                    </form>
                </DialogContent>
                {/* <DialogTitle>Crear Avance</DialogTitle>
                <DialogContent>
                    <DialogContentText>
                        Agrega una descripción del avance que has realizado a tu proyecto
                    </DialogContentText>
                    <TextField
                        autoFocus
                        margin="dense"
                        id="name"
                        label="Descripción"
                        type="text"
                        fullWidth
                        variant="standard"
                    />
                </DialogContent> */}
                <DialogActions>
                    <Button onClick={handleClose}>Cancelar</Button>
                    <Button onClick={handleClose}>Agregar</Button>
                </DialogActions>
            </Dialog>
        </div>
    )
}

export default CrearAvance
