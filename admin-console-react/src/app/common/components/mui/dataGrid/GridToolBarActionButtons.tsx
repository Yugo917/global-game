import {
  Button,
  Menu, MenuItem, PopoverOrigin, Theme, Tooltip
} from "@mui/material";
import { makeStyles } from "@mui/styles";
import { createElement } from "react";
import { IActionMenuItem } from "../../navigation/ActionsMenu";

const useStyles = makeStyles((theme: Theme) => ({
  icon: {
    paddingRight: theme.spacing(1)
  }
}));

interface IProps {
  actions: IActionMenuItem[];
}

export function GridToolBarActionButtons(props: IProps) {
  const { actions } = props;
  // const classes = getStyles(props);
  const classes = useStyles(props);
  return (
    <>
      {

        actions.map(item => (
          <Tooltip title={item.label} placement="bottom">
            <Button size="small" id={item.name} onClick={item.onClick} startIcon={createElement(item.icon)}>
              {item.label}
            </Button>
          </Tooltip>
        ))
      }
    </>
  );
}
