import { createTheme, alpha } from "@mui/material/styles";

export const darkOrangeTheme = createTheme({
  palette: {
    primary: {
      main: "#F7931E", // Orange vif
      contrastText: "#1E1E1E" // Gris foncé
    },
    secondary: {
      main: "#ED6A11" // Orange plus saturé
    },
    background: {
      default: "#262626", // Fond principal
      paper: "#1E1E1E" // Cartes et panneaux
    },
    text: {
      primary: "#F9BE70", // Jaune-orangé pour lisibilité
      secondary: "#F7931E" // Orange vif
    }
  },
  components: {
    MuiPaper: {
      styleOverrides: {
        root: {
          background: "#1E1E1E",
          color: "#F9BE70",
          borderRadius: "8px",
          padding: "16px",
          boxShadow: "0px 4px 10px rgba(0, 0, 0, 0.3)"
        }
      }
    },
    MuiButton: {
      styleOverrides: {
        root: {
          textTransform: "none",
          borderRadius: "6px",
          backgroundColor: "#F7931E",
          color: "#1E1E1E",
          "&:hover": {
            backgroundColor: "#ED6A11"
          }
        }
      }
    },
    MuiTypography: {
      styleOverrides: {
        root: {
          fontFamily: "'Roboto', sans-serif",
          color: "#F9BE70"
        }
      }
    },
    MuiSlider: {
      styleOverrides: {
        root: {
          color: "#F7931E",
          height: 4,
          "& .MuiSlider-thumb": {
            backgroundColor: "#ED6A11"
          }
        }
      }
    },
    MuiTextField: {
      styleOverrides: {
        root: {
          "& .MuiOutlinedInput-root": {
            backgroundColor: "#262626",
            color: "#F9BE70",
            "& fieldset": {
              borderColor: "#F7931E"
            },
            "&:hover fieldset": {
              borderColor: "#ED6A11"
            },
            "&.Mui-focused fieldset": {
              borderColor: "#F9BE70"
            }
          }
        }
      }
    }
    // MuiDataGrid: {
    //   styleOverrides: {
    //     root: {
    //       backgroundColor: "#1E1E1E",
    //       color: "#F9BE70",
    //       border: "1px solid #F7931E"
    //     },
    //     columnHeaders: {
    //       backgroundColor: "#262626",
    //       color: "#F9BE70",
    //       borderBottom: "1px solid #F7931E"
    //     },
    //     row: {
    //       "&:nth-of-type(odd)": {
    //         backgroundColor: "#262626"
    //       },
    //       "&:hover": {
    //         backgroundColor: "rgba(247, 147, 30, 0.2)"
    //       }
    //     },
    //     cell: {
    //       borderBottom: "1px solid #F7931E"
    //     },
    //     footerContainer: {
    //       backgroundColor: "#262626",
    //       color: "#F9BE70",
    //       borderTop: "1px solid #F7931E"
    //     }
    //   }
    // }
  }
}, {
  components: {
    MuiDataGrid: {
      defaultProps: {
        disableSelectionOnClick: true,
        sx: {
          "& .MuiDataGrid-cell": {
            color: "#F9BE70"
          },
          "& .MuiDataGrid-columnHeaders": {
            backgroundColor: "#262626",
            color: "#F9BE70",
            borderBottom: "1px solid #F7931E"
          },
          "& .MuiDataGrid-row:hover": {
            backgroundColor: "rgba(247, 147, 30, 0.2)"
          },
          "& .MuiTablePagination-root": {
            color: "#F9BE70"
          }
        }
      }
    }
  }
});
