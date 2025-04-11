import {
  DataGrid, GridColDef, GridRenderCellParams, GridRowId, GridValueFormatterParams, GridValueGetterParams,
  useGridApiRef
} from "@mui/x-data-grid";
import moment from "moment";
import { useEffect, useState } from "react";
import { IconButton } from "@mui/material";
import ReactCountryFlag from "react-country-flag";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import EditIcon from "@mui/icons-material/Edit";
import VisibilityIcon from "@mui/icons-material/Visibility";
import * as yup from "yup";
import BlockIcon from "@mui/icons-material/Block";
import HideSourceIcon from "@mui/icons-material/HideSource";
import { DatagridToolbar } from "../../../common/components/mui/dataGrid/DatagridToolbar";
import { IDataGridRowsInfos } from "../../../common/components/mui/dataGrid/GridToolBarGridRowInfos";
import { useGlobalGameApiV1 } from "../../core/ioc/GlobalGameApi";
import { IPlayerDtoV1 } from "../../../clients/v1/ModelsApiV1";
import { FormSearchDialog } from "../../../common/components/mui/dialog/FormSearchDialog";
import { ActionMenu, IActionMenuItem } from "../../../common/components/navigation/ActionsMenu";
import { ObjectViewerDialog } from "../../../common/components/mui/dialog/ObjectViewerDialog";
import { IPlayerSearchCriteria } from "./models/PlayerSearchCriteria";
import { PlayerMapper } from "./models/PlayerMapper";
import { GGAvatar } from "../../../common/components/Avatar";
import { ObjectEditerDialog } from "../../../common/components/mui/dialog/ObjectEditerDialog";
import { alertNotImplemented } from "../../../common/helper/NotImplementedHelper";
import { BooleanChips, InvertedBooleanChips } from "../../../common/components/mui/dataGrid/columns/BooleanChips";

enum playerManagerAction {
  view = "view",
  edit = "edit",
  ban = "ban",
  deactive = "deactive",
  banAll = "banAll",
  deactiveAll = "deactiveAll",
}

export function PlayerManager() {
  // hooks
  const globalGameClient = useGlobalGameApiV1();
  // const players = PlayerFactory.CreatePlayers(10);
  const [players, setPlayers] = useState<IPlayerDtoV1[]>([]);
  const [searchCriteria, setSearchCriteria] = useState<IPlayerSearchCriteria | undefined>(undefined);
  const [openSearchDialog, setOpenSearchDialog] = useState(false);
  const [selectedRowData, setSelectedRowData] = useState<IPlayerDtoV1 | undefined>(undefined);
  const [checkedRowDataIds, setCheckedRowDataIdsctedRowData] = useState<GridRowId[] | undefined>(undefined);
  const [actionMenuAnchor, setActionMenuAnchor] = useState<null | HTMLElement>(null);
  const [gridRowsInfos, setGridRowsInfos] = useState<IDataGridRowsInfos>({ loadedRowCount: 0, filteredRowCount: 0, checkedRowCount: 0 });
  const [isLoading, setIsLoading] = useState(false);
  const [openPlayerViewDialog, setOpenPlayerViewDialog] = useState(false);
  const [openPlayerEditorDialog, setOpenPlayerEditorDialog] = useState(false);
  const apiRef = useGridApiRef();

  useEffect(() => {
    loadPlayers();
  }, [searchCriteria]);

  const loadPlayers = async () => {
    try {
      setIsLoading(true);
      if (searchCriteria) {
        console.log("searchCriteria", searchCriteria);
        const searchCriteriaDto = PlayerMapper.toPlayerSearchCriteriaDtoV1(searchCriteria);
        console.log("searchCriteriaDto", searchCriteriaDto);
        const res = await globalGameClient.searchPlayer(searchCriteriaDto);
        setPlayers(res);
        setGridRowsInfos(prev => ({
          ...prev,
          loadedRowCount: res.length
        }));
      }
    } catch (error) {
      console.log(error);
    } finally { setIsLoading(false); }
  };

  const onActionClicked = (action: playerManagerAction, player: IPlayerDtoV1) => {
    if (action === playerManagerAction.view) {
      setOpenPlayerViewDialog(true);
    } else if (action === playerManagerAction.edit) {
      setOpenPlayerEditorDialog(true);
    } else {
      alertNotImplemented(player);
    }
    onRowActionMenuClose();
  };

  // __ Grid
  const columns: GridColDef[] = [
    {
      headerName: " ",
      field: "icons",
      width: 50,
      renderCell: (params: GridRenderCellParams) => (
        <IconButton
          aria-label="actions"
          size="small"
          onClick={(event: React.MouseEvent<HTMLButtonElement>) => {
            console.log("params.row", params.row);
            setSelectedRowData(params.row as IPlayerDtoV1);
            onRowActionMenuOpen(event);
          }}
        ><MoreVertIcon />
        </IconButton>
      )
    },
    {
      field: "id", headerName: "Id", flex: 1, valueGetter: (params: GridValueGetterParams) => (params.row as IPlayerDtoV1).id
    },
    {
      field: "name", headerName: "Name", flex: 1, valueGetter: (params: GridValueGetterParams) => (params.row as IPlayerDtoV1).name
    },
    {
      field: "email", headerName: "Email", flex: 1, valueGetter: (params: GridValueGetterParams) => (params.row as IPlayerDtoV1).email
    },
    {
      field: "avatarName",
      headerName: "Avatar",
      flex: 1,
      valueGetter: (params: GridValueGetterParams) => (params.row as IPlayerDtoV1).avatarName,
      renderCell: (params: GridRenderCellParams) => (
        <div style={{ scale: "0.5" }}><GGAvatar avatarName={params.value.toString()} size={64} /></div>
      )
    },
    {
      field: "country",
      headerName: "Country",
      flex: 1,
      valueGetter: (params: GridValueGetterParams) => (params.row as IPlayerDtoV1).country,
      renderCell: (params: GridRenderCellParams) => (
        <ReactCountryFlag
          countryCode={params.value.toString()}
          svg
          style={{
            width: "4em",
            height: "4em"
          }}
          title={params.value.toString()}
        />
      )
    },
    {
      field: "isActive",
      headerName: "IsActive",
      flex: 1,
      valueGetter: (params: GridValueGetterParams) => (params.row as IPlayerDtoV1).isActive,
      renderCell: (params: GridRenderCellParams) => (<BooleanChips value={params.value as boolean} />)

    },
    {
      field: "isBanned",
      headerName: "IsBanned",
      flex: 1,
      valueGetter: (params: GridValueGetterParams) => (params.row as IPlayerDtoV1).isBanned,
      renderCell: (params: GridRenderCellParams) => (<BooleanChips value={params.value as boolean} />)

    },
    {
      field: "updateDate", headerName: "UpdateDate", width: 200, valueFormatter: (params: GridValueFormatterParams) => moment(params.value).local().format("YYYY-MM-DD hh:mm:ss a")
    },
    {
      field: "creationDate", headerName: "CreationDate", width: 200, valueFormatter: (params: GridValueFormatterParams) => moment(params.value).local().format("YYYY-MM-DD hh:mm:ss a")
    }
  ];

  // __ Grid ToolBar
  const toolbarActions: IActionMenuItem[] = [
    {
      name: "ban-all",
      label: "Ban ALl",
      icon: BlockIcon,
      onClick: () => { alertNotImplemented(checkedRowDataIds); }
    },
    {
      name: "deactive-all",
      label: "Deactive All",
      icon: HideSourceIcon,
      onClick: () => { alertNotImplemented(checkedRowDataIds); }
    }
  ];

  // __ Search Dialog
  const toggleSearchDialog = () => {
    setOpenSearchDialog(!openSearchDialog);
  };

  const formId = "search-dialog-form";

  const schema = yup.object({
    ids: yup.string().notRequired().uuids(),
    names: yup.string().notRequired(),
    emails: yup.string().notRequired().emails(),
    thirdPartyIds: yup.string().notRequired().uuids(),
    thirdPartyNames: yup.string().notRequired(),
    thirdPartyEmails: yup.string().notRequired().emails(),
    creationDateStart: yup.date().notRequired(),
    creationDateEnd: yup.date().notRequired(),
    nbRows: yup.number().required()
  });

  const defaultSearchValue = {

    ids: null,
    names: null,
    emails: null,
    thirdPartyIds: null,
    thirdPartyNames: null,
    thirdPartyEmails: null,
    creationDateStart: null,
    creationDateEnd: null,
    nbRows: 200
  };

  // __ Row Actions
  const onRowActionMenuOpen = (event: React.MouseEvent<HTMLButtonElement>) => {
    setActionMenuAnchor(event.currentTarget);
  };
  const onRowActionMenuClose = () => {
    setActionMenuAnchor(null);
  };

  const rowActions: IActionMenuItem[] = [
    {
      name: "view",
      label: "View",
      icon: VisibilityIcon,
      onClick: () => { onActionClicked(playerManagerAction.view, selectedRowData as IPlayerDtoV1); }
    },
    {
      name: "edit",
      label: "Edit",
      icon: EditIcon,
      onClick: () => { onActionClicked(playerManagerAction.edit, selectedRowData as IPlayerDtoV1); }
    },
    {
      name: "ban",
      label: "Ban",
      icon: BlockIcon,
      onClick: () => { onActionClicked(playerManagerAction.ban, selectedRowData as IPlayerDtoV1); }
    },
    {
      name: "deactive",
      label: "Deactive",
      icon: HideSourceIcon,
      onClick: () => { onActionClicked(playerManagerAction.deactive, selectedRowData as IPlayerDtoV1); }
    }

  ];

  return (
    <>
      {/* SearchDialog */}
      <FormSearchDialog
        title="Player search criteria"
        formId={formId}
        schema={schema}
        searchCriteria={searchCriteria ?? defaultSearchValue as any}
        open={openSearchDialog}
        onSearchClick={s => { toggleSearchDialog(); setSearchCriteria(s); }}
        onCancelClick={() => { toggleSearchDialog(); }}
      />

      {/* Action menu */}
      {selectedRowData && (
        <ActionMenu
          anchorEl={actionMenuAnchor}
          actionMenuItems={rowActions}
          onClose={onRowActionMenuClose}
        />
      )}

      {/* Viewer */}
      {selectedRowData && (
        <ObjectViewerDialog
          name="player"
          object={selectedRowData}
          open={openPlayerViewDialog}
          onClose={() => setOpenPlayerViewDialog(false)}
        />
      )}

      {/* Editor */}
      {selectedRowData && (
        <ObjectEditerDialog
          title="player"
          ojectName="player"
          object={selectedRowData}
          open={openPlayerEditorDialog}
          onUpdateClick={obj => { alertNotImplemented(obj); setOpenPlayerEditorDialog(false); }}
          onCloseClick={() => setOpenPlayerEditorDialog(false)}
        />
      )}

      {/* Grid View */}
      <DataGrid
        apiRef={apiRef}
        autoHeight
        loading={isLoading}
        rows={players}
        columns={columns}
        density="standard"
        initialState={{
          pagination: {
            paginationModel: {
              pageSize: 50
            }
          }
        }}
        pageSizeOptions={[50]}
        checkboxSelection
        disableRowSelectionOnClick
        getRowId={row => (row as IPlayerDtoV1).id}
        slots={{ toolbar: DatagridToolbar }}
        slotProps={{
          toolbar: {
            actions: toolbarActions, gridRowsInfos, onSearchClick: toggleSearchDialog
          }
        }}
        onRowSelectionModelChange={s => {
          setCheckedRowDataIdsctedRowData(s);
          setGridRowsInfos(prev => ({
            ...prev,
            checkedRowCount: s.length
          }));
        }}
      />
    </>

  );
}
