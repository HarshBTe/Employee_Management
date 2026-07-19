import {
  AppBar,
  Toolbar,
  IconButton,
  Box,
  Avatar,
  Badge,
  Typography,
  TextField,
  InputAdornment,
} from "@mui/material";

import MenuRoundedIcon from "@mui/icons-material/MenuRounded";
import NotificationsNoneRoundedIcon from "@mui/icons-material/NotificationsNoneRounded";
import SearchRoundedIcon from "@mui/icons-material/SearchRounded";
import DarkModeOutlinedIcon from "@mui/icons-material/DarkModeOutlined";
import { useAuth } from "../../context/AuthContext";

import { DRAWER_WIDTH } from "../../utils/constants";

interface Props {
  onMenuClick: () => void;
}

const Navbar = ({ onMenuClick }: Props) => {
  const { user } = useAuth();
  return (
    <AppBar
      position="fixed"
      elevation={0}
      sx={{
        bgcolor: "#ffffff",
        color: "#1E293B",
        borderBottom: "1px solid #E2E8F0",
        width: `calc(100% - ${DRAWER_WIDTH}px)`,
        ml: `${DRAWER_WIDTH}px`,
      }}
    >
      <Toolbar
  sx={{
    justifyContent: "space-between",
  }}
>
  <Typography
    variant="h5"
    fontWeight={700}
  >
    Employee Management System
  </Typography>

  <Avatar
    src={
      user?.profileImage
        ? `https://employee-management-backend-1am0.onrender.com${user.profileImage}`
        : ""
    }
  >
    {user?.name?.charAt(0)}
  </Avatar>
</Toolbar>
    </AppBar>
  );
};

export default Navbar;
