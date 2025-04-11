import {
  DataGrid, GridColDef, GridRenderCellParams, GridRowId, GridValueFormatterParams, useGridApiRef
} from "@mui/x-data-grid";
import { useEffect, useState } from "react";
import { IconButton } from "@mui/material";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import VisibilityIcon from "@mui/icons-material/Visibility";
import EditIcon from "@mui/icons-material/Edit";
import HideSourceIcon from "@mui/icons-material/HideSource";
import moment from "moment";
import * as yup from "yup";

import { useGlobalGameApiV1 } from "../../core/ioc/GlobalGameApi";
import { IGameDtoV1 } from "../../../clients/v1/ModelsApiV1";
import { IActionMenuItem, ActionMenu } from "../../../common/components/navigation/ActionsMenu";
import { ObjectViewerDialog } from "../../../common/components/mui/dialog/ObjectViewerDialog";
import { ObjectEditerDialog } from "../../../common/components/mui/dialog/ObjectEditerDialog";
import { FormSearchDialog } from "../../../common/components/mui/dialog/FormSearchDialog";
import { DatagridToolbar } from "../../../common/components/mui/dataGrid/DatagridToolbar";
import { IDataGridRowsInfos } from "../../../common/components/mui/dataGrid/GridToolBarGridRowInfos";
import { alertNotImplemented } from "../../../common/helper/NotImplementedHelper";
import { IGameSearchCriteria } from "./models/GameSearchCriteria";
import { GameMapper } from "./models/GameMapper";
import { BooleanChips } from "../../../common/components/mui/dataGrid/columns/BooleanChips";

enum gameManagerAction {
  view = "view",
  edit = "edit",
  deactive = "deactive",
}

export function GameManager() {
  const globalGameClient = useGlobalGameApiV1();

  const [games, setGames] = useState<IGameDtoV1[]>([]);
  const [searchCriteria, setSearchCriteria] = useState<IGameSearchCriteria | undefined>(undefined);
  const [selectedRowData, setSelectedRowData] = useState<IGameDtoV1 | undefined>(undefined);
  const [actionMenuAnchor, setActionMenuAnchor] = useState<null | HTMLElement>(null);
  const [checkedRowDataIds, setCheckedRowDataIds] = useState<GridRowId[]>([]);
  const [gridRowsInfos, setGridRowsInfos] = useState<IDataGridRowsInfos>({ loadedRowCount: 0, filteredRowCount: 0, checkedRowCount: 0 });
  const [isLoading, setIsLoading] = useState(false);
  const [openSearchDialog, setOpenSearchDialog] = useState(false);
  const [openGameViewDialog, setOpenGameViewDialog] = useState(false);
  const [openGameEditorDialog, setOpenGameEditorDialog] = useState(false);
  const apiRef = useGridApiRef();

  useEffect(() => {
    loadGames();
  }, [searchCriteria]);

  const loadGames = async () => {
    try {
      setIsLoading(true);
      if (searchCriteria) {
        const searchCriteriaDto = GameMapper.toGameSearchCriteriaDtoV1(searchCriteria);
        const res = await globalGameClient.searchGame(searchCriteriaDto);
        setGames(res);
        console.log("res", res);
        setGridRowsInfos(prev => ({
          ...prev,
          loadedRowCount: res.length
        }));
      }
    } catch (error) {
      console.error(error);
    } finally {
      setIsLoading(false);
    }
  };

  const onActionClicked = (action: gameManagerAction, game: IGameDtoV1) => {
    if (action === gameManagerAction.view) {
      setOpenGameViewDialog(true);
    } else if (action === gameManagerAction.edit) {
      setOpenGameEditorDialog(true);
    } else {
      alertNotImplemented(game);
    }
    onRowActionMenuClose();
  };

  const onRowActionMenuOpen = (event: React.MouseEvent<HTMLButtonElement>) => {
    setActionMenuAnchor(event.currentTarget);
  };

  const onRowActionMenuClose = () => {
    setActionMenuAnchor(null);
  };

  const columns: GridColDef[] = [
    {
      headerName: " ",
      field: "icons",
      width: 50,
      renderCell: (params: GridRenderCellParams) => (
        <IconButton
          size="small"
          onClick={event => {
            setSelectedRowData(params.row as IGameDtoV1);
            onRowActionMenuOpen(event);
          }}
        >
          <MoreVertIcon />
        </IconButton>
      )
    },
    { field: "id", headerName: "Id", flex: 1 },
    { field: "name", headerName: "Name", flex: 1 },
    {
      field: "isActive",
      headerName: "Is Active",
      flex: 1,
      renderCell: (params: GridRenderCellParams) => (<BooleanChips value={params.value as boolean} />)
    },
    {
      field: "updateDate",
      headerName: "Update Date",
      width: 200,
      valueFormatter: (params: GridValueFormatterParams) => moment(params.value).local().format("YYYY-MM-DD hh:mm:ss a")
    },
    {
      field: "creationDate",
      headerName: "Creation Date",
      width: 200,
      valueFormatter: (params: GridValueFormatterParams) => moment(params.value).local().format("YYYY-MM-DD hh:mm:ss a")
    }
  ];

  const toolbarActions: IActionMenuItem[] = [
    {
      name: "deactive-all",
      label: "Deactivate All",
      icon: HideSourceIcon,
      onClick: () => { alertNotImplemented(checkedRowDataIds); }
    }
  ];

  const rowActions: IActionMenuItem[] = [
    {
      name: "view",
      label: "View",
      icon: VisibilityIcon,
      onClick: () => { onActionClicked(gameManagerAction.view, selectedRowData as IGameDtoV1); }
    },
    {
      name: "edit",
      label: "Edit",
      icon: EditIcon,
      onClick: () => { onActionClicked(gameManagerAction.edit, selectedRowData as IGameDtoV1); }
    },
    {
      name: "deactive",
      label: "Deactivate",
      icon: HideSourceIcon,
      onClick: () => { onActionClicked(gameManagerAction.deactive, selectedRowData as IGameDtoV1); }
    }
  ];

  const schema = yup.object({
    ids: yup.string().notRequired().uuids(),
    names: yup.string().notRequired(),
    appStores: yup.string().notRequired(),
    creationDateStart: yup.date().notRequired(),
    creationDateEnd: yup.date().notRequired(),
    nbRows: yup.number().required()
  });

  const defaultSearchValue = {
    ids: null,
    names: null,
    appStores: null,
    creationDateStart: null,
    creationDateEnd: null,
    nbRows: 200
  };

  return (
    <>
      <FormSearchDialog
        title="Game search criteria"
        formId="game-search-dialog-form"
        schema={schema}
        searchCriteria={searchCriteria ?? defaultSearchValue as any}
        open={openSearchDialog}
        onSearchClick={s => { setOpenSearchDialog(false); setSearchCriteria(s); }}
        onCancelClick={() => setOpenSearchDialog(false)}
      />

      {selectedRowData && (
        <ActionMenu
          anchorEl={actionMenuAnchor}
          actionMenuItems={rowActions}
          onClose={onRowActionMenuClose}
        />
      )}

      {selectedRowData && (
        <ObjectViewerDialog
          name="game"
          object={selectedRowData}
          open={openGameViewDialog}
          onClose={() => setOpenGameViewDialog(false)}
        />
      )}

      {selectedRowData && (
        <ObjectEditerDialog
          title="game"
          ojectName="game"
          object={selectedRowData}
          open={openGameEditorDialog}
          onUpdateClick={obj => { alertNotImplemented(obj); setOpenGameEditorDialog(false); }}
          onCloseClick={() => setOpenGameEditorDialog(false)}
        />
      )}

      <DataGrid
        apiRef={apiRef}
        autoHeight
        loading={isLoading}
        rows={games}
        columns={columns}
        density="standard"
        initialState={{ pagination: { paginationModel: { pageSize: 50 } } }}
        pageSizeOptions={[50]}
        checkboxSelection
        disableRowSelectionOnClick
        getRowId={row => (row as IGameDtoV1).id}
        slots={{ toolbar: DatagridToolbar }}
        slotProps={{ toolbar: { actions: toolbarActions, gridRowsInfos, onSearchClick: () => setOpenSearchDialog(true) } }}
        onRowSelectionModelChange={s => {
          setCheckedRowDataIds(s);
          setGridRowsInfos(prev => ({
            ...prev,
            checkedRowCount: s.length
          }));
        }}
      />
    </>
  );
}
