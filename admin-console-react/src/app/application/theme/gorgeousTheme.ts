import { createTheme } from "@mui/material/styles";

export const gorgeousTheme = createTheme({
  palette: {
    mode: "dark",
    primary: {
      main: "#ff79c6", // Rose vif élégant
      contrastText: "#fff"
    },
    secondary: {
      main: "#bd93f9" // Violet pastel
    },
    background: {
      default: "#282a36", // Noir bleuté
      paper: "#44475a" // Gris bleuté
    },
    text: {
      primary: "#f8f8f2",
      secondary: "#6272a4"
    }
  },
  typography: {
    fontFamily: "\"Poppins\", sans-serif",
    h1: {
      fontSize: "2.5rem",
      fontWeight: 700
    },
    h2: {
      fontSize: "2rem",
      fontWeight: 600
    },
    body1: {
      fontSize: "1rem",
      color: "#f8f8f2"
    }
  },
  shape: {
    borderRadius: 12
  },
  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          textTransform: "none",
          borderRadius: 8,
          padding: "10px 20px",
          boxShadow: "0px 4px 6px rgba(0,0,0,0.1)",
          "&:hover": {
            boxShadow: "0px 6px 10px rgba(0,0,0,0.15)"
          }
        }
      }
    },
    MuiCard: {
      styleOverrides: {
        root: {
          borderRadius: 16,
          background: "linear-gradient(145deg, #373a49, #2c2f3e)",
          boxShadow: "5px 5px 10px #1c1e26, -5px -5px 10px #3d4152"
        }
      }
    },
    MuiGrid2: {
      styleOverrides: {
        root: {
          backgroundColor: "#282a36", // Maintient le fond sombre même sans ligne
          "& .MuiDataGrid-overlay": {
            backgroundColor: "#282a36" // Fond sombre lorsque aucune donnée n'est affichée
          }
        }
      }
    }
  }
});
