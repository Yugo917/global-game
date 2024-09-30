import { plainToInstance } from "class-transformer";
import { Player } from "./players.service";
import { PlayerApiDtoV1 } from "../api/players.models.dto";
import { Injectable } from "@nestjs/common";

@Injectable()
export class PlayerMapper{

  // Method to map Player to PlayerApiDtoV1
  public mapToDto(player: Player): PlayerApiDtoV1 {
    return plainToInstance(PlayerApiDtoV1, player);
  }

  // Method to map PlayerApiDtoV1 to Player
  public mapToEntity(createPlayerDto: Omit<PlayerApiDtoV1, 'id'>): Omit<Player, 'id'> {
    return plainToInstance(Player, createPlayerDto);
  }
}