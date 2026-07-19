const Employee = require("../models/Employee");

const buildTree = (employees, manager = null) => {

  return employees
    .filter(emp => {

      if (manager === null) {

        return emp.manager == null;

      }

      return emp.manager &&
             emp.manager.toString() === manager.toString();

    })

    .map(emp => ({

      _id: emp._id,
      employeeId: emp.employeeId,
      name: emp.name,
      designation: emp.designation,
      department: emp.department,
      role: emp.role,

      children: buildTree(employees, emp._id),

    }));

};

const getOrganizationTree = async (req, res) => {

  try {

    const employees = await Employee.find({
      isDeleted: false,
    });

    const tree = buildTree(employees);

    res.status(200).json({

      success: true,
      tree,

    });

  } catch (error) {

    res.status(500).json({

      success: false,
      message: error.message,

    });

  }

};

module.exports = {
  getOrganizationTree,
};