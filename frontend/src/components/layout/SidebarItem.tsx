import { ListItemButton, ListItemIcon, ListItemText } from "@mui/material";
import { NavLink } from "react-router-dom";

interface Props {
  title: string;
  icon: React.ReactNode;
  to: string;
}

const SidebarItem = ({ title, icon, to }: Props) => {
  return (
    <ListItemButton
      component={NavLink}
      to={to}
      sx={{
        mb: 1,
        borderRadius: 3,
        color: "#CBD5E1",
        transition: "all .25s",

        "& .MuiListItemIcon-root": {
          color: "#94A3B8",
          minWidth: 42,
        },

        "&.active": {
          bgcolor: "#2563EB",
          color: "#fff",

          "& .MuiListItemIcon-root": {
            color: "#fff",
          },
        },

        "&:hover": {
          bgcolor: "#1E40AF",
          color: "#fff",

          "& .MuiListItemIcon-root": {
            color: "#fff",
          },
        },
      }}
    >
      <ListItemIcon>{icon}</ListItemIcon>

      <ListItemText
        primary={title}
        primaryTypographyProps={{
          fontWeight: 600,
          fontSize: 15,
        }}
      />
    </ListItemButton>
  );
};

export default SidebarItem;