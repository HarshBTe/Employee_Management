import { createTheme } from "@mui/material/styles";

const theme = createTheme({
  palette: {
    primary: {
      main: "#2563EB",
    },

    secondary: {
      main: "#7C3AED",
    },

    success: {
      main: "#22C55E",
    },

    warning: {
      main: "#F59E0B",
    },

    error: {
      main: "#EF4444",
    },

    background: {
      default: "#F8FAFC",
      paper: "#FFFFFF",
    },
  },

  shape: {
    borderRadius: 14,
  },

  typography: {
    fontFamily: "Inter, sans-serif",

    h4: {
      fontWeight: 700,
    },

    h5: {
      fontWeight: 700,
    },

    h6: {
      fontWeight: 600,
    },

    button: {
      textTransform: "none",
      fontWeight: 600,
    },
  },

  components: {
    MuiPaper: {
      styleOverrides: {
        root: {
          borderRadius: 18,
          boxShadow:
            "0 10px 40px rgba(15,23,42,.08)",
        },
      },
    },

    MuiButton: {
      styleOverrides: {
        root: {
          borderRadius: 12,
          height: 46,
        },
      },
    },

    MuiOutlinedInput: {
      styleOverrides: {
        root: {
          borderRadius: 12,
        },
      },
    },
  },
});

export default theme;