import { IGlobalGameClient } from "../../app/clients/v2/GlobalGameClient";
import { IContestDto } from "../../app/clients/v2/models/Contest";
import { IGameDto } from "../../app/clients/v2/models/Game";
import { IGameSaveDataDto } from "../../app/clients/v2/models/GameSaveData";
import { ILeaderBoardDto } from "../../app/clients/v2/models/LeaderBoard";
import { IPlayerSearchCriteriaDto, IPlayerDto } from "../../app/clients/v2/models/Player";
import { AsyncHelper } from "../../app/common/helper/AsyncHelper";
import { GameFactory } from "../datas/GameFactory";
import { GameSaveDataFactory } from "../datas/GameSaveDataFactory";
import { PlayerFactory } from "../datas/PlayerFactory";

export class GlobalGameClient implements IGlobalGameClient {
  private readonly callDuration: number = 0;

  private readonly players: IPlayerDto[] = [];

  private readonly games: IGameDto[] = [];

  constructor(callDuration: number) {
    this.callDuration = callDuration;
    this.players = PlayerFactory.CreatePlayers(10);
    this.games = GameFactory.CreateGames(10);
  }

  public async getPlayers(searchCriteria: IPlayerSearchCriteriaDto): Promise<IPlayerDto[]> {
    await AsyncHelper.wait(this.callDuration);
    console.log(this.players);
    const res = this.players.filter(
      f => (
        (searchCriteria.id === undefined || searchCriteria.id === f.identifier.id)
        && (searchCriteria.name === undefined || searchCriteria.name === f.identifier.name)
        && (searchCriteria.email === undefined || searchCriteria.email === f.identifier.email)
        // && ((searchCriteria.creationDateStart == null) || (searchCriteria.creationDateStart != null && f.creationDate >= searchCriteria.creationDateStart))
        // && ((searchCriteria.creationDateEnd == null) || (searchCriteria.creationDateEnd != null && f.creationDate <= searchCriteria.creationDateEnd))
      )
    );
    console.log(res);
    return res;
  }

  public async getPlayerSavedGameDatas(idPlayer: string): Promise<IGameSaveDataDto[]> {
    await AsyncHelper.wait(this.callDuration);
    const res = GameSaveDataFactory.CreateGames(3, idPlayer);
    return res;
  }

  public async getContests(idGame: string): Promise<IContestDto[]> {
    await AsyncHelper.wait(this.callDuration);
    throw new Error("Method not implemented.");
  }

  public async getTop100LeaderBoard(idContests: string[]): Promise<ILeaderBoardDto> {
    await AsyncHelper.wait(this.callDuration);
    throw new Error("Method not implemented.");
  }

  public async getTopPlayerLeaderBoard(idContests: string[], idPlayer: string): Promise<ILeaderBoardDto> {
    await AsyncHelper.wait(this.callDuration);
    throw new Error("Method not implemented.");
  }

  public async getGames(): Promise<IGameDto[]> {
    await AsyncHelper.wait(this.callDuration);
    return this.games;
  }
}
