import { createTheme, alpha } from "@mui/material/styles";

export const matrixTheme = createTheme({
  palette: {
    primary: {
      main: "#00ff00", // Vert néon
      contrastText: "#000000"
    },
    secondary: {
      main: "#009900" // Vert plus sombre
    },
    background: {
      default: "#000000",
      paper: alpha("#00ff00", 0.1) // Fond translucide
    },
    text: {
      primary: "#00ff00",
      secondary: alpha("#00ff00", 0.7)
    }
  },
  components: {
    MuiPaper: {
      styleOverrides: {
        root: {
          background: "rgba(0, 0, 0, 0.6)", // Arrière-plan semi-transparent
          backdropFilter: "blur(8px)", // Effet de flou
          border: "1px solid rgba(0, 255, 0, 0.5)",
          padding: "16px",
          borderRadius: "10px"
        }
      }
    },
    MuiButton: {
      styleOverrides: {
        root: {
          textTransform: "none",
          borderRadius: "8px",
          background: "linear-gradient(45deg, #00ff00, #006600)",
          color: "#000",
          "&:hover": {
            background: "linear-gradient(45deg, #00cc00, #004400)"
          }
        }
      }
    },
    MuiTypography: {
      styleOverrides: {
        root: {
          fontFamily: "'Courier New', monospace"
        }
      }
    }
  }
});
