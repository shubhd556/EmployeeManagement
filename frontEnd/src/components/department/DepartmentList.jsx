import React, { useEffect, useState, useCallback } from 'react';
import { Link } from 'react-router-dom';
import DataTable from 'react-data-table-component';
import { departmentColumns, DepartmentButtons } from '../../utils/DepartmentHelper.jsx';
import axios from 'axios';

const DepartmentList = () => {
    const [departments, setDepartments] = useState([]);
    const [loading, setLoading] = useState(true);
    const [search, setSearch] = useState("");   // ✅ search state
    const [filteredDepartments, setFilteredDepartments] = useState([]);

    // ✅ fetchDepartments wrapped in useCallback so it can be reused
    const fetchDepartments = useCallback(async () => {
        setLoading(true);
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
                        <DepartmentButtons
                            id={dep._id}
                            onDelete={fetchDepartments}   // ✅ refresh after delete
                        />
                    )
                }));
                setDepartments(formattedDepartments);
                setFilteredDepartments(formattedDepartments);  // ✅ init filtered
            } else {
                setDepartments([]);
                setFilteredDepartments([]);
            }
        } catch (error) {
            console.error('Error fetching departments:', error);
        } finally {
            setLoading(false);
        }
    }, []);

    useEffect(() => {
        fetchDepartments();
    }, [fetchDepartments]);

    // ✅ filter departments when search changes
    useEffect(() => {
        const result = departments.filter(dep =>
            dep.dep_name.toLowerCase().includes(search.toLowerCase()) ||
            dep.description.toLowerCase().includes(search.toLowerCase())
        );
        setFilteredDepartments(result);
    }, [search, departments]);

    return (
        <div className="max-w-5xl mx-auto p-6 bg-white shadow-md rounded-md">
            <div className="text-center mb-6">
                <h3 className="text-3xl font-bold text-gray-800">Manage Departments</h3>
            </div>

            <div className="flex flex-col sm:flex-row items-center justify-between gap-4 mb-4">
                <input
                    type="text"
                    placeholder="Search by dept name or description"
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}   // ✅ live search
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
                data={filteredDepartments}   // ✅ filtered data instead of all
                progressPending={loading}
                pagination
                highlightOnHover
                responsive
                striped
                persistTableHead   // ✅ keeps search bar stable on pagination
            />
        </div>
    );
};

export default DepartmentList;
