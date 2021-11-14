import React, { useState } from 'react';
import { NavLink } from 'react-router-dom';

const SidebarLinks = () => {
  return (
    <ul className='mt-12'>
      <SidebarRoute to='' title='Inicio' icon='fas fa-home' />
      <SidebarRoute to='/usuarios' title='Gestión de Usuarios' icon='fas fa-user-circle' />
      <SidebarRoute to='/proyectos' title='Gestión de Proyectos' icon='fas fa-clipboard-list' />
      <SidebarRoute to='/inscripciones' title='Gestión de Inscripciones' icon='fas fa-user-check' />
      <SidebarRoute to='/avances' title='Gestión de Avances' icon='fas fa-rocket' />
    </ul>
  );
};

const Logo = () => {
  return (
    <div className='py-3 w-full flex flex-col items-center justify-center'>
      <img src='logo_cc.png' alt='Logo' className='h-16' />
      <span className='my-2 text-m font-bold text-center'>
        <span>Skymotion</span><br />
        <span>Project Management System</span>
        </span>
    </div>
  );
};

const Sidebar = () => {
  const [open, setOpen] = useState(true);
  return (
    <div className='flex flex-col md:flex-row flex-no-wrap md:h-full'>
      {/* Sidebar starts */}

      <div className='sidebar hidden md:flex'>
        <div className='px-8'>
          <Logo />
          <SidebarLinks />
        </div>
      </div>
      <div className='flex md:hidden w-full justify-between bg-gray-800 p-2 text-white'>
        <i className={`fas fa-${open ? 'times' : 'bars'}`} onClick={() => setOpen(!open)} />
        <i className='fas fa-home' />
      </div>
      {open && <ResponsiveSidebar />}
      {/* Sidebar ends */}
    </div>
  );
};

const ResponsiveSidebar = () => {
  return (
    <div>
      <div
        className='sidebar h-full z-40 absolute md:h-full sm:hidden transition duration-150 ease-in-out'
        id='mobile-nav'
      >
        <div className='px-8'>
          <Logo />
          <SidebarLinks />
        </div>
      </div>
    </div>
  );
};

const SidebarRoute = ({ to, title, icon }) => {
  return (
    <li>
      <NavLink
        to={to}
        className={({ isActive }) =>
          isActive
            ? 'sidebar-route text-white bg-indigo-700'
            : 'sidebar-route text-gray-900 hover:text-white hover:bg-indigo-400'
        }
      >
        <div className='flex items-center'>
          <i className={icon} />
          <span className='text-sm  ml-2'>{title}</span>
        </div>
      </NavLink>
    </li>
  );
};

export default Sidebar;
