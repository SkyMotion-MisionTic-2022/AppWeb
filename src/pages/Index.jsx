import React from 'react';
import { useUser } from 'context/userContext';

const Index = () => {
  const { userData } = useUser();

  return (
    <div className="place-content-center mx-20">
      <div>
        <h2 className="flex justify-center p-4 font-bold text-2xl m-8 text-blue-600">
          Bienvenido a la APP de Gestión de Proyectos
        </h2>
      </div>
      <div className="flex justify-center p-2 mx-32 my-4 border-2  border-gray-400 bg-gray-200">
        {userData.estado === 'AUTORIZADO' ? (
          <p>
            Comienza a navegar en nuestra plaforma navegando por el menu lateral{" "}
          </p>
        ) : (
          <p>
            Espera la aprobación de tu registro en la plataforma para continuar con la navegación{" "}
          </p>
        )
        }
      </div>
      <div className="flex justify-center p-2 mx-32 my-4 border-2  border-gray-400 bg-gray-200">
        <p>
          Controla los avances y registra los procesos de tú preyecto{" "}
        </p>
      </div>
      <div className="flex justify-center p-2 mx-32 my-4 border-2  border-gray-400 bg-gray-200">
        <p>
          Haz que el trabajo con tú equipo sea el mejor{" "}
        </p>
      </div>
    </div>
  );
};

export default Index;
