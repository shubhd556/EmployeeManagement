import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";

const EditDepartment = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [department, setDepartment] = useState({ dep_name: "", description: "" });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchDepartment = async () => {
      try {
        const res = await axios.get(`/api/department/${id}`);
        // ✅ ensure fallback values so dep_name / description never become undefined
        setDepartment({
          dep_name: res.data.department?.dep_name || "",
          description: res.data.department?.description || "",
        });
        console.log(res.data.department)
      } catch (err) {
        console.error("Error fetching department:", err);
      } finally {
        setLoading(false);
      }
    };

    if (id) fetchDepartment();
  }, [id]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.put(
        `http://localhost:5000/api/department/${id}`,
        { 
          dep_name: department.dep_name, 
          description: department.description 
        },
        { headers: { Authorization: `Bearer ${localStorage.getItem("token")}` } }
      );
  
      alert("Department updated successfully");
      navigate("/admin-dashboard/departments");
    } catch (error) {
      console.error("Error updating department:", error);
    }
  };
  
  

  if (loading) return <p>Loading department...</p>;

  return (
      <div className="max-w-xl mx-auto mt-10 p-6 bg-white shadow-lg rounded-lg">
            <h2 className="text-2xl font-bold text-gray-800 mb-6 text-center">Edit Department</h2>

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
                        onChange={(e) =>
                            setDepartment({ ...department, dep_name: e.target.value })
                          }
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
                        onChange={(e) =>
                            setDepartment({ ...department, description: e.target.value })
                          }
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
                         Save Changes
                    </button>
                </div>
            </form>
    </div>
  );
};

export default EditDepartment;
