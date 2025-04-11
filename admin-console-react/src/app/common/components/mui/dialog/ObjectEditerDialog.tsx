import ReactJson from "react-json-view-ts";
import { useState } from "react";
import { useTheme } from "@mui/material";
import { GenericDialog } from "./GenericDialog";

interface Iprops<T> {
  title: string;
  ojectName: string,
  object: T;
  open: boolean;
  onUpdateClick: (object: T) => void;
  onCloseClick: () => void;
}

export function ObjectEditerDialog<T>(props: Iprops<T>) {
  const {
    title, ojectName, object, open, onUpdateClick, onCloseClick
  } = props;
  const theme = useTheme();
  const [obj, setObj] = useState<T | undefined>(undefined);

  return (
    <GenericDialog
      title={title}
      content={(

        <ReactJson
          name={ojectName}
          src={obj ?? object as object}
          theme={theme.palette.mode === "dark" ? "grayscale" : "grayscale:inverted"}
          collapsed={false}
          // collapseStringsAfter={15}
          onAdd={false}
          onEdit={edit => { console.log("edit", edit); setObj(edit.updated_src as T); }}
          onDelete={false}
          displayObjectSize={false}
          enableClipboard
          indentWidth={4}
          displayDataTypes={false}
          iconStyle="circle"
        />

      )}
      actionButtons={
        [
          {
            text: "Update",
            onClick: () => onUpdateClick(obj as T),
            variant: "outlined"
          },
          {
            text: "Cancel",
            onClick: onCloseClick
          }
        ]
      }
      open={open}
      onClose={onCloseClick}
    />
  );
}
