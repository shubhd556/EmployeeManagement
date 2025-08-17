import express from 'express';
import authMiddleware from '../middleware/authMiddleWare.js';
import { 
  addDepartment,
  getDepartments,
  getDepartmentById,
  updateDepartment,
  deleteDepartment   // ✅ import delete controller
} from '../controllers/departmentController.js';

const router = express.Router();

// Get all departments
router.get('/', authMiddleware, getDepartments);

// Get single department by ID
router.get('/:id', authMiddleware, getDepartmentById);

// Add new department
router.post('/add', authMiddleware, addDepartment);

// Update Department
router.put('/:id', authMiddleware, updateDepartment);

// Delete Department ✅
router.delete('/:id', authMiddleware, deleteDepartment);

export default router;
