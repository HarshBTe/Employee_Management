import { Box, Toolbar } from "@mui/material";
import { useState } from "react";

import Sidebar from "./Sidebar";
import Navbar from "./Navbar";

import { DRAWER_WIDTH } from "../../utils/constants";

interface Props {
  children: React.ReactNode;
}

const DashboardLayout = ({ children }: Props) => {
  const [open, setOpen] = useState(true);

  return (
    <Box sx={{ display: "flex" }}>
      <Sidebar
        open={open}
        onClose={() => setOpen(false)}
      />

      <Box
        sx={{
          flexGrow: 1,
          
          bgcolor: "#F8FAFC",
          minHeight: "100vh",
        }}
      >
        <Navbar
          onMenuClick={() => setOpen(!open)}
        />

        <Toolbar />

        <Box
          sx={{
            p: 4,
          }}
        >
          {children}
        </Box>
      </Box>
    </Box>
  );
};

export default DashboardLayout;