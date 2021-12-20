import React from 'react';
import { MockedProvider } from '@apollo/client/testing';
import Usuarios from 'pages/usuarios/Usuarios';
import { GET_USUARIOS } from 'graphql/Usuarios/queries';
import TestRenderer from 'react-test-renderer';
import PrivateRoute from 'components/PrivateRoute';
import { UserContext } from 'context/userContext';
import { cleanup } from '@testing-library/react';

afterEach(cleanup);

const mockData = {
    request: {
        query: GET_USUARIOS
    },
    result: {
        data: {
            Usuarios: [
                {
                    apellido: "estudiante",
                    correo: "estu@com.co",
                    estado: "AUTORIZADO",
                    identificacion: "9003",
                    nombre: "estudiante",
                    rol: "ESTUDIANTE",
                    _id: "61b52400dbf8521fc7cac71a"
                },
                {
                    apellido: "estudiante",
                    correo: "estu2@com.co",
                    estado: "AUTORIZADO",
                    identificacion: "90032",
                    nombre: "estudiante",
                    rol: "ESTUDIANTE",
                    _id: "61b52400dbf8521fc7cac71b"
                    
                }
            ]
        }

    }
};

it('renders cargando', () => {
    const component = TestRenderer.create(

        <UserContext.Provider value={{ userData: { rol: 'LIDER' } }}>
            <PrivateRoute roleList={['LIDER']}>
                <MockedProvider mocks={[mockData]} addTypename={false}>
                    <Usuarios />
                </MockedProvider>

            </PrivateRoute>
        </UserContext.Provider>

    );
    const tree = component.toJSON();
    expect(tree.children).toContain('Cargando');
});

const mockDataError = {
    request: {
        query: GET_USUARIOS
    },
    result: {
        errors: [
            {
                "message": "Failed to get string!",
            }
        ]

    }
};

it('renders error', async () => {
    const component = TestRenderer.create(

        <UserContext.Provider value={{ userData: { rol: 'LIDER' } }}>
            <PrivateRoute roleList={['LIDER']}>
                <MockedProvider mocks={[mockDataError]} addTypename={false}>
                    <Usuarios />
                </MockedProvider>

            </PrivateRoute>
        </UserContext.Provider>

    );
    await new Promise(resolve => setTimeout(resolve, 6));
    const tree = component.toJSON();
    expect(tree.children).toContain('Error');
});




