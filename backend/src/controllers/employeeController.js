const Employee = require("../models/Employee");
const validateEmployee = require("../validations/employeeValidation");

/**
 * Create Employee
 */
const createEmployee = async (req, res) => {
  try {
    const errors = validateEmployee(req.body);

    if (
  req.user.role === "HR Manager" &&
  req.body.role === "Super Admin"
) {
  return res.status(403).json({
    success: false,
    message: "HR Manager cannot create Super Admin.",
  });
}

    if (errors.length) {
      return res.status(400).json({
        success: false,
        errors,
      });
    }

    const existingEmail = await Employee.findOne({
      email: req.body.email,
      isDeleted: false,
    });

    if (existingEmail) {
      return res.status(400).json({
        success: false,
        message: "Email already exists",
      });
    }

    const existingPhone = await Employee.findOne({
      phone: req.body.phone,
      isDeleted: false,
    });

    if (existingPhone) {
      return res.status(400).json({
        success: false,
        message: "Phone already exists",
      });
    }

    const employee = await Employee.create({
      ...req.body,
      profileImage: req.file
        ? `/uploads/${req.file.filename}`
        : "",
    });

    res.status(201).json({
      success: true,
      message: "Employee created successfully",
      employee,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

/**
 * Get All Employees
 */

const getEmployees = async (req, res) => {
  try {
    const {
      page = 1,
      limit = 10,
      search = "",
      department,
      role,
      status,
      sortBy = "createdAt",
      order = "desc",
    } = req.query;

    const query = {
      isDeleted: false,
    };

    if (search) {
      query.$or = [
        {
          name: {
            $regex: search,
            $options: "i",
          },
        },
        {
          email: {
            $regex: search,
            $options: "i",
          },
        },
      ];
    }

    if (department) query.department = department;

    if (role) query.role = role;

    if (status) query.status = status;

    const employees = await Employee.find(query)
      .populate("manager", "name employeeId")
      .sort({
        [sortBy]: order === "asc" ? 1 : -1,
      })
      .skip((page - 1) * limit)
      .limit(Number(limit));

    const total = await Employee.countDocuments(query);

    res.status(200).json({
      success: true,
      total,
      page: Number(page),
      totalPages: Math.ceil(total / limit),
      employees,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

/**
 * Get Single Employee
 */

const getEmployeeById = async (req, res) => {
  try {
    const employee = await Employee.findById(req.params.id)
      .populate("manager", "name employeeId");

    if (!employee || employee.isDeleted) {
      return res.status(404).json({
        success: false,
        message: "Employee not found",
      });
    }

    res.status(200).json({
      success: true,
      employee,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

/**
 * Update Employee
 */

const updateEmployee = async (req, res) => {
  try {
    const employee = await Employee.findById(req.params.id);

    if (
  req.user.role === "HR Manager" &&
  employee.role === "Super Admin"
) {
  return res.status(403).json({
    success: false,
    message: "HR Manager cannot update Super Admin.",
  });
}

    if (!employee || employee.isDeleted) {
      return res.status(404).json({
        success: false,
        message: "Employee not found",
      });
    }

    Object.assign(employee, req.body);

    if (req.file) {
      employee.profileImage = `/uploads/${req.file.filename}`;
    }

    await employee.save();

    res.status(200).json({
      success: true,
      message: "Employee updated successfully",
      employee,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

/**
 * Soft Delete Employee
 */

const deleteEmployee = async (req, res) => {
  try {
    const employee = await Employee.findById(req.params.id);

    if (!employee || employee.isDeleted) {
      return res.status(404).json({
        success: false,
        message: "Employee not found",
      });
    }

    employee.isDeleted = true;

    await employee.save();

    res.status(200).json({
      success: true,
      message: "Employee deleted successfully",
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};


const getMyProfile = async (req, res) => {
  res.status(200).json({
    success: true,
    employee: req.user,
  });
};

const updateMyProfile = async (req, res) => {
  try {
    const employee = await Employee.findById(req.user._id);

    employee.name = req.body.name || employee.name;
    employee.phone = req.body.phone || employee.phone;

    if (req.file) {
      employee.profileImage = `/uploads/${req.file.filename}`;
    }

    await employee.save();

    res.status(200).json({
      success: true,
      message: "Profile updated successfully.",
      employee,
    });

  } catch (error) {

    res.status(500).json({
      success: false,
      message: error.message,
    });

  }
};

/**
 * Assign Reporting Manager
 */

/**
 * Assign Reporting Manager
 */

const assignManager = async (req, res) => {
  try {
    const { managerId } = req.body;

    const employee = await Employee.findById(req.params.id);

    if (!employee || employee.isDeleted) {
      return res.status(404).json({
        success: false,
        message: "Employee not found.",
      });
    }

    // Remove manager
    if (!managerId) {
      employee.manager = null;

      await employee.save();

      return res.status(200).json({
        success: true,
        message: "Reporting manager removed successfully.",
        employee,
      });
    }

    // Self Reporting
    if (employee._id.toString() === managerId) {
      return res.status(400).json({
        success: false,
        message: "Employee cannot report to themselves.",
      });
    }

    const manager = await Employee.findById(managerId);

    if (!manager || manager.isDeleted) {
      return res.status(404).json({
        success: false,
        message: "Manager not found.",
      });
    }

    // Optional Business Rule
    if (employee.role === "Super Admin") {
      return res.status(400).json({
        success: false,
        message: "Super Admin cannot have a reporting manager.",
      });
    }

    /**
     * Circular Reporting Validation
     */

    let currentManager = manager;

    while (currentManager) {
      if (
        currentManager._id.toString() ===
        employee._id.toString()
      ) {
        return res.status(400).json({
          success: false,
          message:
            "Circular reporting detected. Manager assignment is not allowed.",
        });
      }

      if (!currentManager.manager) break;

      currentManager = await Employee.findById(
        currentManager.manager
      );
    }

    employee.manager = managerId;

    await employee.save();

    res.status(200).json({
      success: true,
      message: "Manager assigned successfully.",
      employee,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};


/**
 * Get Direct Reportees
 */

const getReportees = async (req, res) => {

  try {

    const reportees = await Employee.find({
      manager: req.params.id,
      isDeleted: false,
    });

    res.status(200).json({
      success: true,
      count: reportees.length,
      reportees,
    });

  } catch (error) {

    res.status(500).json({
      success: false,
      message: error.message,
    });

  }

};




module.exports = {
  createEmployee,
  getEmployees,
  getEmployeeById,
  updateEmployee,
  deleteEmployee,
  assignManager,
  getReportees,
  getMyProfile,
updateMyProfile,
};