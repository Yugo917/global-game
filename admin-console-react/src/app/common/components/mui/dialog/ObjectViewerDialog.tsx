import {
  Box,
  Dialog, DialogContent, DialogTitle, IconButton, Typography, useTheme
} from "@mui/material";
import ReactJson from "react-json-view-ts";
import CloseIcon from "@mui/icons-material/Close";
import DownloadIcon from "@mui/icons-material/Download";
import { ActionHelper } from "../../../helper/ActionHelper";

interface Iprops {
  name: string;
  object: Object;
  open: boolean;
  onClose: () => void;
}

export function ObjectViewerDialog(props: Iprops) {
  const {
    name, object, open, onClose
  } = props;
  const theme = useTheme();
  return (
    <Dialog open={open} onClose={onClose} fullWidth>
      <DialogTitle>
        <Typography variant="h6" color="primary">
          {name}
        </Typography>

        <Box sx={{
          position: "absolute", right: 8, top: 8, display: "flex", gap: 1
        }}
        >
          <IconButton
            aria-label="download"
            onClick={() => {
              ActionHelper.DownloadFile(
                `${name}.json`,
                JSON.stringify(object)
              );
            }}
          >
            <DownloadIcon />
          </IconButton>

          <IconButton
            aria-label="close"
            onClick={onClose}
            sx={{
              color: theme.palette.primary.main
            }}
          >
            <CloseIcon />
          </IconButton>

        </Box>

      </DialogTitle>
      <DialogContent dividers>
        <ReactJson
          name={name}
          src={object}
          theme={theme.palette.mode === "dark" ? "grayscale" : "grayscale:inverted"}
          collapsed={false}
          // collapseStringsAfter={15}
          onAdd={false}
          onEdit={(false)}
          onDelete={false}
          displayObjectSize={false}
          enableClipboard
          indentWidth={4}
          displayDataTypes={false}
          iconStyle="circle"
        />
      </DialogContent>
    </Dialog>
  );
}
