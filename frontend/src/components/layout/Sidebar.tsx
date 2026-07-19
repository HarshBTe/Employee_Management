import {
  Avatar,
  Box,
  Button,
  Divider,
  Drawer,
  List,
  Stack,
  Typography,
} from "@mui/material";

import DashboardRoundedIcon from "@mui/icons-material/DashboardRounded";
import GroupsRoundedIcon from "@mui/icons-material/GroupsRounded";
import AccountTreeRoundedIcon from "@mui/icons-material/AccountTreeRounded";
import PersonRoundedIcon from "@mui/icons-material/PersonRounded";
import LogoutRoundedIcon from "@mui/icons-material/LogoutRounded";

import SidebarItem from "./SidebarItem";

import {
  DRAWER_WIDTH,
  APP_NAME,
} from "../../utils/constants";

import { useAuth } from "../../context/AuthContext";

interface Props {
  open: boolean;
  onClose: () => void;
}

const Sidebar = ({ open }: Props) => {

  const { user, logout } = useAuth();

  return (
    <Drawer
      variant="permanent"
      sx={{
        width: DRAWER_WIDTH,

        "& .MuiDrawer-paper": {
          width: DRAWER_WIDTH,
          bgcolor: "#0F172A",
          color: "#fff",
          border: "none",
          display: "flex",
          justifyContent: "space-between",
          padding: "10px",
        },
      }}
    >
      <Box>

        <Stack
          direction="row"
          spacing={2}
          alignItems="center"
          p={3}
        >
          <Avatar
            sx={{
              bgcolor: "#2563EB",
            }}
          >
            E
          </Avatar>

          <Box>
            <Typography fontWeight={700}>
              {APP_NAME}
            </Typography>

            <Typography
              fontSize={13}
              color="#94A3B8"
            >
              Employee Management
            </Typography>
          </Box>
        </Stack>

        <Divider sx={{ borderColor: "#1E293B" }} />

        <List sx={{ p: 2 }}>

          <SidebarItem
            title="Dashboard"
            icon={<DashboardRoundedIcon />}
            to="/"
          />

          <SidebarItem
            title="Employees"
            icon={<GroupsRoundedIcon />}
            to="/employees"
          />

          <SidebarItem
            title="Organization"
            icon={<AccountTreeRoundedIcon />}
            to="/organization"
          />

          <SidebarItem
            title="Profile"
            icon={<PersonRoundedIcon />}
            to="/profile"
          />

        </List>

      </Box>

      <Box p={3}>

        <Divider
          sx={{
            borderColor: "#1E293B",
            mb: 2,
          }}
        />

        <Stack
          spacing={2}
        >

          <Stack
            direction="row"
            spacing={2}
            alignItems="center"
          >
            <Avatar
              src={
                user?.profileImage
                  ? `http://localhost:5000${user.profileImage}`
                  : ""
              }
            >
              {user?.name?.charAt(0)}
            </Avatar>

            <Box>

              <Typography fontWeight={600}>
                {user?.name}
              </Typography>

              <Typography
                fontSize={13}
                color="#94A3B8"
              >
                {user?.role}
              </Typography>

            </Box>

          </Stack>

          <Button
            fullWidth
            color="error"
            variant="outlined"
            startIcon={<LogoutRoundedIcon />}
            onClick={logout}
          >
            Logout
          </Button>

        </Stack>

      </Box>
    </Drawer>
  );
};

export default Sidebar;