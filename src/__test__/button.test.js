import React from "react";
import ButtonLoading from 'components/ButtonLoading';
import { render, screen, cleanup } from '@testing-library/react';

afterEach(cleanup);

it('renders ok', () => {
    render(<ButtonLoading text='volver' loading={false} disasbled={false} />);
    expect(screen.getByTestId('button-loading')).toBeInTheDocument();
});

it('Mostrar texto cuando no este cargando', () => {
    render(<ButtonLoading text='volver' loading={false} disasbled={false} />);
    expect(screen.getByTestId('button-loading')).toHaveTextContent('volver');
});

it('No mostrar texto cuando este cargando', () => {
    render(<ButtonLoading text='volver' loading={true} disasbled={false} />);
    expect(screen.getByTestId('button-loading')).not.toHaveTextContent('volver');
});

it('Mostrar ReactLoading cuando esté cargando', () => {
    render(<ButtonLoading text='volver' loading={true} disabled={false} />);
    expect(screen.getByTestId('loading-in-button')).toBeInTheDocument();
});

it('Deshabilitar cuando se pase el prop', () => {
    render(<ButtonLoading text='volver' loading={true} disabled={true} />);
    expect(screen.getByTestId('button-loading')).toHaveAttribute('disabled');
});

it('Cargar svg cuando el loading este activado', () => {
    render(<ButtonLoading text='volver' loading={true} disabled={true} />);
    expect(screen.getByTestId('button-loading')).toMatchSnapshot();
});
