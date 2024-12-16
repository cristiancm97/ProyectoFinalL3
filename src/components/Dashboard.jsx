import React from 'react';
import { Outlet } from 'react-router-dom';
import Navbar from './Navbar';


function Dashboard() {
  return (
    <div className="dashboard">
      <Navbar />
      <main>
        <Outlet />
      </main>
    </div>
  );
}

export default Dashboard;

