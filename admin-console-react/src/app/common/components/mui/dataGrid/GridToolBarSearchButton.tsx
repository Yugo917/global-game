import { Button } from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";

interface IProps {
  onClick: () => void;
}

export function GridToolBarSearchButton(props: IProps) {
  const { onClick } = props;
  return (
    <Button size="small" startIcon={<SearchIcon />} onClick={onClick}>
      Search
    </Button>
  );
}
