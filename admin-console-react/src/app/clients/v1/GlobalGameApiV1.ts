import axios, { AxiosInstance } from "axios";
import dayjs from "dayjs";
import {
  IPlayerDtoV1, IPlayerCreateDtoV1, IPlayerUpdateDtoV1, IPlayerSearchCriteriaDtoV1,
  IGameDtoV1,
  IGameSearchCriteriaDtoV1,
  IGameCreateDtoV1,
  IGameUpdateDtoV1
} from "./ModelsApiV1";

export interface IGlobalGameApiV1 {
  getPlayers(): Promise<IPlayerDtoV1[]>;
  getPlayerById(playerId: string): Promise<IPlayerDtoV1>;
  searchPlayer(searchCriteria: IPlayerSearchCriteriaDtoV1): Promise<IPlayerDtoV1[]>;
  createPlayer(playerData: IPlayerCreateDtoV1): Promise<IPlayerDtoV1>;
  updatePlayer(playerId: string, playerData: IPlayerUpdateDtoV1): Promise<IPlayerDtoV1>;
  deletePlayer(playerId: string): Promise<void>;
  deactivatePlayer(playerId: string): Promise<IPlayerDtoV1>;
  banPlayer(playerId: string): Promise<IPlayerDtoV1>;

  getGames(): Promise<IGameDtoV1[]>;
  getGameById(gameId: string): Promise<IGameDtoV1>;
  searchGame(searchCriteria: IGameSearchCriteriaDtoV1): Promise<IGameDtoV1[]>;
  createGame(gameData: IGameCreateDtoV1): Promise<IGameDtoV1>;
  updateGame(gameId: string, gameData: IGameUpdateDtoV1): Promise<IGameDtoV1>;
  deleteGame(gameId: string): Promise<void>;
  deactivateGame(gameId: string): Promise<IGameDtoV1>;
}

export class GlobalGameApiV1 implements IGlobalGameApiV1 {
  private readonly axiosInstance: AxiosInstance;

  constructor(baseURL: string) {
    this.axiosInstance = axios.create({
      baseURL,
      headers: {
        "Content-Type": "application/json"
      }
    });
  }

  private static playerParseDates(player: IPlayerDtoV1): IPlayerDtoV1 {
    const playerDated: IPlayerDtoV1 = {
      ...player,
      creationDate: dayjs(player.creationDate).toDate(),
      updateDate: dayjs(player.updateDate).toDate()
    };
    return playerDated;
  }

  private static gameParseDates(game: IGameDtoV1): IGameDtoV1 {
    return {
      ...game,
      creationDate: dayjs(game.creationDate).toDate(),
      updateDate: dayjs(game.updateDate).toDate()
    };
  }

  // Players
  public async getPlayers(): Promise<IPlayerDtoV1[]> {
    const response = await this.axiosInstance.get<IPlayerDtoV1[]>("/players");
    return response.data.map(GlobalGameApiV1.playerParseDates);
  }

  public async getPlayerById(playerId: string): Promise<IPlayerDtoV1> {
    const response = await this.axiosInstance.get<IPlayerDtoV1>(`/players/${playerId}`);
    return GlobalGameApiV1.playerParseDates(response.data);
  }

  public async searchPlayer(searchCriteria: IPlayerSearchCriteriaDtoV1): Promise<IPlayerDtoV1[]> {
    const response = await this.axiosInstance.post<IPlayerDtoV1[]>("/players/search/", searchCriteria);
    return response.data.map(GlobalGameApiV1.playerParseDates);
  }

  public async createPlayer(playerData: IPlayerCreateDtoV1): Promise<IPlayerDtoV1> {
    const response = await this.axiosInstance.post<IPlayerDtoV1>("/players", playerData);
    return GlobalGameApiV1.playerParseDates(response.data);
  }

  public async updatePlayer(playerId: string, playerData: IPlayerUpdateDtoV1): Promise<IPlayerDtoV1> {
    const response = await this.axiosInstance.put<IPlayerDtoV1>(`/players/${playerId}`, playerData);
    return GlobalGameApiV1.playerParseDates(response.data);
  }

  public async deletePlayer(playerId: string): Promise<void> {
    await this.axiosInstance.delete(`/players/${playerId}`);
  }

  public async deactivatePlayer(playerId: string): Promise<IPlayerDtoV1> {
    const response = await this.axiosInstance.delete(`/players/deactivate/${playerId}`);
    return GlobalGameApiV1.playerParseDates(response.data);
  }

  public async banPlayer(playerId: string): Promise<IPlayerDtoV1> {
    const response = await this.axiosInstance.delete(`/players/ban/${playerId}`);
    return GlobalGameApiV1.playerParseDates(response.data);
  }

  // Games
  public async getGames(): Promise<IGameDtoV1[]> {
    const response = await this.axiosInstance.get<IGameDtoV1[]>("/games");
    return response.data.map(GlobalGameApiV1.gameParseDates);
  }

  public async getGameById(gameId: string): Promise<IGameDtoV1> {
    const response = await this.axiosInstance.get<IGameDtoV1>(`/games/${gameId}`);
    return GlobalGameApiV1.gameParseDates(response.data);
  }

  public async searchGame(searchCriteria: IGameSearchCriteriaDtoV1): Promise<IGameDtoV1[]> {
    const response = await this.axiosInstance.post<IGameDtoV1[]>("/games/search", searchCriteria);
    return response.data.map(GlobalGameApiV1.gameParseDates);
  }

  public async createGame(gameData: IGameCreateDtoV1): Promise<IGameDtoV1> {
    const response = await this.axiosInstance.post<IGameDtoV1>("/games", gameData);
    return GlobalGameApiV1.gameParseDates(response.data);
  }

  public async updateGame(gameId: string, gameData: IGameUpdateDtoV1): Promise<IGameDtoV1> {
    const response = await this.axiosInstance.put<IGameDtoV1>(`/games/${gameId}`, gameData);
    return GlobalGameApiV1.gameParseDates(response.data);
  }

  public async deleteGame(gameId: string): Promise<void> {
    await this.axiosInstance.delete(`/games/${gameId}`);
  }

  public async deactivateGame(gameId: string): Promise<IGameDtoV1> {
    const response = await this.axiosInstance.patch<IGameDtoV1>(`/games/deactivate/${gameId}`);
    return GlobalGameApiV1.gameParseDates(response.data);
  }
}
