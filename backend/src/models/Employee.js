const mongoose = require("mongoose");
const bcrypt = require("bcrypt");

const employeeSchema = new mongoose.Schema(
  {
    employeeId: {
      type: String,
      unique: true,
    },

    name: {
      type: String,
      required: [true, "Name is required"],
      trim: true,
    },

    email: {
      type: String,
      required: [true, "Email is required"],
      unique: true,
      lowercase: true,
      trim: true,
    },

    phone: {
      type: String,
      required: [true, "Phone number is required"],
      unique: true,
      trim: true,
    },

    password: {
      type: String,
      required: [true, "Password is required"],
      minlength: 6,
      select: false,
    },

    department: {
      type: String,
      required: true,
    },

    designation: {
      type: String,
      required: true,
    },

    salary: {
      type: Number,
      required: true,
      min: 0,
    },

    joiningDate: {
      type: Date,
      required: true,
      default: Date.now,
    },

    status: {
      type: String,
      enum: ["Active", "Inactive"],
      default: "Active",
    },

    role: {
      type: String,
      enum: ["Super Admin", "HR Manager", "Employee"],
      default: "Employee",
    },

    manager: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Employee",
      default: null,
    },

    profileImage: {
      type: String,
      default: "",
    },

    isDeleted: {
      type: Boolean,
      default: false,
    },
  },
  {
    timestamps: true,
  }
);

/**
 * Auto Generate Employee ID
 * Example:
 * EMP0001
 * EMP0002
 * EMP0003
 */

// employeeSchema.pre("save", async function (next) {
//   if (!this.isNew) return next();

//   const Employee = mongoose.model("Employee");

//   const lastEmployee = await Employee.findOne().sort({ createdAt: -1 });

//   if (!lastEmployee || !lastEmployee.employeeId) {
//     this.employeeId = "EMP0001";
//   } else {
//     const lastNumber = parseInt(lastEmployee.employeeId.replace("EMP", ""));
//     const nextNumber = (lastNumber + 1).toString().padStart(4, "0");
//     this.employeeId = `EMP${nextNumber}`;
//   }

//   next();
// });

employeeSchema.pre("save", async function () {
  if (!this.isNew) return;

  const lastEmployee = await this.constructor
    .findOne()
    .sort({ createdAt: -1 });

  if (!lastEmployee || !lastEmployee.employeeId) {
    this.employeeId = "EMP0001";
  } else {
    const lastNumber = parseInt(
      lastEmployee.employeeId.replace("EMP", ""),
      10
    );

    this.employeeId = `EMP${String(lastNumber + 1).padStart(4, "0")}`;
  }
});

/**
 * Hash Password Before Saving
 */

// employeeSchema.pre("save", async function (next) {
//   if (!this.isModified("password")) return next();

//   const salt = await bcrypt.genSalt(10);

//   this.password = await bcrypt.hash(this.password, salt);

//   next();
// });

employeeSchema.pre("save", async function () {
  if (!this.isModified("password")) return;

  const salt = await bcrypt.genSalt(10);
  this.password = await bcrypt.hash(this.password, salt);
});

/**
 * Compare Password
 */

employeeSchema.methods.comparePassword = async function (enteredPassword) {
  return await bcrypt.compare(enteredPassword, this.password);
};

module.exports = mongoose.model("Employee", employeeSchema);