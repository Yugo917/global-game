import Box from "@mui/material/Box";
import Drawer from "@mui/material/Drawer";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import { Tooltip } from "@mui/material";
import { useNavigate } from "react-router";
import { routesDatas as constRoutesDatas } from "../constants/RoutesData";

interface IProps {
  isOpen: boolean;
  onClose: () => void;
}

export function NavBar(props: IProps) {
  const routeDatas = constRoutesDatas;
  const { isOpen, onClose } = props;
  const navigate = useNavigate();

  const list = () => (
    <Box
      role="presentation"
    >
      <List>
        {routeDatas.map((obj, index) => (
          <ListItem
            key={obj.path}
            onClick={() => { navigate(obj.path); onClose(); }}
            style={{ padding: "0px" }}
          >
            <ListItemButton>
              <Tooltip title={obj.name} placement="right">
                <ListItemIcon style={{ minWidth: "0px" }}>
                  {obj.icon}
                </ListItemIcon>
              </Tooltip>
            </ListItemButton>
          </ListItem>
        ))}
      </List>

    </Box>
  );

  return (
    <Drawer
      anchor="left"
      open={isOpen}
      onClose={onClose}
    >
      {list()}
    </Drawer>
  );
}
