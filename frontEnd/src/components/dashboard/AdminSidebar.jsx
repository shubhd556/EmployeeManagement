import React, { useState } from 'react';
import { NavLink } from 'react-router-dom';
import {
    FaTachometerAlt,
    FaUsers,
    FaBuilding,
    FaCalendarAlt,
    FaMoneyBillWave,
    FaCog,
    FaBars,
    FaTimes,
} from 'react-icons/fa';

const navItems = [
    { name: 'Dashboard', path: '/admin-dashboard', icon: <FaTachometerAlt /> },
    { name: 'Employees', path: '/admin-dashboard/employees', icon: <FaUsers /> },
    { name: 'Departments', path: '/admin-dashboard/departments', icon: <FaBuilding /> },
    { name: 'Leaves', path: '/admin-dashboard/leaves', icon: <FaCalendarAlt /> },
    { name: 'Salary', path: '/admin-dashboard/salary', icon: <FaMoneyBillWave /> },
    { name: 'Settings', path: '/admin-dashboard/settings', icon: <FaCog /> },
];

const AdminSidebar = () => {
    const [isOpen, setIsOpen] = useState(false);

    return (
        <>
            {/* Mobile Header */}
            <div className="md:hidden flex items-center justify-between bg-white shadow px-4 py-3">
                <div className="text-xl font-bold text-blue-600">Admin Panel</div>
                <button onClick={() => setIsOpen(!isOpen)} className="text-blue-600 text-2xl">
                    {isOpen ? <FaTimes /> : <FaBars />}
                </button>
            </div>

            {/* Sidebar */}
            <div
                className={`fixed top-0 left-0 h-screen w-64 bg-white shadow-md z-50 transform transition-transform duration-300 ease-in-out
        ${isOpen ? 'translate-x-0' : '-translate-x-full'} md:translate-x-0 md:static`}
            >
                <div className="p-6 text-2xl font-bold text-blue-600 border-b hidden md:block">
                    Admin Panel
                </div>
                <nav className="mt-6">
                    <ul className="space-y-2 px-4">
                        {navItems.map((item) => (
                            <li key={item.name}>
                                <NavLink
                                    to={item.path}
                                    className={({ isActive }) =>
                                        `flex items-center gap-3 px-4 py-2 rounded-md transition ${isActive
                                            ? 'bg-blue-100 text-blue-600 font-semibold'
                                            : 'text-gray-700 hover:bg-blue-100 hover:text-blue-600'
                                        }`
                                    }
                                    onClick={() => setIsOpen(false)} // Close sidebar on mobile
                                    end={item.path === '/admin-dashboard'} // Ensures exact match for dashboard
                                >
                                    {item.icon}
                                    <span>{item.name}</span>
                                </NavLink>
                            </li>
                        ))}
                    </ul>
                </nav>
            </div>
        </>
    );
};

export default AdminSidebar;
