import { createTheme } from "@mui/material/styles";

export const darkTheme = createTheme({
  palette: {
    mode: "dark",
    primary: { main: "#e67e22" },
    secondary: { main: "#ffca28" }
    // background: {
    //   default: "#313131",
    //   paper: "#262626"
    // },
    // text: {
    //   primary: "rgba(255, 255, 255, 0.75)"
    // }
  }
});
