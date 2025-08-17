import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const AddDepartment = () => {
    const [department, setDepartment] = useState({
        dep_name: '',
        description: ''
    });

    const navigate = useNavigate();

    const handleChange = (e) => {
        const { name, value } = e.target;
        setDepartment((prev) => ({
            ...prev,
            [name]: value
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post(
                'http://localhost:5000/api/department/add',
                department,
                {
                    headers: {
                        "Authorization": `Bearer ${localStorage.getItem('token')}`
                    }
                }
            );

            if (response.data.success) {
                navigate('/admin-dashboard/departments');
            } else {
                alert(response.data.error || 'Failed to add department');
            }
        } catch (error) {
            console.error('Submit Error:', error);
            alert(
                error.response?.data?.error || 'Something went wrong. Please try again.'
            );
        }
    };

    return (
        <div className="max-w-xl mx-auto mt-10 p-6 bg-white shadow-lg rounded-lg">
            <h2 className="text-2xl font-bold text-gray-800 mb-6 text-center">Add Department</h2>

            <form onSubmit={handleSubmit} className="space-y-6">
                {/* Department Name */}
                <div>
                    <label htmlFor="dep_name" className="block text-sm font-medium text-gray-700 mb-1">
                        Department Name
                    </label>
                    <input
                        type="text"
                        id="dep_name"
                        name="dep_name"
                        value={department.dep_name}
                        onChange={handleChange}
                        placeholder="Enter department name"
                        className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                        required
                    />
                </div>

                {/* Description */}
                <div>
                    <label htmlFor="description" className="block text-sm font-medium text-gray-700 mb-1">
                        Description
                    </label>
                    <textarea
                        id="description"
                        name="description"
                        value={department.description}
                        onChange={handleChange}
                        rows="4"
                        placeholder="Enter department description"
                        className="w-full px-4 py-2 border border-gray-300 rounded-md resize-none focus:outline-none focus:ring-2 focus:ring-blue-500"
                        required
                    ></textarea>
                </div>

                {/* Buttons */}
                <div className="flex justify-between items-center">
                    <button
                        type="button"
                        onClick={() => navigate('/admin-dashboard/departments')}
                        className="px-4 py-2 bg-gray-300 text-gray-800 rounded-md hover:bg-gray-400 transition"
                    >
                        Back
                    </button>
                    <button
                        type="submit"
                        className="px-6 py-2 bg-blue-600 text-white font-semibold rounded-md hover:bg-blue-700 transition"
                    >
                        Add Department
                    </button>
                </div>
            </form>
        </div>
    );
};

export default AddDepartment;
