import React from 'react';
import { MockedProvider } from '@apollo/client/testing';
import Proyectos from 'pages/proyectos/Proyectos';
import { GET_PROYECTOS } from 'graphql/Proyectos/queries';
import TestRenderer from 'react-test-renderer';
import PrivateRoute from 'components/PrivateRoute';
import { UserContext } from 'context/userContext';

const mockData = {
  request: {
    query: GET_PROYECTOS
  },
  result: {
    data: {
      Proyectos: [
        {
          _id: "61b54502c2f5c8d4c2ebb447",
          nombre: "Investigación sobre nutrias",
          fase: "NULO",
          fechaInicio: "2021-12-09T00:00:00.000Z",
          fechaFin: "2021-12-09T00:00:00.000Z",
          estado: "ACTIVO"
        },
        {
          _id: "61b5675928af6626d9020ab3",
          nombre: "Mintic 2021",
          fase: "NULO",
          fechaInicio: "2021-05-18T00:00:00.000Z",
          fechaFin: "2021-12-17T00:00:00.000Z",
          estado: "INACTIVO"
        },
        {
          _id: "61b567d528af6626d9020aba",
          nombre: "Mision tic2022",
          fase: "TERMINADO",
          fechaInicio: "2021-12-01T00:00:00.000Z",
          fechaFin: "2022-02-25T00:00:00.000Z",
          estado: "ACTIVO"
        }
      ]
    }

  }
};

it('renders cargando',() => {
  const component = TestRenderer.create(

    <UserContext.Provider value={{ userData: { rol: 'LIDER' } }}>
      <PrivateRoute roleList={['LIDER']}>
        <MockedProvider mocks={[mockData]} addTypename={false}>
          <Proyectos />
        </MockedProvider>

      </PrivateRoute>
    </UserContext.Provider>
    
  );
  const tree = component.toJSON();
  expect(tree.children).toContain('Cargando');
});

const mockDataError = {
  request: {
    query: GET_PROYECTOS
  },
  result: {
    errors: [
      {
        "message": "Failed to get string!",
      }
    ]
   
  }
};

it('renders error',  async() => {
  const component = TestRenderer.create(

    <UserContext.Provider value={{ userData: { rol: 'LIDER' } }}>
      <PrivateRoute roleList={['LIDER']}>
        <MockedProvider mocks={[mockDataError]} addTypename={false}>
          <Proyectos />
        </MockedProvider>

      </PrivateRoute>
    </UserContext.Provider>
    
  );
  await new Promise(resolve => setTimeout(resolve, 0)); 
  const tree = component.toJSON();
  expect(tree.children).toContain('Error');
});


