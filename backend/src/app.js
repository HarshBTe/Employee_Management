const express = require("express");
const cors = require("cors");
const cookieParser = require("cookie-parser");
const morgan = require("morgan");

const authRoutes = require("./routes/authRoutes");

const employeeRoutes = require("./routes/employeeRoutes");

const organizationRoutes = require("./routes/organizationRoutes");

const dashboardRoutes = require("./routes/dashboardRoutes");

const path = require("path");

const app = express();

// app.use(
//   cors({
//     origin: "http://localhost:3000",
//     credentials: true,
//   })
// );

app.use(
  cors({
    origin: process.env.FRONTEND_URL,
    credentials: true,
  })
);

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(morgan("dev"));

app.use("/api/auth", authRoutes);
app.use("/api/employees", employeeRoutes);

app.use("/uploads", express.static(path.join(__dirname, "../uploads")));

app.use("/api/organization", organizationRoutes);

app.use("/api/dashboard", dashboardRoutes);

app.get("/", (req, res) => {
  res.json({
    success: true,
    message: "Employee Management System API is running 🚀",
  });
});

module.exports = app;