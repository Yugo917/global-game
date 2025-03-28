import { createTheme } from "@mui/material/styles";

export const ff7Theme = createTheme({
  palette: {
    mode: "dark",
    primary: {
      main: "#00FF99" // Vert mako
    },
    secondary: {
      main: "#1B4F72" // Bleu métallisé
    },
    background: {
      default: "#1A1A1A", // Sombre, proche du Midgar industriel
      paper: "#222222"
    },
    text: {
      primary: "#E0E0E0",
      secondary: "#B0B0B0"
    }
  },
  typography: {
    fontFamily: "'Press Start 2P', monospace", // Style pixelisé rétro
    h1: {
      fontSize: "2rem",
      fontWeight: 700
    },
    h2: {
      fontSize: "1.75rem",
      fontWeight: 600
    },
    body1: {
      fontSize: "1rem",
      fontWeight: 400
    }
  },
  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          borderRadius: "8px",
          textTransform: "none",
          fontWeight: 600,
          boxShadow: "0px 4px 10px rgba(0, 255, 153, 0.2)",
          background: "linear-gradient(135deg, #00FF99, #007755)",
          "&:hover": {
            boxShadow: "0px 4px 15px rgba(0, 255, 153, 0.3)",
            background: "linear-gradient(135deg, #00FF99, #004422)"
          }
        }
      }
    },
    MuiCard: {
      styleOverrides: {
        root: {
          background: "linear-gradient(145deg, #2A2A2A, #1A1A1A)",
          boxShadow: "0px 4px 20px rgba(0, 255, 153, 0.15)",
          borderRadius: "12px"
        }
      }
    },
    MuiAppBar: {
      styleOverrides: {
        root: {
          background: "linear-gradient(90deg, #1B4F72, #00FF99)", // Inspiré des menus de FF7
          boxShadow: "0px 4px 10px rgba(0, 255, 153, 0.3)"
        }
      }
    },
    MuiPaper: {
      styleOverrides: {
        root: {
          background: "linear-gradient(180deg, #222222, #1A1A1A)",
          boxShadow: "0px 4px 15px rgba(0, 255, 153, 0.2)"
        }
      }
    }
  }
});
