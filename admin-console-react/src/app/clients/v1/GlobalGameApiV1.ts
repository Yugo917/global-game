import axios, { AxiosInstance } from "axios";
import dayjs from "dayjs";
import { IPlayerDtoV1, IPlayerCreateDtoV1, IPlayerUpdateDtoV1 } from "./ModelsApiV1";

export interface IGlobalGameApiV1 {
  getPlayers(): Promise<IPlayerDtoV1[]>;
  getPlayerById(playerId: string): Promise<IPlayerDtoV1>;
  createPlayer(playerData: IPlayerCreateDtoV1): Promise<IPlayerDtoV1>;
  updatePlayer(playerId: string, playerData: IPlayerUpdateDtoV1): Promise<IPlayerDtoV1>;
  deletePlayer(playerId: string): Promise<void>;
  deactivatePlayer(playerId: string): Promise<IPlayerDtoV1>;
  banPlayer(playerId: string): Promise<IPlayerDtoV1>;
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

  public async getPlayers(): Promise<IPlayerDtoV1[]> {
    const response = await this.axiosInstance.get<IPlayerDtoV1[]>("/players");
    return response.data.map(GlobalGameApiV1.playerParseDates);
  }

  public async getPlayerById(playerId: string): Promise<IPlayerDtoV1> {
    const response = await this.axiosInstance.get<IPlayerDtoV1>(`/players/${playerId}`);
    return GlobalGameApiV1.playerParseDates(response.data);
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
}
