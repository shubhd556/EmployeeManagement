import { useNavigate } from "react-router-dom";
import axios from "axios";

// Columns
export const departmentColumns = [
    {
        name: "S No",
        selector: (row, index) => index + 1,
        sortable: true,
        width: "80px",
    },
    {
        name: "Department Name",
        selector: (row) => row.dep_name,
        sortable: true,
    },
    {
        name: "Description",
        selector: (row) => row.description,
        sortable: false,
        wrap: true,
    },
    {
        name: "Created At",
        selector: (row) => new Date(row.createdAt).toLocaleDateString(),
        sortable: true,
    },
    {
        name: "Actions",
        cell: (row) => <DepartmentButtons id={row._id} />,
        ignoreRowClick: true,
    },
];

// Action Buttons
export const DepartmentButtons = ({ id }) => {
    const navigate = useNavigate();

    const handleEdit = () => {
        navigate(`/admin-dashboard/departments/${id}`); // ✅ correct edit route
    };

    const handleDelete = async () => {
        if (window.confirm("Are you sure you want to delete this department?")) {
          try {
            await axios.delete(`http://localhost:5000/api/department/${id}`, {
              headers: {
                Authorization: `Bearer ${localStorage.getItem("token")}`,
              },
            });
            alert("Department deleted successfully!");
             // ✅ trigger refresh
             window.location.reload();
          } catch (err) {
            console.error("Error deleting department:", err);
            alert("Failed to delete department");
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
