import React, { useState } from 'react';
import PrivateLayout from 'layouts/PrivateLayout';
import PublicLayout from 'layouts/PublicLayout';
import LayoutAutenticacion from 'layouts/LayoutAutenticacion'
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { UserContext } from 'context/userContext';
import Index from 'pages/Index';
import Usuarios from 'pages/usuarios/Usuarios';
import Proyectos from 'pages/proyectos/Proyectos';
import Inscripciones from 'pages/Inscripciones';
import Bienvenidos from 'pages/Bienvenidos'
import Avances from 'pages/Avances';
import Perfil from 'pages/Perfil';
import Login from 'pages/autenticacion/login';
import 'styles/globals.css';
import 'styles/tabla.css';
import { ApolloProvider, ApolloClient, InMemoryCache, createHttpLink } from '@apollo/client';
import NuevoProyecto from 'pages/proyectos/NuevoProyecto';
import NuevoUsuario from 'pages/usuarios/NuevoUsuario';
import EditarUsuario from 'pages/usuarios/EditarUsuario';
import { AuthContext } from 'context/authContext';
import { setContext } from '@apollo/client/link/context';

// import PrivateRoute from 'components/PrivateRoute';
const httpLink = createHttpLink({
  uri: 'http://localhost:4000/graphql',
});

const authLink = setContext((_, { headers }) => {
  // get the authentication token from local storage if it exists
  const token = JSON.parse(localStorage.getItem('token'));
  // return the headers to the context so httpLink can read them
  return {
    headers: {
      ...headers,
      authorization: token ? `Bearer ${token}` : '',
    },
  };
});

const client = new ApolloClient({
  cache: new InMemoryCache(),
  link: authLink.concat(httpLink),
});


function App() {
  const [userData, setUserData] = useState({});
  const [authToken, setAuthToken] = useState('');
  const [loadingAuth, setLoadingAuth] = useState(true);

  const setToken = (data) => {
    setAuthToken(data);
    console.log('dt token', data);
    if (data) {
      localStorage.setItem('token', JSON.stringify(data));
    } else {
      localStorage.removeItem('token');
    }
    setLoadingAuth(false);
  };




  return (
    <ApolloProvider client={client}>
      <AuthContext.Provider value={{ authToken, setToken, loadingAuth }}>
        <UserContext.Provider value={{ userData, setUserData }}>
          <BrowserRouter>
            <Routes>
              <Route path='/auth' element={<PublicLayout />}>
                <Route path='login' element={<Login />} />
                <Route path='bienvenidos' element={<Bienvenidos />} />
              </Route>
              <Route path='/' element={<PrivateLayout />}>
                <Route path='' element={<Index />} />
                <Route path='perfil' element={<Perfil />} />
                <Route path='usuarios' element={<Usuarios />} />
                <Route path='crearusuario' element={<NuevoUsuario />} />
                <Route path='/usuarios/editar/:_id' element={<EditarUsuario />} />
                <Route path='proyectos' element={<Proyectos />} />
                <Route path='crearproyecto' element={<NuevoProyecto />} />
                <Route path='inscripciones' element={<Inscripciones />} />
                <Route path='avances' element={<Avances />} />
              </Route>
            </Routes>
          </BrowserRouter>
        </UserContext.Provider>
      </AuthContext.Provider>
    </ApolloProvider>
  );
}

export default App;
