import React from 'react';
import { MockedProvider } from '@apollo/client/testing';
import Avances from '../pages/avances/Avances';
import { GET_AVANCES_FILTRADOS } from 'graphql/Avances/queries';
import TestRenderer from 'react-test-renderer';
import PrivateRoute from 'components/PrivateRoute';

const mockData = {
    request: {
        query: GET_AVANCES_FILTRADOS,
        variables: {
            idProyecto: '61b54502c2f5c8d4c2ebb447',
        },
    },
    result: {
        data: {
            filtrarAvance: [
                {
                    "_id": "61bb72738bcbbc4b0b5959a2",
                    "proyecto": {
                        "_id": "61b54502c2f5c8d4c2ebb447"
                    },
                    "fecha": "1970-01-01T00:00:02.021Z",
                    "descripcion": "avance 1",
                    "creadoPor": {
                        "_id": "61b52400dbf8521fc7cac71a"
                    },
                    "observaciones": []
                }
            ]
        }
    }
};

it('renderizar cargando', () => {
    const component = TestRenderer.create(
        <MockedProvider mocks={[mockData]} addTypename={false} >
            <Avances />
        </MockedProvider>
    );
    const tree = component.toJSON();
    expect(tree.children).toContain('Cargando....');
});