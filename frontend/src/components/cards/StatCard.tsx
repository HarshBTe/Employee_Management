import {
  Paper,
  Typography,
  Stack,
  Avatar,
  Box,
} from "@mui/material";

interface Props {
  title: string;
  value: string | number;
  subtitle: string;
  icon: React.ReactNode;
  color: string;
}

const StatCard = ({
  title,
  value,
  subtitle,
  icon,
  color,
}: Props) => {
  return (
    <Paper
      sx={{
        p: 3,
        height: 170,
        display: "flex",
        justifyContent: "space-between",
        transition: ".3s",

        "&:hover": {
          transform: "translateY(-5px)",
        },
      }}
    >
      <Box>
        <Typography
          color="text.secondary"
          fontWeight={600}
        >
          {title}
        </Typography>

        <Typography
          mt={2}
          variant="h3"
          fontWeight={700}
        >
          {value}
        </Typography>

        <Typography
          mt={2}
          color="text.secondary"
        >
          {subtitle}
        </Typography>
      </Box>

      <Avatar
        sx={{
          bgcolor: color,
          width: 60,
          height: 60,
        }}
      >
        {icon}
      </Avatar>
    </Paper>
  );
};

export default StatCard;