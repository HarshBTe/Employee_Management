import {
  Paper,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  Typography,
  Avatar,
  Stack,
} from "@mui/material";

const data = [
  {
    name: "Harsh Dubey",
    department: "IT",
    role: "Super Admin",
  },
  {
    name: "Rahul Sharma",
    department: "HR",
    role: "HR Manager",
  },
  {
    name: "Ankit Singh",
    department: "Finance",
    role: "Employee",
  },
];

const RecentEmployeesTable = () => {
  return (
    <Paper sx={{ p: 3 }}>
      <Typography
        variant="h6"
        fontWeight={700}
        mb={3}
      >
        Recent Employees
      </Typography>

      <Table>
        <TableHead>
          <TableRow>
            <TableCell>Name</TableCell>
            <TableCell>Department</TableCell>
            <TableCell>Role</TableCell>
          </TableRow>
        </TableHead>

        <TableBody>
          {data.map((employee) => (
            <TableRow key={employee.name}>
              <TableCell>
                <Stack direction="row" spacing={2}>
                  <Avatar>
                    {employee.name[0]}
                  </Avatar>

                  {employee.name}
                </Stack>
              </TableCell>

              <TableCell>{employee.department}</TableCell>

              <TableCell>{employee.role}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </Paper>
  );
};

export default RecentEmployeesTable;