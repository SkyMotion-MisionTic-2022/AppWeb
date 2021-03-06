
import React from 'react'
import { Link } from 'react-router-dom';

const Navbar = () => {
  return (
    <nav className="bg-blue-400">
      <ul className="flex w-full justify-between my-3">
        <li>
          <Link to="/auth/bienvenidos">
            <i className="fab fa-app-store p-1"></i>
          </Link>
        </li>
        <li className="px-3 ">
          <button className="bg-blue-100 rounded-full border-2 border-blue-100 hover:border-blue-300  p-2">
            <Link to="/auth/login"> Iniciar Sesión</Link>
          </button>
        </li>
      </ul>
    </nav>
  );
};

export default Navbar;
