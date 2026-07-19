const Employee = require("../models/Employee");

const getDashboardStats = async (req, res) => {
  try {
    const [
      totalEmployees,
      activeEmployees,
      inactiveEmployees,
      departmentCount,
    ] = await Promise.all([
      Employee.countDocuments({ isDeleted: false }),
      Employee.countDocuments({
        status: "Active",
        isDeleted: false,
      }),
      Employee.countDocuments({
        status: "Inactive",
        isDeleted: false,
      }),
      Employee.distinct("department", {
        isDeleted: false,
      }),
    ]);

    res.status(200).json({
      success: true,
      data: {
        totalEmployees,
        activeEmployees,
        inactiveEmployees,
        departmentCount: departmentCount.length,
      },
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

const getDepartmentChart = async (req, res) => {
  try {
    const departments = await Employee.aggregate([
      {
        $match: {
          isDeleted: false,
        },
      },
      {
        $group: {
          _id: "$department",
          employees: {
            $sum: 1,
          },
        },
      },
      {
        $sort: {
          employees: -1,
        },
      },
    ]);

    res.status(200).json({
      success: true,
      data: departments,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

module.exports = {
  getDashboardStats,
  getDepartmentChart,
};