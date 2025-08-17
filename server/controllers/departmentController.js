import Department from '../models/Department.js';

const getDepartments = async (req, res) => {
    try {
        const departments = await Department.find().sort({ createdAt: -1 }); // optional sorting
        return res.status(200).json({
            success: true,
            message: 'Departments fetched successfully',
            departments
        });
    } catch (error) {
        console.error('Get Departments Error:', error);
        return res.status(500).json({
            success: false,
            error: 'Server error while fetching departments'
        });
    }
};

export { getDepartments };

const addDepartment = async (req, res) => {
    try {
        const { dep_name, description } = req.body;

        // Basic validation
        if (!dep_name || !description) {
            return res.status(400).json({ success: false, error: 'All fields are required' });
        }

        // Create new department
        const newDepartment = new Department({
            dep_name,
            description
        });

        await newDepartment.save();

        return res.status(200).json({
            success: true,
            message: 'Department added successfully',
            data: newDepartment
        });
    } catch (error) {
        console.error('Add Department Error:', error);
        return res.status(500).json({ success: false, error: 'Add department server error' });
    }
};

export { addDepartment };

export const getDepartmentById = async (req, res) => {
    try {
      const department = await Department.findById(req.params.id)
      if (!department) {
        return res.status(404).json({ message: 'Department not found' })
      }
    //   res.json(department)
      return res.status(200).json({
        success: true,
        message: 'Department added successfully',
        department
    });
    } catch (error) {
      res.status(500).json({ message: 'Server error', error: error.message })
    }
  }


  // ✅ Update department
export const updateDepartment = async (req, res) => {
    try {
      const { dep_name, description } = req.body;
  
      // Validate
      if (!dep_name || !description) {
        return res
          .status(400)
          .json({ success: false, error: "All fields are required" });
      }
  
      const department = await Department.findByIdAndUpdate(
        req.params.id,
        { dep_name, description }
      );
  
      if (!department) {
        return res
          .status(404)
          .json({ success: false, message: "Department not found" });
      }
  
      return res.status(200).json({
        success: true,
        message: "Department updated successfully",
        department,
      });
    } catch (error) {
      console.error("Update Department Error:", error);
      return res
        .status(500)
        .json({ success: false, error: "Update department server error" });
    }
  };

  // Delete department
  export const deleteDepartment = async (req, res) => {
    try {
      const department = await Department.findByIdAndDelete(req.params.id);
  
      if (!department) {
        return res.status(404).json({ success: false, message: "Department not found" });
      }
  
      res.json({ success: true, message: "Department deleted successfully" });
    } catch (err) {
      res.status(500).json({ success: false, message: "Server error", error: err.message });
    }
  };
  
  