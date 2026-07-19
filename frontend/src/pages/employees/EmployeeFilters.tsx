import {
  Grid,
  MenuItem,
  TextField,
} from "@mui/material";

interface Props {
  search: string;
  setSearch: (value: string) => void;

  department: string;
  setDepartment: (value: string) => void;

  role: string;
  setRole: (value: string) => void;

  status: string;
  setStatus: (value: string) => void;

  sortBy: string;
  setSortBy: (value: string) => void;

  order: "asc" | "desc";
  setOrder: (value: "asc" | "desc") => void;
}

const EmployeeFilters = ({
  search,
  setSearch,
  department,
  setDepartment,
  role,
  setRole,
  status,
  setStatus,
  sortBy,
  setSortBy,
  order,
  setOrder,
}: Props) => {
  return (
    <Grid container spacing={2} mb={3}>
      <Grid size={{ xs: 12, md: 4 }}>
        <TextField
          fullWidth
          label="Search Employee"
          placeholder="Search by name or email"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
      </Grid>

      <Grid size={{ xs: 12, sm: 6, md: 2 }}>
        <TextField
          fullWidth
          select
          label="Department"
          value={department}
          onChange={(e) => setDepartment(e.target.value)}
        >
          <MenuItem value="">All</MenuItem>
          <MenuItem value="IT">IT</MenuItem>
          <MenuItem value="HR">HR</MenuItem>
          <MenuItem value="Finance">Finance</MenuItem>
          <MenuItem value="Sales">Sales</MenuItem>
          <MenuItem value="Marketing">Marketing</MenuItem>
        </TextField>
      </Grid>

      <Grid size={{ xs: 12, sm: 6, md: 2 }}>
        <TextField
          fullWidth
          select
          label="Role"
          value={role}
          onChange={(e) => setRole(e.target.value)}
        >
          <MenuItem value="">All</MenuItem>
          <MenuItem value="Super Admin">
            Super Admin
          </MenuItem>
          <MenuItem value="HR Manager">
            HR Manager
          </MenuItem>
          <MenuItem value="Employee">
            Employee
          </MenuItem>
        </TextField>
      </Grid>

      <Grid size={{ xs: 12, sm: 6, md: 2 }}>
        <TextField
          fullWidth
          select
          label="Status"
          value={status}
          onChange={(e) => setStatus(e.target.value)}
        >
          <MenuItem value="">All</MenuItem>
          <MenuItem value="Active">
            Active
          </MenuItem>
          <MenuItem value="Inactive">
            Inactive
          </MenuItem>
        </TextField>
      </Grid>

      <Grid size={{ xs: 6, md: 1 }}>
        <TextField
          fullWidth
          select
          label="Sort"
          value={sortBy}
          onChange={(e) => setSortBy(e.target.value)}
        >
          <MenuItem value="createdAt">
            Created
          </MenuItem>

          <MenuItem value="name">
            Name
          </MenuItem>

          <MenuItem value="joiningDate">
            Joining
          </MenuItem>
        </TextField>
      </Grid>

      <Grid size={{ xs: 6, md: 1 }}>
        <TextField
          fullWidth
          select
          label="Order"
          value={order}
          onChange={(e) =>
            setOrder(
              e.target.value as "asc" | "desc"
            )
          }
        >
          <MenuItem value="asc">
            ASC
          </MenuItem>

          <MenuItem value="desc">
            DESC
          </MenuItem>
        </TextField>
      </Grid>
    </Grid>
  );
};

export default EmployeeFilters;