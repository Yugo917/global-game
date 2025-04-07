import { plainToInstance } from "class-transformer";
import { Player } from "./player.models";
import { IPlayerDocument } from "./player.schema";
import { isNullOrUndefinedOrEmpty } from "src/common/assertion/assertion.helper";

export class DbPlayerMapper {

  public static mapToEntity(playerDocument: IPlayerDocument): Player {
    if (isNullOrUndefinedOrEmpty(playerDocument)) throw new Error("playerDocument is required")

    const thirdPartyIdentifiers = playerDocument.thirdPartyIdentifiers.map(identifier => ({
      id: identifier.id,
      name: identifier.name,
      email: identifier.email,
      avatarUri: identifier.avatarUri,
      gameServiceProvider: identifier.gameServiceProvider
    }));

    return plainToInstance(Player, {
      id: playerDocument.playerId,
      name: playerDocument.name,
      email: playerDocument.email,
      avatarUri: playerDocument.avatarUri,
      avatarName: playerDocument.avatarName,
      country: playerDocument.country,
      thirdPartyIdentifiers: thirdPartyIdentifiers,
      isBanned: playerDocument.isBanned,
      isActive: playerDocument.isActive,
      updateDate: playerDocument.updateDate,
      creationDate: playerDocument.creationDate
    });
  }
}
