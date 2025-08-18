import './index.css'
import Login from './pages/Login.jsx';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import AdminDashBoard from './pages/AdminDashBoard.jsx';
import EmployeeDashboard from './pages/EmployeeDashboard.jsx';
import PrivateRoutes from './utils/PrivateRoutes.jsx';
import RoleBasedRoutes from './utils/RoleBasedRoutes.jsx';
import AdminSummary from './components/dashboard/AdminSummary.jsx';
import DepartmentList from './components/department/DepartmentList.jsx';
import AddDepartment from './components/department/AddDepartment.jsx';
import EditDepartment from './components/department/EditDepartment.jsx';
import EmployeeList from './components/employee/EmployeeList.jsx';
import AddEmployee from './components/employee/AddEmployee.jsx';
function App() {


  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Navigate to="/admin-dashboard" />}></Route>
        <Route path="/login" element={<Login />}></Route>
        <Route path="/admin-dashboard" element={
          <PrivateRoutes>
            <RoleBasedRoutes requiredRole={["admin"]}>
              <AdminDashBoard />
            </RoleBasedRoutes>
          </PrivateRoutes>
        }>
          <Route index element = {<AdminSummary/>}></Route>
          <Route path ="/admin-dashboard/departments" element = {<DepartmentList/>}></Route>
          <Route path ="/admin-dashboard/add-department" element = {<AddDepartment/>}></Route>
          <Route path ="/admin-dashboard/departments/:id" element = {<EditDepartment/>}></Route>
          <Route path ="/admin-dashboard/employees" element = {<EmployeeList/>}></Route>
          <Route path ="/admin-dashboard/add-employee" element = {<AddEmployee/>}></Route>


        </Route>
        <Route path="/employee-dashboard" element={<EmployeeDashboard />}></Route>
      </Routes>
    </BrowserRouter>
  )
}

export default App
