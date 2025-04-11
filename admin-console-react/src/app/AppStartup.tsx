import { useMemo } from "react";
import { ThemeProvider } from "@mui/material";
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns";
import { LocalizationProvider } from "@mui/x-date-pickers";
import { GlobalGameClient } from "../mock/clients/GlobalGameClient";
import { App } from "./application/App";
import { GlobalGameClientContext } from "./application/core/ioc/GlobalGameClient";
import { darkTheme } from "./application/theme/darkTheme";
import { GlobalGameApiV1 } from "./clients/v1/GlobalGameApiV1";
import { ff7Theme } from "./application/theme/ff7Theme";
import { bestTheme } from "./application/theme/bestTheme";
import { gorgeousTheme } from "./application/theme/gorgeousTheme";
import { matrixTheme } from "./application/theme/matrixTheme";
import { darkOrangeTheme } from "./application/theme/darkOrangeTheme";
import { GlobalGameApiV1Context } from "./application/core/ioc/GlobalGameApi";
import "./common/extentions/YupExtentions";

export const AppStartup = () => {
  const globalGameClient = useMemo(() => new GlobalGameClient(1000), []);
  const globalGameApiV1 = useMemo(() => new GlobalGameApiV1("http://localhost:3000"), []);
  return (
    <LocalizationProvider dateAdapter={AdapterDateFns}>
      <ThemeProvider theme={darkTheme}>
        <GlobalGameApiV1Context.Provider value={globalGameApiV1}>

          <GlobalGameClientContext.Provider value={globalGameClient}>
            <App />
          </GlobalGameClientContext.Provider>
        </GlobalGameApiV1Context.Provider>
      </ThemeProvider>
    </LocalizationProvider>
  );
};
