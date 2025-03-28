import { createTheme } from "@mui/material/styles";

export const bestTheme = createTheme({
  palette: {
    mode: "dark",
    primary: {
      main: "#FF6B6B" // Rouge éclatant
    },
    secondary: {
      main: "#6BFFB3" // Vert néon
    },
    background: {
      default: "#121212", // Noir profond
      paper: "#1E1E1E"
    },
    text: {
      primary: "#FFFFFF",
      secondary: "#B3B3B3"
    }
  },
  typography: {
    fontFamily: "'Poppins', sans-serif", // Moderne et élégant
    h1: {
      fontSize: "2.5rem",
      fontWeight: 700,
      textTransform: "uppercase"
    },
    h2: {
      fontSize: "2rem",
      fontWeight: 600
    },
    body1: {
      fontSize: "1.2rem",
      fontWeight: 400
    }
  },
  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          borderRadius: "50px",
          textTransform: "none",
          fontWeight: 600,
          padding: "12px 24px",
          background: "linear-gradient(135deg, #FF6B6B, #FF8E53)",
          boxShadow: "0px 4px 10px rgba(255, 107, 107, 0.3)",
          "&:hover": {
            boxShadow: "0px 4px 15px rgba(255, 107, 107, 0.5)",
            background: "linear-gradient(135deg, #FF8E53, #FF6B6B)"
          }
        }
      }
    },
    MuiCard: {
      styleOverrides: {
        root: {
          background: "linear-gradient(145deg, #252525, #1A1A1A)",
          boxShadow: "0px 4px 20px rgba(255, 107, 107, 0.2)",
          borderRadius: "16px",
          padding: "16px"
        }
      }
    },
    MuiAppBar: {
      styleOverrides: {
        root: {
          background: "linear-gradient(90deg, #FF6B6B, #6BFFB3)",
          boxShadow: "0px 4px 15px rgba(255, 107, 107, 0.3)"
        }
      }
    },
    MuiPaper: {
      styleOverrides: {
        root: {
          background: "linear-gradient(180deg, #1E1E1E, #121212)",
          boxShadow: "0px 4px 15px rgba(255, 107, 107, 0.2)"
        }
      }
    },
    MuiTextField: {
      styleOverrides: {
        root: {
          "& .MuiInputBase-root": {
            borderRadius: "8px",
            backgroundColor: "#252525",
            color: "#FFFFFF"
          }
        }
      }
    }
  }
});
