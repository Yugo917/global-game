import Chance from "chance";
import { IGameSaveDataDto } from "../../app/clients/v2/models/GameSaveData";

export class GameSaveDataFactory {
  public static CreateGames(nbGameSaveDatas: number, idPlayer: string): IGameSaveDataDto[] {
    const chance = new Chance();
    const gameSaveDatas: IGameSaveDataDto[] = [];
    for (let index = 0; index < nbGameSaveDatas; index++) {
      gameSaveDatas.push({
        id: chance.guid({ version: 4 }),
        idGame: chance.guid({ version: 4 }),
        idPlayer,
        saveData: "{\"model\":\"ModelTypeV1\",\"data\":\"{}\"}",
        creationDate: new Date()
      });
    }
    return gameSaveDatas;
  }
}
