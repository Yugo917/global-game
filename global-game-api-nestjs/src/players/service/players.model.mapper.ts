import { plainToInstance } from "class-transformer";
import { PlayerApiDtoV1, PlayerCreateApiV1, PlayerUpdateApiV1 } from "../api/players.models.dto";
import { Injectable } from "@nestjs/common";
import { Player } from "./player.models";

@Injectable()
export class PlayerMapper {
  
  // Method to map Player to PlayerApiDtoV1
  public mapToDto(player: Player): PlayerApiDtoV1 {
    return plainToInstance(PlayerApiDtoV1, player);
  }

  // Method to map a list of Player entities to a list of PlayerApiDtoV1 DTOs
  public mapToDtoList(players: Player[]): PlayerApiDtoV1[] {
    return players.map(player => this.mapToDto(player));
  }

  // Method to map PlayerCreateApiV1 to Player (excluding ID)
  public mapToEntity(createPlayerDto: PlayerCreateApiV1): Omit<Player, 'id'> {
    return plainToInstance(Player, createPlayerDto);
  }

  // Method to update an existing Player with PlayerUpdateApiV1 data
  public mapToUpdatedEntity(existingPlayer: Player, updatePlayerDto: PlayerUpdateApiV1): Player {
    return { ...existingPlayer, ...plainToInstance(Player, updatePlayerDto) };
  }

  // Method to update Player's active status for deactivation
  public mapToDeactivatedEntity(existingPlayer: Player, isActive: boolean): Player {
    return { ...existingPlayer, isActive };
  }
}
