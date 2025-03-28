import { Route, Routes } from "react-router";
import { IRouteData } from "../constants/RoutesData";

interface IProps {
  routesDatas: IRouteData[];
}

export function Switcher(props: IProps) {
  const { routesDatas } = props;
  return (
    <Routes>
      {routesDatas.map(obj => (
        <Route key={obj.path} path={obj.path} element={obj.component} />
      ))}
    </Routes>
  );
}
