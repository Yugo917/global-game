import { IPlayerDto, IPlayerSearchCriteriaDto } from "./models/Player";
import { IGameDto } from "./models/Game";
import { ILeaderBoardDto } from "./models/LeaderBoard";
import { IGameSaveDataDto } from "./models/GameSaveData";
import { IContestDto } from "./models/Contest";

export interface IGlobalGameClient {
  getPlayers(searchCriteria: IPlayerSearchCriteriaDto): Promise<IPlayerDto[]>;
  getPlayerSavedGameDatas(idPlayer: string): Promise<IGameSaveDataDto[]>;
  getGames(): Promise<IGameDto[]>;
  getContests(idGame: string): Promise<IContestDto[]>;
  getTop100LeaderBoard(idGame: string[]): Promise<ILeaderBoardDto>;
  getTopPlayerLeaderBoard(idGame: string[], idPlayer: string): Promise<ILeaderBoardDto>;
}
