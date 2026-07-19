import {
  Avatar,
  Chip,
  IconButton,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TablePagination,
  TableRow,
  Tooltip,
  Typography,
  Box,
} from "@mui/material";

import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";

import type { Employee } from "../../types/employee";

interface Props {
  employees: Employee[];
  total: number;
  page: number;
  rowsPerPage: number;

  onPageChange: (page: number) => void;
  onRowsPerPageChange: (rows: number) => void;

  onEdit: (employee: Employee) => void;
  onDelete: (id: string) => void;
}

const EmployeeTable = ({
  employees,
  total,
  page,
  rowsPerPage,
  onPageChange,
  onRowsPerPageChange,
  onEdit,
  onDelete,
}: Props) => {
  return (
    <Paper elevation={3}>
      <TableContainer>
        <Table>

          <TableHead>
            <TableRow>

              <TableCell>Profile</TableCell>

              <TableCell>Employee ID</TableCell>

              <TableCell>Name</TableCell>

              <TableCell>Email</TableCell>

              <TableCell>Department</TableCell>

              <TableCell>Designation</TableCell>

              <TableCell>Role</TableCell>

              <TableCell>Status</TableCell>

              <TableCell align="center">
                Actions
              </TableCell>

            </TableRow>
          </TableHead>

          <TableBody>

            {employees.length === 0 ? (
              <TableRow>
                <TableCell
                  colSpan={9}
                  align="center"
                >
                  <Typography py={3}>
                    No Employees Found
                  </Typography>
                </TableCell>
              </TableRow>
            ) : (
              employees.map((employee) => (
                <TableRow
                  hover
                  key={employee._id}
                >
                  <TableCell>
                    <Avatar
                      src={
                        employee.profileImage
                          ? `http://localhost:5000${employee.profileImage}`
                          : ""
                      }
                    >
                      {employee.name?.charAt(0)}
                    </Avatar>
                  </TableCell>

                  <TableCell>
                    {employee.employeeId}
                  </TableCell>

                  <TableCell>
                    {employee.name}
                  </TableCell>

                  <TableCell>
                    {employee.email}
                  </TableCell>

                  <TableCell>
                    {employee.department}
                  </TableCell>

                  <TableCell>
                    {employee.designation}
                  </TableCell>

                  <TableCell>
                    {employee.role}
                  </TableCell>

                  <TableCell>
                    <Chip
                      label={employee.status}
                      color={
                        employee.status === "Active"
                          ? "success"
                          : "error"
                      }
                      size="small"
                    />
                  </TableCell>

                  <TableCell align="center">

                    <Tooltip title="Edit">
                      <IconButton
                        color="primary"
                        onClick={() =>
                          onEdit(employee)
                        }
                      >
                        <EditIcon />
                      </IconButton>
                    </Tooltip>

                    <Tooltip title="Delete">
                      <IconButton
                        color="error"
                        onClick={() =>
                          onDelete(employee._id)
                        }
                      >
                        <DeleteIcon />
                      </IconButton>
                    </Tooltip>

                  </TableCell>
                </TableRow>
              ))
            )}

          </TableBody>

        </Table>
      </TableContainer>

      <Box display="flex" justifyContent="flex-end">
        <TablePagination
          component="div"
          count={total}
          page={page - 1}
          rowsPerPage={rowsPerPage}
          rowsPerPageOptions={[5, 10, 20, 50]}

          onPageChange={(_, newPage) =>
            onPageChange(newPage + 1)
          }

          onRowsPerPageChange={(e) =>
            onRowsPerPageChange(
              Number(e.target.value)
            )
          }
        />
      </Box>
    </Paper>
  );
};

export default EmployeeTable;