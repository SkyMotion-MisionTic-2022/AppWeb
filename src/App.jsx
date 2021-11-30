import React, { useState } from 'react';
import PrivateLayout from 'layouts/PrivateLayout';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { UserContext } from 'context/userContext';
import Index from 'pages/Index';
import Usuarios from 'pages/Usuarios';
import Proyectos from 'pages/Proyectos';
import Inscripciones from 'pages/Inscripciones';
import Avances from 'pages/Avances';
import Perfil from 'pages/Perfil';
import 'styles/globals.css';
import 'styles/tabla.css';
import { ApolloProvider, ApolloClient, InMemoryCache, createHttpLink } from '@apollo/client';
import NuevoProyecto from 'pages/NuevoProyecto';

// import PrivateRoute from 'components/PrivateRoute';

function App() {
  const [userData, setUserData] = useState({});

const htppLink = createHttpLink({
 // uri: "https://back-skymotion2.herokuapp.com/graphql"
 uri: "http://localhost:4000/graphql"
})

const client = new ApolloClient({
  uri: "http://localhost:4000/graphql",
  cache: new InMemoryCache()
});


  return (
    <ApolloProvider client={client}> 
      <UserContext.Provider value={{ userData, setUserData }}>
        <BrowserRouter>
            <Routes>
              <Route path='/' element={<PrivateLayout />}>
                <Route path='' element={<Index />} />
                <Route path='perfil' element={<Perfil />} />
                <Route path='usuarios' element={<Usuarios />} />
                <Route path='proyectos' element={<Proyectos />} />
                <Route path='crearproyecto' element={<NuevoProyecto />} />
                <Route path='inscripciones' element={<Inscripciones />} />
                <Route path='avances' element={<Avances />} />
              </Route>
            </Routes>
          </BrowserRouter>
       </UserContext.Provider>
    </ApolloProvider>
  );
}

export default App;
