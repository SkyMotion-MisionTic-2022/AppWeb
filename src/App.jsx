import React, { useEffect, useState } from 'react';
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
import Perfil from 'pages/perfil/Perfil';
import Login from 'pages/autenticacion/login';
import jwt_decode from 'jwt-decode';
import 'styles/globals.css';
import 'styles/tabla.css';
import { ApolloProvider, ApolloClient, InMemoryCache, createHttpLink } from '@apollo/client';
import NuevoProyecto from 'pages/proyectos/NuevoProyecto';
import NuevoUsuario from 'pages/usuarios/NuevoUsuario';
import { AuthContext } from 'context/authContext';
import { setContext } from '@apollo/client/link/context';

// import PrivateRoute from 'components/PrivateRoute';
const httpLink = createHttpLink({
  uri: 'http://localhost:4000/graphql',
});

const authLink = setContext((_, { headers }) => {
  const token = JSON.parse(localStorage.getItem('token'));

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
  // const [loadingAuth, setLoadingAuth] = useState(true);

  const setToken = (token) => {
    console.log('set token', token);
    setAuthToken(token);
    if (token) {
      localStorage.setItem('token', JSON.stringify(token));
    } else {
      localStorage.removeItem('token');
    }
    // setLoadingAuth(false);
  };

  useEffect(() => {
    if (authToken) {
      const decoded = jwt_decode(authToken);
      setUserData({
        _id: decoded._id,
        nombre: decoded.nombre,
        apellido: decoded.apellido,
        identificacion: decoded.identificacion,
        correo: decoded.correo,
        password: decoded.password,
        rol: decoded.rol,
      });
    }
    console.log('datos de usuario:', userData)
  }, [authToken]);


  return (
    <ApolloProvider client={client}>
      <AuthContext.Provider value={{ authToken, setAuthToken, setToken }}>
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
