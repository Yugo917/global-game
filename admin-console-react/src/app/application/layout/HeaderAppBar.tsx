import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import IconButton from "@mui/material/IconButton";
import MenuIcon from "@mui/icons-material/Menu";
import { Breadcrumbs } from "@mui/material";
import { useLocation } from "react-router";
import { routesDatas } from "../constants/RoutesData";

interface IProps {
  onMenuButtonClick: () => void;
}

export function HeaderAppBar(props: IProps) {
  const { onMenuButtonClick } = props;

  const location = useLocation();
  const breadcrumbs = location.pathname.split("/");
  breadcrumbs.forEach(f => f.replace("/", ""));
  const iconLocation = routesDatas.find(f => location.pathname === f.path)?.icon;

  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static">
        <Toolbar variant="dense">
          <IconButton
            size="large"
            edge="start"
            color="inherit"
            aria-label="menu"
            sx={{ mr: 2 }}
            onClick={() => onMenuButtonClick()}
          >
            <MenuIcon />
          </IconButton>
          <Box sx={{
            display: "flex", alignItems: "center", mr: 1
          }}
          >
            {iconLocation}
          </Box>

          <Breadcrumbs aria-label="breadcrumb">
            {breadcrumbs.map(obj => obj.length !== 0 && (
              <Typography key={obj}>/ {obj}</Typography>
            ))}
          </Breadcrumbs>
        </Toolbar>
      </AppBar>
    </Box>
  );
}
