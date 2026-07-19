const Employee = require("../models/Employee");

const seedSuperAdmin = async () => {
  try {
    const existingAdmin = await Employee.findOne({
      role: "Super Admin",
    });

    if (existingAdmin) {
      console.log("✅ Super Admin already exists");
      return;
    }

    await Employee.create({
      name: "Super Admin",
      email: "admin@example.com",
      phone: "9999999999",
      password: "Admin@123",
      department: "Administration",
      designation: "Super Admin",
      salary: 100000,
      joiningDate: new Date(),
      status: "Active",
      role: "Super Admin",
    });

    console.log("✅ Default Super Admin created");
    console.log("Email    : admin@example.com");
    console.log("Password : Admin@123");
  } catch (error) {
    console.error("❌ Error creating Super Admin:", error.message);
  }
};

module.exports = seedSuperAdmin;