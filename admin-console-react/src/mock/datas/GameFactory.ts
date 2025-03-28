import Chance from "chance";
import { IGameDto } from "../../app/clients/v2/models/Game";

export class GameFactory {
  public static CreateGames(nbGames: number): IGameDto[] {
    const chance = new Chance();
    const games: IGameDto[] = [];
    for (let index = 0; index < nbGames; index++) {
      games.push({
        globalGameIdentifier: {
          id: chance.guid({ version: 4 }),
          name: chance.name({ middle: true })
        },
        thirdPartyIdentifiers: [],
        badge: chance.avatar(),
        isActive: true,
        updateDate: new Date(),
        creationDate: new Date()
      });
    }
    // set test values
    games[0].globalGameIdentifier.id = "5d629469-c688-448c-9a4b-e4cb8e227777";
    games[1].globalGameIdentifier.name = "my Game 01";
    return games;
  }
}
