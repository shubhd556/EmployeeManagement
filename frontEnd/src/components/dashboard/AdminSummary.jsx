import React from 'react';

const AdminSummary = () => {
    return (
        <div className="space-y-8">
            {/* Overview Section */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="bg-white p-6 rounded-lg shadow hover:shadow-lg transition">
                    <h2 className="text-lg font-semibold text-gray-700">Employee Count</h2>
                    <p className="text-3xl font-bold text-blue-600 mt-2">120</p>
                </div>
                <div className="bg-white p-6 rounded-lg shadow hover:shadow-lg transition">
                    <h2 className="text-lg font-semibold text-gray-700">Total Departments</h2>
                    <p className="text-3xl font-bold text-green-600 mt-2">8</p>
                </div>
                <div className="bg-white p-6 rounded-lg shadow hover:shadow-lg transition">
                    <h2 className="text-lg font-semibold text-gray-700">Monthly Pay</h2>
                    <p className="text-3xl font-bold text-purple-600 mt-2">₹12,50,000</p>
                </div>
            </div>

            {/* Leave Details Section */}
            <h2 className="text-3xl font-bold text-center text-gray-800 mb-6">
                    Leave Details
                </h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                
                <div className="bg-white p-6 rounded-lg shadow hover:shadow-lg transition">
                    <h2 className="text-lg font-semibold text-gray-700">Leaves Applied</h2>
                    <p className="text-3xl font-bold text-yellow-600 mt-2">45</p>
                </div>
                <div className="bg-white p-6 rounded-lg shadow hover:shadow-lg transition">
                    <h2 className="text-lg font-semibold text-gray-700">Leaves Approved</h2>
                    <p className="text-3xl font-bold text-green-600 mt-2">36</p>
                </div>
                <div className="bg-white p-6 rounded-lg shadow hover:shadow-lg transition">
                    <h2 className="text-lg font-semibold text-gray-700">Leaves Pending</h2>
                    <p className="text-3xl font-bold text-red-600 mt-2">7</p>
                </div>
                <div className="bg-white p-6 rounded-lg shadow hover:shadow-lg transition">
                    <h2 className="text-lg font-semibold text-gray-700">Leaves Rejected</h2>
                    <p className="text-3xl font-bold text-violet-600 mt-2">2</p>
                </div>
            </div>
        </div>
    );
};

export default AdminSummary;
