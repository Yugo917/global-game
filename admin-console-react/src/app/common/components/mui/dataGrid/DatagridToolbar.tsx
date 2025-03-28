import {
  GridPagination,
  GridToolbarColumnsButton, GridToolbarDensitySelector, GridToolbarExport, GridToolbarFilterButton
} from "@mui/x-data-grid";
import { Divider, Theme } from "@mui/material";
import { makeStyles } from "@mui/styles";
import { GridToolBarSearchButton } from "./GridToolBarSearchButton";
import { GridToolBarGridRowInfos, IDataGridRowsInfos } from "./GridToolBarGridRowInfos";
import { IActionMenuItem } from "../../navigation/ActionsMenu";
import { GridToolBarActionButtons } from "./GridToolBarActionButtons";

const useStyles = makeStyles((theme: Theme) => ({
  toolbar: {
    paddingLeft: theme.spacing(2),
    justifyContent: "space-between",
    display: "flex",
    alignItems: "flex-start",
    flexWrap: "wrap"
  }
}));

interface IProps {
  gridRowsInfos: IDataGridRowsInfos;
  actions: IActionMenuItem[];
  onSearchClick: () => void;
}

export function DatagridToolbar(props: IProps) {
  const classes = useStyles();
  const {
    gridRowsInfos, onSearchClick
  } = props;
  return (
    <div className={classes.toolbar}>
      <div>
        <GridToolbarColumnsButton translate={undefined} />
        <GridToolbarFilterButton translate={undefined} />
        <GridToolbarDensitySelector translate={undefined} />
        <GridToolbarExport translate={undefined} />
        <GridToolBarGridRowInfos
          loadedRowCount={gridRowsInfos.loadedRowCount}
          filteredRowCount={gridRowsInfos.filteredRowCount}
          checkedRowCount={gridRowsInfos.checkedRowCount}
        />
      </div>
      <div>
        {gridRowsInfos.checkedRowCount > 0 && <GridToolBarActionButtons actions={props.actions} />}
        <GridToolBarSearchButton onClick={onSearchClick} />

      </div>
    </div>
  );
}
