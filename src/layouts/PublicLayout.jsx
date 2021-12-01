import Navbar from 'components/Navbar';
import { Outlet } from 'react-router';
import React from 'react';

const PublicLayout = () => {
  return (
    <div className='flex flex-col justify-between h-screen'>
      <Navbar />
      <div className='h-full overflow-y-scroll '>
      <Outlet />
      </div>
    </div>
  );
};

export default PublicLayout;
