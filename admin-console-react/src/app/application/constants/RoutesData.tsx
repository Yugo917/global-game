import SportsEsportsIcon from "@mui/icons-material/SportsEsports";
import SaveIcon from "@mui/icons-material/Save";
import HomeIcon from "@mui/icons-material/Home";
import GroupsIcon from "@mui/icons-material/Groups";
import { WipComponent } from "../../common/components/WipComponent";
import { PlayerManager } from "../content/players/PlayerManager";

export class Routes {
  public static readonly Home: string = "/";

  public static readonly GameManager: string = "/games-manager";

  public static readonly PlayerManager: string = "/players-manager";

  public static readonly SaveGameManager: string = "/save-game-manager";
}

export interface IRouteData {
  icon: JSX.Element;
  name: string;
  path: string;
  component: JSX.Element;
}

export const routesDatas: IRouteData[] = [
  {
    icon: <HomeIcon />,
    name: "Home",
    path: Routes.Home,
    component: <WipComponent />
  },
  {
    icon: <SportsEsportsIcon />,
    name: "GameManager",
    path: Routes.GameManager,
    component: <WipComponent />
  },
  {
    icon: <GroupsIcon />,
    name: "PlayerManager",
    path: Routes.PlayerManager,
    component: <PlayerManager />
  },
  {
    icon: <SaveIcon />,
    name: "SaveGameManager",
    path: Routes.SaveGameManager,
    component: <WipComponent />
  }

];
