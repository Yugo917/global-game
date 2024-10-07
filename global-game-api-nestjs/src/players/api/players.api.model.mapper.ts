import { plainToInstance } from "class-transformer";
import { PlayerApiDtoV1, PlayerCreateApiV1 } from "./players.models.dto";
import { Injectable } from "@nestjs/common";
import { Player } from "../service/player.models";
import { isNullOrUndefinedOrEmpty } from "src/common/assertion/assertion.helper";

@Injectable()
export class ApiPlayerMapper {

  // Method to map Player to PlayerApiDtoV1
  public mapToApiDto(player: Player): PlayerApiDtoV1 {
    if (isNullOrUndefinedOrEmpty(player)) throw new Error("playerDocument is required")
    return plainToInstance(PlayerApiDtoV1, player);
  }

  // Method to map PlayerCreateApiV1 to Player (excluding ID)
  public mapToEntity(createPlayerDto: PlayerCreateApiV1): Omit<Player, "id"> {
    if (isNullOrUndefinedOrEmpty(createPlayerDto)) throw new Error("playerDocument is required")
    return plainToInstance(Player, {
      id: undefined,
      avatarUri: createPlayerDto.avatarUri,
      country: createPlayerDto.country,
      isBanned: undefined,
      isActive: undefined,
      updateDate: undefined,
      creationDate: undefined
    });
  }
}
