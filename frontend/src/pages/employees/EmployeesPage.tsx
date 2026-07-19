import { useEffect, useState } from "react";
import {
  Box,
  Button,
  CircularProgress,
  Paper,
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
  deleteEmployee,
  getEmployees,
} from "../../services/employeeService";

import type { Employee } from "../../types/employee";

const EmployeesPage = () => {
  const [employees, setEmployees] = useState<Employee[]>([]);
  const [loading, setLoading] = useState(false);

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
    } catch (error) {
      toast.error("Failed to load employees");
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
    if (!window.confirm("Delete this employee?")) return;

    try {
      await deleteEmployee(id);

      toast.success("Employee deleted");

      fetchEmployees();
    } catch {
      toast.error("Delete failed");
    }
  };

  return (
    <DashboardLayout>
      <Stack
        direction="row"
        justifyContent="space-between"
        alignItems="center"
        mb={3}
      >
        <Typography variant="h4" fontWeight={700}>
          Employees
        </Typography>

        <Button
          variant="contained"
          startIcon={<AddIcon />}
          onClick={() => {
            setSelectedEmployee(null);
            setDialogOpen(true);
          }}
        >
          Add Employee
        </Button>
      </Stack>

      <Paper sx={{ p: 3 }}>
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

        <Box mt={3}>
          {loading ? (
            <Box
              display="flex"
              justifyContent="center"
              py={8}
            >
              <CircularProgress />
            </Box>
          ) : (
            <EmployeeTable
              employees={employees}
              total={total}
              page={page}
              rowsPerPage={rowsPerPage}
              onPageChange={setPage}
              onRowsPerPageChange={(value) => {
                setRowsPerPage(value);
                setPage(1);
              }}
              onEdit={(employee) => {
                setSelectedEmployee(employee);
                setDialogOpen(true);
              }}
              onDelete={handleDelete}
            />
          )}
        </Box>
      </Paper>

      <EmployeeDialog
        open={dialogOpen}
        employee={selectedEmployee}
        onClose={() => {
          setDialogOpen(false);
          fetchEmployees();
        }}
      />
    </DashboardLayout>
  );
};

export default EmployeesPage;