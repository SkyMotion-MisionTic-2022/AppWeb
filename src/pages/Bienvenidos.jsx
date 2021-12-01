import React from 'react';
import 'styles/carrusel.css';

const Bienvenidos = () => {
  return (
    <div className="flex ">
      <div className="flex-1   h-screen">
        <div className="flex-col items-center justify-center border-2 border-red-300 m-16">
          <p className="text-center">
          modelo de sistema de información que soporte la gestión de proyectos de investigación y mejore los procesos. 
          </p>
          <button tabindex="-1" className="mtl-16 hover:bg-indigo-700 focus:outline-none w-32 py-2 rounded-md font-semibold text-white bg-indigo-500 ring-4 ring-indigo-300">
             Registrate
            </button>
        </div>
      </div>
      <div className="flex-1 " id="conterItems">
        <div className="itemCarrusel " id="itemCarrusel-1">
          <div className="tarjetaCarrusel" id="tarjetaCarrusel-1">
            <img src="https://previews.123rf.com/images/andreypopov/andreypopov1404/andreypopov140400900/27394008-retrato-de-los-estudiantes-universitarios-multi%C3%A9tnicas-conf%C3%ADa-en-pie-en-una-cola-contra-el-fondo-bla.jpg"></img>
          </div>
          <div className="flechasCarrusel">
            <a href="#itemCarrusel-3">
              <i class="fas fa-chevron-left"></i>
            </a>
            <a href="#itemCarrusel-2">
              <i class="fas fa-chevron-right"></i>
            </a>
          </div>
        </div>
        <div className="itemCarrusel" id="itemCarrusel-2">
          <div className="tarjetaCarrusel" id="tarjetaCarrusel-2">
            <img src="https://previews.123rf.com/images/stockbroker/stockbroker1408/stockbroker140802807/31054284-los-estudiantes-universitarios-que-usa-la-tableta-digital-y-la-computadora-port%C3%A1til-en-clase.jpg"></img>
          </div>
          <div className="flechasCarrusel">
            <a href="#itemCarrusel-1">
              <i class="fas fa-chevron-left"></i>
            </a>
            <a href="#itemCarrusel-3">
              <i class="fas fa-chevron-right"></i>
            </a>
          </div>
        </div>
        <div className="itemCarrusel" id="itemCarrusel-3">
          <div className="tarjetaCarrusel" id="tarjetaCarrusel-3">
            <img src="https://media.gettyimages.com/photos/japanese-students-meeting-outdoors-picture-id1149980182?s=612x612"></img>
          </div>
          <div className="flechasCarrusel">
            <a href="#itemCarrusel-2">
              <i className="fas fa-chevron-left "></i>
            </a>
            <a href="#itemCarrusel-1">
              <i className="fas fa-chevron-right "></i>
            </a>
          </div>
        </div>
        <div className="flex-col" id="conterPuntos">
          <a href="#itemCarrusel-1">°</a>
          <a href="#itemCarrusel-2">°</a>
          <a href="#itemCarrusel-3">°</a>
        </div>
      </div>
    </div>
  );    
};

export default Bienvenidos;