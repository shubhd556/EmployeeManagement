export const departmentColumns = [
    {
        name: "S No",
        selector: (row, index) => index + 1,
        sortable: true,
        width: "80px"
    },
    {
        name: "Department Name",
        selector: (row) => row.dep_name,
        sortable: true
    },
    {
        name: "Description",
        selector: (row) => row.description,
        sortable: false,
        wrap: true
    },
    {
        name: "Created At",
        selector: (row) => new Date(row.createdAt).toLocaleDateString(),
        sortable: true
    },
    {
        name: "Actions",
        selector:(row)=>row.actions,
        // cell: (row) => (
        //     <div className="flex gap-2">
        //         <button className="px-2 py-1 bg-blue-500 text-white rounded">Edit</button>
        //         <button className="px-2 py-1 bg-red-500 text-white rounded">Delete</button>
        //     </div>
        // ),
        ignoreRowClick: true,
        allowOverflow: true,
        button: true
    }
];



export const DepartmentButtons = ({ id, onEdit, onDelete }) => {


    const navigate = useNavigate();

    const handleEdit = () => {
        navigate(`/admin-dashboard/department/${id}`);
    };

    const handleDelete = () => {
        navigate(`/admin-dashboard/department/${id}`);
    };

    return (
        <div className="flex gap-2">
            <button
                className="px-2 py-1 bg-blue-500 text-white rounded hover:bg-blue-600"
                onClick={() => onEdit(id)}
            >
                Edit
            </button>
            <button
                className="px-2 py-1 bg-red-500 text-white rounded hover:bg-red-600"
                onClick={() => onDelete(id)}
            >
                Delete
            </button>
        </div>
    );
};
