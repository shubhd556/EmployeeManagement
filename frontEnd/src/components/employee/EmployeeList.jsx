import React, { useEffect, useState, useCallback } from "react";
import { Link } from "react-router-dom";
import DataTable from "react-data-table-component";
import axios from "axios";

// ✅ Columns for employees
const employeeColumns = [
  {
    name: "S No",
    selector: (row, index) => index + 1,
    sortable: true,
    width: "80px",
  },
  {
    name: "Name",
    selector: (row) => row.name,
    sortable: true,
  },
  {
    name: "Email",
    selector: (row) => row.email,
    sortable: true,
    wrap: true,
  },
  {
    name: "Department",
    selector: (row) => row.department?.name || "N/A", // Assuming department object
    sortable: true,
  },
  {
    name: "Role",
    selector: (row) => row.role?.name || "N/A", // Assuming role object
    sortable: true,
  },
  {
    name: "Joining Date",
    selector: (row) =>
      row.joiningDate ? new Date(row.joiningDate).toLocaleDateString() : "N/A",
    sortable: true,
  },
  {
    name: "Actions",
    cell: (row) => <EmployeeButtons id={row._id} />,
    ignoreRowClick: true,
    button: true,
  },
];

// ✅ Action buttons
const EmployeeButtons = ({ id }) => {
  const handleEdit = () => {
    window.location.href = `/admin-dashboard/employees/${id}`;
  };

  const handleDelete = async () => {
    if (window.confirm("Are you sure you want to delete this employee?")) {
      try {
        await axios.delete(`http://localhost:5000/api/employee/${id}`, {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        });
        alert("Employee deleted successfully!");
        window.location.reload();
      } catch (err) {
        console.error("Error deleting employee:", err);
        alert("Failed to delete employee");
      }
    }
  };

  return (
    <div className="flex gap-2">
      <button
        className="px-2 py-1 bg-blue-500 text-white rounded hover:bg-blue-600 transition"
        onClick={handleEdit}
      >
        Edit
      </button>
      <button
        className="px-2 py-1 bg-red-500 text-white rounded hover:bg-red-600 transition"
        onClick={handleDelete}
      >
        Delete
      </button>
    </div>
  );
};

const EmployeeList = () => {
  const [employees, setEmployees] = useState([]);
  const [filteredEmployees, setFilteredEmployees] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");

  const [departments, setDepartments] = useState([]);
  const [roles, setRoles] = useState([]);
  const [filterDept, setFilterDept] = useState("");
  const [filterRole, setFilterRole] = useState("");

  // ✅ Fetch employees
  const fetchEmployees = useCallback(async () => {
    setLoading(true);
    try {
      const response = await axios.get("http://localhost:5000/api/employee", {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });

      if (response.data.success) {
        setEmployees(response.data.employees);
        setFilteredEmployees(response.data.employees);
      } else {
        setEmployees([]);
        setFilteredEmployees([]);
      }
    } catch (error) {
      console.error("Error fetching employees:", error);
    } finally {
      setLoading(false);
    }
  }, []);

  // ✅ Fetch departments
  const fetchDepartments = useCallback(async () => {
    try {
      const res = await axios.get("http://localhost:5000/api/department", {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });
      if (res.data.success) {
        setDepartments(res.data.departments);
      }
    } catch (err) {
      console.error("Error fetching departments:", err);
    }
  }, []);

  // ✅ Fetch roles
  const fetchRoles = useCallback(async () => {
    try {
      const res = await axios.get("http://localhost:5000/api/role", {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });
      if (res.data.success) {
        setRoles(res.data.roles);
      }
    } catch (err) {
      console.error("Error fetching roles:", err);
    }
  }, []);

  useEffect(() => {
    fetchEmployees();
    fetchDepartments();
    fetchRoles();
  }, [fetchEmployees, fetchDepartments, fetchRoles]);

  // ✅ Filtering logic
  useEffect(() => {
    let data = employees;

    if (search) {
      data = data.filter((emp) =>
        emp.name.toLowerCase().includes(search.toLowerCase())
      );
    }

    if (filterDept) {
      data = data.filter((emp) => emp.department?._id === filterDept);
    }

    if (filterRole) {
      data = data.filter((emp) => emp.role?._id === filterRole);
    }

    setFilteredEmployees(data);
  }, [search, filterDept, filterRole, employees]);

  return (
    <div className="max-w-6xl mx-auto p-6 bg-white shadow-md rounded-md">
      <div className="text-center mb-6">
        <h3 className="text-3xl font-bold text-gray-800">Manage Employees</h3>
      </div>

      {/* ✅ Filters */}
      <div className="flex flex-col sm:flex-row items-center justify-between gap-4 mb-4">
        <input
          type="text"
          placeholder="Search by name"
          className="w-full sm:w-1/3 px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />

        {/* Department Dropdown */}
        <select
          value={filterDept}
          onChange={(e) => setFilterDept(e.target.value)}
          className="px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
        >
          <option value="">All Departments</option>
          {departments.map((dept) => (
            <option key={dept._id} value={dept._id}>
              {dept.name}
            </option>
          ))}
        </select>

        {/* Role Dropdown */}
        <select
          value={filterRole}
          onChange={(e) => setFilterRole(e.target.value)}
          className="px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
        >
          <option value="">All Roles</option>
          {roles.map((role) => (
            <option key={role._id} value={role._id}>
              {role.name}
            </option>
          ))}
        </select>

        <Link
          to="/admin-dashboard/add-employee"
          className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition"
        >
          Add New Employee
        </Link>
      </div>

      {/* ✅ DataTable */}
      <DataTable
        columns={employeeColumns}
        data={filteredEmployees}
        progressPending={loading}
        pagination
        highlightOnHover
        responsive
        striped
      />
    </div>
  );
};

export default EmployeeList;
