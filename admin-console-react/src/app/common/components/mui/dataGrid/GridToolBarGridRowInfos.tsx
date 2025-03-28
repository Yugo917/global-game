import { Chip, Tooltip } from "@mui/material";
import FilterAltIcon from "@mui/icons-material/FilterAlt";
import ChecklistIcon from "@mui/icons-material/Checklist";
import CloudDownloadIcon from "@mui/icons-material/CloudDownload";

export interface IDataGridRowsInfos {
  loadedRowCount: number;
  filteredRowCount: number;
  checkedRowCount: number;
}

export function GridToolBarGridRowInfos(props: IDataGridRowsInfos) {
  const { loadedRowCount, filteredRowCount, checkedRowCount: selectedRowCount } = props;
  return (
    <>
      <Tooltip title={`${loadedRowCount} loaded rows`}>
        <Chip
          icon={<CloudDownloadIcon />}
          label={loadedRowCount}
          variant="outlined"
          disabled
          size="small"
        />
      </Tooltip>

      <Tooltip title={`${filteredRowCount} filtered rows`}>
        <Chip
          icon={<FilterAltIcon />}
          label={filteredRowCount}
          variant="outlined"
          disabled
          size="small"
        />
      </Tooltip>

      <Tooltip title={`${selectedRowCount} selected rows`}>
        <Chip
          icon={<ChecklistIcon />}
          label={selectedRowCount}
          variant="outlined"
          disabled
          size="small"
        />
      </Tooltip>
    </>
  );
}
