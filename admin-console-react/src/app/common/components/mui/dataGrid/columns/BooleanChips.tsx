import { Chip } from "@mui/material";

export interface IProps {
  value: Boolean,
}

export const BooleanChips = (props: IProps) => (
  <Chip label={props.value.toString()} color={props.value ? "success" : "error"} />
);

export const InvertedBooleanChips = (props: IProps) => (
  <Chip label={props.value.toString()} color={props.value ? "error" : "success"} />
);
