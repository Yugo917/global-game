import { Controller, Get, Param, Post, Body } from '@nestjs/common';
import { PlayersService, Player } from './players.service';
import { plainToInstance } from 'class-transformer';

// PlayerApiDtoV1 class for the controller
export class PlayerApiDtoV1 {
  id: string;
  avatarUri: string;
  country: string;
  isBanned: boolean;
  isActive: boolean;
  updateDate: Date;
  creationDate: Date;
}

@Controller('players')
export class PlayersController {
  constructor(private readonly playersService: PlayersService) {}

  // Method to map Player to PlayerApiDtoV1
  private mapToDto(player: Player): PlayerApiDtoV1 {
    return plainToInstance(PlayerApiDtoV1, player);
  }

  // Method to map PlayerApiDtoV1 to Player
  private mapToEntity(createPlayerDto: Omit<PlayerApiDtoV1, 'id'>): Omit<Player, 'id'> {
    return plainToInstance(Player, createPlayerDto);
  }

  @Get()
  findAll(): PlayerApiDtoV1[] {
    const players = this.playersService.findAll();
    return players.map((player) => this.mapToDto(player));
  }

  @Get(':id')
  findOne(@Param('id') id: string): PlayerApiDtoV1 {
    const player = this.playersService.findOne(id);
    return this.mapToDto(player);
  }

  @Post()
  create(@Body() createPlayerDto: Omit<PlayerApiDtoV1, 'id'>): PlayerApiDtoV1 {
    const playerEntity = this.mapToEntity(createPlayerDto);
    const createdPlayer = this.playersService.createPlayer(playerEntity);
    return this.mapToDto(createdPlayer);
  }
}