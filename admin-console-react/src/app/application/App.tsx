import { BrowserRouter } from "react-router-dom";
import { Helmet } from "react-helmet";
import { useTheme } from "@mui/material";
import { MainLayout } from "./layout/MainLayout";

export function App() {
  const theme = useTheme();

  return (
    <>
      <Helmet>
        <title>ADMIN-CONSOLE</title>
        <style>{`body { background-color: ${theme.palette.background.default};color: ${theme.palette.text.primary} }`}</style>
      </Helmet>

      <BrowserRouter>
        <MainLayout />
      </BrowserRouter>
    </>
  );
}
