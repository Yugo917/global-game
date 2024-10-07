import { plainToInstance } from "class-transformer";
import { Player } from "./player.models";
import { IPlayerDocument } from "./player.schema";
import { isNullOrUndefinedOrEmpty } from "src/common/assertion/assertion.helper";

export class DbPlayerMapper {

  public static mapToEntity(playerDocument: IPlayerDocument): Player {
    if (isNullOrUndefinedOrEmpty(playerDocument)) throw new Error("playerDocument is required")
    return plainToInstance(Player, {
      id: playerDocument.playerId,
      avatarUri: playerDocument.avatarUri,
      country: playerDocument.country,
      isBanned: playerDocument.isBanned,
      isActive: playerDocument.isActive,
      updateDate: playerDocument.updateDate,
      creationDate: playerDocument.creationDate
    });
  }
}
