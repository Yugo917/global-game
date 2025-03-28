import { Paper } from "@mui/material";

interface IProps {
  children: React.ReactNode;
}
export function ContentLayout(props: IProps) {
  const { children } = props;
  return (
    <Paper style={{ marginTop: 10 }}>
      {children}
    </Paper>
  );
}
