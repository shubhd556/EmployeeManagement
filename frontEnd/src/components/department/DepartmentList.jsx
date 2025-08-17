import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import DataTable from 'react-data-table-component';
import { departmentColumns } from '../../utils/DepartmentHelper.jsx';
import axios from 'axios';

const DepartmentList = () => {
    const [departments, setDepartments] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchDepartments = async () => {
            try {
                const response = await axios.get('http://localhost:5000/api/department', {
                    headers: {
                        "Authorization": `Bearer ${localStorage.getItem('token')}`
                    }
                });


                if (response.data.success) {
                    let sno = 1;
                    const formattedDepartments = response.data.departments.map((dep) => ({
                        _id: dep._id,
                        sno: sno++,
                        dep_name: dep.dep_name,
                        description: dep.description,
                        createdAt: dep.createdAt,
                        actions: (
                            <div className="flex gap-2">
                                <button
                                    className="px-2 py-1 bg-blue-500 text-white rounded hover:bg-blue-600"
                                    onClick={() => handleEdit(dep._id)}
                                >
                                    Edit
                                </button>
                                <button
                                    className="px-2 py-1 bg-red-500 text-white rounded hover:bg-red-600"
                                    onClick={() => handleDelete(dep._id)}
                                >
                                    Delete
                                </button>
                            </div>
                        )
                    }));

                    setDepartments(formattedDepartments);
                } else {
                    setDepartments([]);
                }
            } catch (error) {
                console.error('Error fetching departments:', error);
            } finally {
                setLoading(false);
            }
        };

        fetchDepartments();
    }, []);

    return (
        <div className="max-w-5xl mx-auto p-6 bg-white shadow-md rounded-md">
            <div className="text-center mb-6">
                <h3 className="text-3xl font-bold text-gray-800">Manage Departments</h3>
            </div>

            <div className="flex flex-col sm:flex-row items-center justify-between gap-4 mb-4">
                <input
                    type="text"
                    placeholder="Search by dept name"
                    className="w-full sm:w-2/3 px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
                <Link
                    to="/admin-dashboard/add-department"
                    className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition"
                >
                    Add New Department
                </Link>
            </div>

            <DataTable
                columns={departmentColumns}
                data={departments}
                progressPending={loading}
                pagination
                highlightOnHover
                responsive
                striped
            />
        </div>
    );
};

export default DepartmentList;
