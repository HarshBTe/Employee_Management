import {
  ResponsiveContainer,
  AreaChart,
  Area,
  CartesianGrid,
  XAxis,
  Tooltip,
} from "recharts";

import { Paper, Typography } from "@mui/material";

const data = [
  { month: "Jan", employees: 20 },
  { month: "Feb", employees: 26 },
  { month: "Mar", employees: 35 },
  { month: "Apr", employees: 48 },
  { month: "May", employees: 57 },
  { month: "Jun", employees: 70 },
];

const EmployeeChart = () => {
  return (
    <Paper sx={{ p: 3, height: 380 }}>
      <Typography
        variant="h6"
        fontWeight={700}
        mb={3}
      >
        Employee Growth
      </Typography>

      <ResponsiveContainer width="100%" height="90%">
        <AreaChart data={data}>
          <CartesianGrid strokeDasharray="3 3" />

          <XAxis dataKey="month" />

          <Tooltip />

          <Area
            dataKey="employees"
            fill="#2563EB"
            stroke="#2563EB"
          />
        </AreaChart>
      </ResponsiveContainer>
    </Paper>
  );
};

export default EmployeeChart;