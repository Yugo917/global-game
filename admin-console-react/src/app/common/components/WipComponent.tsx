import ConstructionIcon from "@mui/icons-material/Construction";
import * as yup from "yup";
import { DynamicForm } from "./mui/form/DynamicForm";
import { GGAvatar } from "./Avatar";

export function WipComponent() {
  return (
    <>
      <ConstructionIcon />
      <GGAvatar avatarName="koala" size={64} />
    </>
  );
}
