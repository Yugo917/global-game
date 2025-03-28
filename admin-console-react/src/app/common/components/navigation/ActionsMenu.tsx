import {
  Menu, MenuItem, PopoverOrigin, Theme, Tooltip
} from "@mui/material";
import { makeStyles } from "@mui/styles";
import React from "react";

const useStyles = makeStyles((theme: Theme) => ({
  icon: {
    paddingRight: theme.spacing(1),
    color: theme.palette.primary.main
  }
}));

export interface IActionMenuItem {
  name: string;
  label: string;
  icon?: any;
  onClick: () => void;
}

interface IProps {
  anchorEl: null | HTMLElement;
  anchorOrigin?: PopoverOrigin;
  transformOrigin?: PopoverOrigin;
  actionMenuItems: IActionMenuItem[];
  onClose: () => void;
  iconsOnly?: boolean;
}

export function ActionMenu(props: IProps) {
  // Mui
  const classes = useStyles(props);
  const {
    anchorEl, anchorOrigin, transformOrigin, actionMenuItems, onClose, iconsOnly
  } = props;

  return (
    <Menu
      anchorEl={anchorEl}
      anchorOrigin={anchorOrigin}
      transformOrigin={transformOrigin}
      keepMounted
      open={Boolean(anchorEl)}
      onClose={onClose}
    >
      {actionMenuItems.map((item, key) => (
        <div key={item.name}>
          {iconsOnly ? (
            item.icon && (
              <Tooltip title={item.label} placement="right">
                <MenuItem onClick={item.onClick}>
                  {item.icon && React.createElement(item.icon, { className: classes.icon })}
                </MenuItem>
              </Tooltip>
            )
          ) : (
            <MenuItem onClick={item.onClick}>
              {item.icon && React.createElement(item.icon, { className: classes.icon })}
              {item.label}
            </MenuItem>
          )}
        </div>
      ))}
    </Menu>
  );
}
