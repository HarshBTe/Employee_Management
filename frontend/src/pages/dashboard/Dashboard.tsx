import { useEffect, useState } from "react";
import {
  Box,
  Card,
  CardContent,
  CircularProgress,
  Grid,
  Typography,
} from "@mui/material";

import DashboardLayout from "../../components/layout/DashboardLayout";

import {
  getDashboardStats,
  getDepartmentChart,
} from "../../services/employeeService";

import {
  ResponsiveContainer,
  BarChart,
  Bar,
  CartesianGrid,
  XAxis,
  YAxis,
  Tooltip,
} from "recharts";

interface DashboardStats {
  totalEmployees: number;
  activeEmployees: number;
  inactiveEmployees: number;
  departmentCount: number;
}

interface DepartmentChart {
  _id: string;
  employees: number;
}

const Dashboard = () => {
  const [loading, setLoading] = useState(true);

  const [stats, setStats] = useState<DashboardStats>({
    totalEmployees: 0,
    activeEmployees: 0,
    inactiveEmployees: 0,
    departmentCount: 0,
  });

  const [chartData, setChartData] = useState<
    DepartmentChart[]
  >([]);

  useEffect(() => {
    loadDashboard();
  }, []);

 const loadDashboard = async () => {
  console.log("loadDashboard started");
  try {
    setLoading(true);

    const [statsRes, chartRes] = await Promise.all([
      getDashboardStats(),
      getDepartmentChart(),
    ]);

    

console.log("Full Axios Response:", statsRes);
console.log("Response data:", statsRes.data);
console.log("Response data.data:", statsRes.data.data);


    console.log("statsRes =", statsRes);
    console.log("statsRes.data =", statsRes.data);
    console.log("statsRes.data.data =", statsRes.data.data);

    setStats(statsRes.data.data);

    console.log("chartRes =", chartRes.data);

    setChartData(chartRes.data.data);
  } catch (error) {
    console.log(error);
  } finally {
    setLoading(false);
  }
};

useEffect(() => {
  console.log("Stats state =", stats);
}, [stats]);

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
      <Typography
        variant="h4"
        fontWeight={700}
        mb={3}
      >
        Dashboard
      </Typography>

      <Grid container spacing={3}>

                <Grid size={{ xs: 12, sm: 6, md: 3 }}>
          <Card elevation={3}>
            <CardContent>
              <Typography
                color="text.secondary"
                gutterBottom
              >
                Total Employees
              </Typography>

              <Typography
                variant="h4"
                fontWeight={700}
              >
                {stats.totalEmployees}
              </Typography>
            </CardContent>
          </Card>
        </Grid>

        <Grid size={{ xs: 12, sm: 6, md: 3 }}>
          <Card elevation={3}>
            <CardContent>
              <Typography
                color="text.secondary"
                gutterBottom
              >
                Active Employees
              </Typography>

              <Typography
                variant="h4"
                fontWeight={700}
                color="success.main"
              >
                {stats.activeEmployees}
              </Typography>
            </CardContent>
          </Card>
        </Grid>

        <Grid size={{ xs: 12, sm: 6, md: 3 }}>
          <Card elevation={3}>
            <CardContent>
              <Typography
                color="text.secondary"
                gutterBottom
              >
                Inactive Employees
              </Typography>

              <Typography
                variant="h4"
                fontWeight={700}
                color="error.main"
              >
                {stats.inactiveEmployees}
              </Typography>
            </CardContent>
          </Card>
        </Grid>

        <Grid size={{ xs: 12, sm: 6, md: 3 }}>
          <Card elevation={3}>
            <CardContent>
              <Typography
                color="text.secondary"
                gutterBottom
              >
                Departments
              </Typography>

              <Typography
                variant="h4"
                fontWeight={700}
                color="primary"
              >
                {stats.departmentCount}
              </Typography>
            </CardContent>
          </Card>
        </Grid>

        <Grid size={12}>
          <Card elevation={3}>
            <CardContent>

              <Typography
                variant="h6"
                fontWeight={600}
                mb={2}
              >
                Employees by Department
              </Typography>

              <ResponsiveContainer
                width="100%"
                height={350}
              >
                <BarChart data={chartData}>
                  <CartesianGrid strokeDasharray="3 3" />

                  <XAxis dataKey="_id" />

                  <YAxis />

                  <Tooltip />

                  <Bar
                    dataKey="employees"
                    radius={[8, 8, 0, 0]}
                  />
                </BarChart>
              </ResponsiveContainer>

            </CardContent>
          </Card>
        </Grid>

      </Grid>
    </DashboardLayout>
  );
};

export default Dashboard;