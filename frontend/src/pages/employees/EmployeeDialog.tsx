import { useEffect, useState } from "react";
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Grid,
  MenuItem,
  TextField,
} from "@mui/material";
import toast from "react-hot-toast";

import {
  createEmployee,
  getEmployees,
  updateEmployee,
} from "../../services/employeeService";

import type { Employee } from "../../types/employee";

interface Props {
  open: boolean;
  employee: Employee | null;
  onClose: () => void;
}

const EmployeeDialog = ({
  open,
  employee,
  onClose,
}: Props) => {
  const [managerList, setManagerList] = useState<Employee[]>([]);

  const [image, setImage] = useState<File | null>(null);

  const [form, setForm] = useState({
    employeeId: "",
    name: "",
    email: "",
    phone: "",
    password: "",
    department: "",
    designation: "",
    salary: "",
    joiningDate: "",
    status: "Active",
    role: "Employee",
    manager: "",
  });

  useEffect(() => {
    if (open) {
      loadManagers();
    }
  }, [open]);

  useEffect(() => {
    if (employee) {
      setForm({
        employeeId: employee.employeeId,
        name: employee.name,
        email: employee.email,
        phone: employee.phone,
        password: "",
        department: employee.department,
        designation: employee.designation,
        salary: employee.salary.toString(),
        joiningDate: employee.joiningDate?.substring(0, 10),
        status: employee.status,
        role: employee.role,
        manager:
          typeof employee.manager === "object"
            ? employee.manager?._id || ""
            : employee.manager || "",
      });
    } else {
      resetForm();
    }
  }, [employee]);

  const resetForm = () => {
    setForm({
      employeeId: "",
      name: "",
      email: "",
      phone: "",
      password: "",
      department: "",
      designation: "",
      salary: "",
      joiningDate: "",
      status: "Active",
      role: "Employee",
      manager: "",
    });

    setImage(null);
  };

  const loadManagers = async () => {
    try {
      const { data } = await getEmployees({
        page: 1,
        limit: 1000,
      });

      setManagerList(data.employees);
    } catch {}
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    setForm((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

    const handleSubmit = async () => {
    if (
      !form.employeeId ||
      !form.name ||
      !form.email ||
      !form.phone ||
      !form.department ||
      !form.designation ||
      !form.salary ||
      !form.joiningDate
    ) {
      toast.error("Please fill all required fields.");
      return;
    }

    if (!employee && !form.password) {
      toast.error("Password is required.");
      return;
    }

    const formData = new FormData();

    formData.append("employeeId", form.employeeId);
    formData.append("name", form.name);
    formData.append("email", form.email);
    formData.append("phone", form.phone);

    if (form.password) {
      formData.append("password", form.password);
    }

    formData.append("department", form.department);
    formData.append("designation", form.designation);
    formData.append("salary", form.salary);
    formData.append("joiningDate", form.joiningDate);
    formData.append("status", form.status);
    formData.append("role", form.role);

    if (form.manager) {
      formData.append("manager", form.manager);
    }

    if (image) {
      formData.append("profileImage", image);
    }

    try {
      if (employee) {
        await updateEmployee(employee._id, formData);

        toast.success("Employee updated successfully.");
      } else {
        await createEmployee(formData);

        toast.success("Employee created successfully.");
      }

      resetForm();
      onClose();
    } catch (error: any) {
      toast.error(
        error?.response?.data?.message ||
          "Something went wrong."
      );
    }
  };

  return (
    <Dialog
      open={open}
      onClose={onClose}
      fullWidth
      maxWidth="md"
    >
      <DialogTitle>
        {employee ? "Edit Employee" : "Add Employee"}
      </DialogTitle>

      <DialogContent>
        <Grid container spacing={2} mt={1}>

          <Grid size={{ xs: 12, md: 6 }}>
            <TextField
              fullWidth
              label="Employee ID"
              name="employeeId"
              value={form.employeeId}
              onChange={handleChange}
            />
          </Grid>

          <Grid size={{ xs: 12, md: 6 }}>
            <TextField
              fullWidth
              label="Full Name"
              name="name"
              value={form.name}
              onChange={handleChange}
            />
          </Grid>

          <Grid size={{ xs: 12, md: 6 }}>
            <TextField
              fullWidth
              type="email"
              label="Email"
              name="email"
              value={form.email}
              onChange={handleChange}
            />
          </Grid>

          <Grid size={{ xs: 12, md: 6 }}>
            <TextField
              fullWidth
              label="Phone"
              name="phone"
              value={form.phone}
              onChange={handleChange}
            />
          </Grid>

          {!employee && (
            <Grid size={{ xs: 12, md: 6 }}>
              <TextField
                fullWidth
                type="password"
                label="Password"
                name="password"
                value={form.password}
                onChange={handleChange}
              />
            </Grid>
          )}

          <Grid size={{ xs: 12, md: 6 }}>
            <TextField
              fullWidth
              label="Department"
              name="department"
              value={form.department}
              onChange={handleChange}
            />
          </Grid>

          <Grid size={{ xs: 12, md: 6 }}>
            <TextField
              fullWidth
              label="Designation"
              name="designation"
              value={form.designation}
              onChange={handleChange}
            />
          </Grid>

          <Grid size={{ xs: 12, md: 6 }}>
            <TextField
              fullWidth
              type="number"
              label="Salary"
              name="salary"
              value={form.salary}
              onChange={handleChange}
            />
          </Grid>

          <Grid size={{ xs: 12, md: 6 }}>
            <TextField
              fullWidth
              type="date"
              label="Joining Date"
              name="joiningDate"
              value={form.joiningDate}
              onChange={handleChange}
              InputLabelProps={{ shrink: true }}
            />
          </Grid>

          <Grid size={{ xs: 12, md: 6 }}>
            <TextField
              select
              fullWidth
              label="Status"
              name="status"
              value={form.status}
              onChange={handleChange}
            >
              <MenuItem value="Active">
                Active
              </MenuItem>

              <MenuItem value="Inactive">
                Inactive
              </MenuItem>
            </TextField>
          </Grid>

          <Grid size={{ xs: 12, md: 6 }}>
            <TextField
              select
              fullWidth
              label="Role"
              name="role"
              value={form.role}
              onChange={handleChange}
            >
              <MenuItem value="Employee">
                Employee
              </MenuItem>

              <MenuItem value="HR Manager">
                HR Manager
              </MenuItem>

              <MenuItem value="Super Admin">
                Super Admin
              </MenuItem>
            </TextField>
          </Grid>

          <Grid size={12}>
            <TextField
              select
              fullWidth
              label="Reporting Manager"
              name="manager"
              value={form.manager}
              onChange={handleChange}
            >
              <MenuItem value="">
                None
              </MenuItem>

              {managerList
                .filter((manager) => manager._id !== employee?._id)
                .map((manager) => (
                  <MenuItem
                    key={manager._id}
                    value={manager._id}
                  >
                    {manager.name} ({manager.employeeId})
                  </MenuItem>
                ))}
            </TextField>
          </Grid>

          <Grid size={12}>
            <Button
              variant="outlined"
              component="label"
            >
              Upload Profile Image

              <input
                hidden
                type="file"
                accept="image/*"
                onChange={(e) =>
                  setImage(
                    e.target.files?.[0] || null
                  )
                }
              />
            </Button>

            {image && (
              <Button
                sx={{ ml: 2 }}
                disabled
              >
                {image.name}
              </Button>
            )}
          </Grid>

        </Grid>
      </DialogContent>

      <DialogActions>
        <Button onClick={onClose}>
          Cancel
        </Button>

        <Button
          variant="contained"
          onClick={handleSubmit}
        >
          {employee ? "Update Employee" : "Create Employee"}
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default EmployeeDialog;