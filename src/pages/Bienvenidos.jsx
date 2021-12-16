import React from 'react';
import { Link } from 'react-router-dom';

const Bienvenidos = () => {
  return (
    <main className="fondo  flex place-content-center ">
      <div className="container px-10 py-10 ">
        <div className="relative pb-24 ">
          <h2 className="font-extrabold text-5xl pt-16 mb-16">
            EL mejor modelo de sistema de información
            <br></br>
            <span className="text-blue-500"> Soporta </span> 
            La gestión tú proyectos de investigación y
            <span className="text-blue-500"> mejora tus procesos.</span>
          </h2>
          <div className="inline-flex flex-col text-center">
          
          
          <a className="text-3xl py-4 px-8 transition rounded-md font-semibold mb-1 text-white bg-blue-500 ring-transparent focus:outline-none hover:bg-blue-600">
           
            <Link to='/auth/registro'>  ¡Registrate!</Link>
          </a>
          </div>
        
        </div>
      </div>
    </main>
  );    
};

export default Bienvenidos;