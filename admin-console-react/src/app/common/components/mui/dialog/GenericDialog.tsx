import {
  Button, Dialog, DialogActions, DialogContent, DialogTitle,
  IconButton,
  Typography,
  useTheme
} from "@mui/material";
import { ReactNode } from "react";
import CloseIcon from "@mui/icons-material/Close";

type buttonVariant = "text" | "outlined" | "contained";

interface Iprops {
  title: ReactNode;
  content: ReactNode;
  actionButtons: { text: string, startIcon?: ReactNode, variant?: buttonVariant, onClick: () => void, type?: "submit" | "reset" | "button" | undefined, form?: string | undefined }[]
  open: boolean;
  onClose: () => void;
}

export function GenericDialog(props: Iprops) {
  const {
    title, content, open, actionButtons, onClose
  } = props;
  const theme = useTheme();
  return (
    <Dialog open={open} onClose={onClose} fullWidth>
      <DialogTitle>
        <Typography variant="h6" component="span" color="primary">
          {title}
        </Typography>
        <IconButton
          aria-label="close"
          onClick={onClose}
          sx={{
            position: "absolute",
            right: 8,
            top: 8,
            color: theme.palette.primary.main
          }}
        >
          <CloseIcon />
        </IconButton>

      </DialogTitle>
      <DialogContent dividers>
        {content}
      </DialogContent>
      <DialogActions>
        {actionButtons.slice(0).reverse().map(obj => (
          <Button key={obj.text} startIcon={obj.startIcon} onClick={obj.onClick} variant={obj.variant} type={obj.type} form={obj.form}>
            {obj.text}
          </Button>
        ))}
      </DialogActions>
    </Dialog>
  );
}
