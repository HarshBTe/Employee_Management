import { useEffect, useState } from "react";
import {
  Box,
  Button,
  CircularProgress,
  Stack,
  Typography,
} from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import toast from "react-hot-toast";

import DashboardLayout from "../../components/layout/DashboardLayout";
import EmployeeFilters from "./EmployeeFilters";
import EmployeeTable from "./EmployeeTable";
import EmployeeDialog from "./EmployeeDialog";

import {
  getEmployees,
  deleteEmployee,
} from "../../services/employeeService";

import type { Employee } from "../../types/employee";

const Employees = () => {
  const [employees, setEmployees] = useState<Employee[]>([]);
  const [loading, setLoading] = useState(true);

  const [page, setPage] = useState(1);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [total, setTotal] = useState(0);

  const [search, setSearch] = useState("");
  const [department, setDepartment] = useState("");
  const [role, setRole] = useState("");
  const [status, setStatus] = useState("");

  const [sortBy, setSortBy] = useState("createdAt");
  const [order, setOrder] = useState<"asc" | "desc">("desc");

  const [dialogOpen, setDialogOpen] = useState(false);
  const [selectedEmployee, setSelectedEmployee] =
    useState<Employee | null>(null);

  const fetchEmployees = async () => {
    try {
      setLoading(true);

      const { data } = await getEmployees({
        page,
        limit: rowsPerPage,
        search,
        department,
        role,
        status,
        sortBy,
        order,
      });

      setEmployees(data.employees);
      setTotal(data.total);
    } catch (error: any) {
      toast.error(
        error?.response?.data?.message ||
          "Failed to load employees."
      );
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchEmployees();
  }, [
    page,
    rowsPerPage,
    search,
    department,
    role,
    status,
    sortBy,
    order,
  ]);

  const handleDelete = async (id: string) => {
    const confirmDelete = window.confirm(
      "Delete this employee?"
    );

    if (!confirmDelete) return;

    try {
      await deleteEmployee(id);

      toast.success("Employee deleted.");

      fetchEmployees();
    } catch (error: any) {
      toast.error(
        error?.response?.data?.message ||
          "Delete failed."
      );
    }
  };

  const handleEdit = (employee: Employee) => {
    setSelectedEmployee(employee);
    setDialogOpen(true);
  };

  const handleAdd = () => {
    setSelectedEmployee(null);
    setDialogOpen(true);
  };

  const handleClose = () => {
    setDialogOpen(false);
    setSelectedEmployee(null);

    fetchEmployees();
  };

  if (loading) {
    return (
      <DashboardLayout>
        <Box
          display="flex"
          justifyContent="center"
          mt={10}
        >
          <CircularProgress />
        </Box>
      </DashboardLayout>
    );
  }

  return (
    <DashboardLayout>
      <Stack
        direction="row"
        justifyContent="space-between"
        alignItems="center"
        mb={3}
      >
        <Typography
          variant="h4"
          fontWeight={700}
           sx={{ mr: 4 }}
        >
          Employees
        </Typography>

        <Button
          variant="contained"
          startIcon={<AddIcon />}
          onClick={handleAdd}
        >
          Add Employee
        </Button>
      </Stack>
   
   <Box sx={{ mt: 3 }}>
<EmployeeFilters
        search={search}
        setSearch={setSearch}
        department={department}
        setDepartment={setDepartment}
        role={role}
        setRole={setRole}
        status={status}
        setStatus={setStatus}
        sortBy={sortBy}
        setSortBy={setSortBy}
        order={order}
        setOrder={setOrder}
      />

   </Box>
      

      <Box mt={3}>        <EmployeeTable
          employees={employees}
          total={total}
          page={page}
          rowsPerPage={rowsPerPage}
          onPageChange={setPage}
          onRowsPerPageChange={(rows) => {
            setRowsPerPage(rows);
            setPage(1);
          }}
          onEdit={handleEdit}
          onDelete={handleDelete}
        />
      </Box>

      <EmployeeDialog
        open={dialogOpen}
        employee={selectedEmployee}
        onClose={handleClose}
      />
    </DashboardLayout>
  );
};

export default Employees;