import { plainToInstance } from "class-transformer";
import { PlayerApiDtoV1, PlayerCreateApiV1 } from "./players.models.dto";
import { Injectable } from "@nestjs/common";
import { Player } from "../service/player.models";
import { isNullOrUndefinedOrEmpty } from "src/common/assertion/assertion.helper";

@Injectable()
export class ApiPlayerMapper {

  public mapToApiDto(player: Player): PlayerApiDtoV1 {
    if (isNullOrUndefinedOrEmpty(player)) throw new Error("player is required")
    return plainToInstance(PlayerApiDtoV1, player);
  }

  public mapToEntity(createPlayerDto: PlayerCreateApiV1): Player {
    if (isNullOrUndefinedOrEmpty(createPlayerDto)) throw new Error("createPlayerDto is required")
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
