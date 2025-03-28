import Chance from "chance";
import { IPlayerDto, ServiceProviderDto } from "../../app/clients/v2/models/Player";

export class PlayerFactory {
  public static CreatePlayers(nbPlayers: number): IPlayerDto[] {
    const chance = new Chance();
    const players: IPlayerDto[] = [];
    for (let index = 0; index < nbPlayers; index++) {
      players.push({
        identifier: {
          id: chance.guid({ version: 4 }),
          name: chance.name({ middle: true }),
          email: chance.email()
        },
        thirdPartyIdentifiers: [{
          id: chance.guid({ version: 4 }),
          name: chance.name({ middle: true }),
          email: chance.email(),
          serviceProvider: ServiceProviderDto.GoogleGames
        }],
        avatarUri: chance.avatar(),
        country: chance.country(),
        isActive: true,
        isBanned: false,
        updateDate: new Date(),
        creationDate: new Date()
      });
    }
    // set test values
    players[0].identifier.id = "5d629469-c688-448c-9a4b-e4cb8e226fa3";
    players[1].identifier.name = "toto";
    players[2].identifier.email = "toto@aol.com";
    players[3].identifier.name = "titi";
    players[4].identifier.name = "titi";
    players[5].identifier.name = "titi";
    return players;
  }
}
