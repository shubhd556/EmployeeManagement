import React, { useEffect, useState } from 'react';
import { useAuth } from '../context/authContext.jsx';
import { Outlet, useNavigate } from 'react-router-dom';
import AdminSidebar from '../components/dashboard/AdminSidebar.jsx';
import NavBar from '../components/dashboard/NavBar.jsx';
import AdminSummary from '../components/dashboard/AdminSummary.jsx';

const AdminDashboard = () => {
  const { user, loading } = useAuth();
  const navigate = useNavigate();
  const [sidebarOpen, setSidebarOpen] = useState(false);

  useEffect(() => {
    if (!loading && !user) {
      navigate('/login');
    }
  }, [loading, user, navigate]);

  if (loading) {
    return (
      <div className="flex items-center justify-center h-screen text-xl">
        Loading...
      </div>
    );
  }

  return (
    <div className="flex h-screen bg-gray-100 overflow-hidden">
      {/* Sidebar for desktop */}
      <div className="hidden md:block">
        <AdminSidebar />
      </div>

      {/* Sidebar for mobile */}
      <div
        className={`fixed inset-0 z-40 bg-black bg-opacity-50 transition-opacity md:hidden ${sidebarOpen ? 'block' : 'hidden'
          }`}
        onClick={() => setSidebarOpen(false)}
      >
        <div
          className="absolute left-0 top-0 h-full w-64 bg-white shadow-lg"
          onClick={(e) => e.stopPropagation()}
        >
          <AdminSidebar />
        </div>
      </div>

      {/* Main Content */}
      <div className="flex flex-col flex-1 w-full">
        <NavBar onMenuClick={() => setSidebarOpen(true)} />

        <main className="p-4 md:p-8 overflow-y-auto">
          <header className="mb-6">
            <h1 className="text-2xl md:text-3xl font-semibold text-gray-800">
              Welcome, {user?.name}
            </h1>
          </header>
          <Outlet/>
        </main>
      </div>
    </div>
  );
};

export default AdminDashboard;
