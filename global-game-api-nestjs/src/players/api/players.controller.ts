import { Controller, Get, Param, Post, Body } from '@nestjs/common';
import { PlayersService } from '../service/players.service';
import { PlayerApiDtoV1 } from './players.models.dto';
import { PlayerMapper } from '../service/players.model.mapper';

@Controller('players')
export class PlayersController {
  constructor(private readonly playersService: PlayersService, private readonly playerMapper: PlayerMapper) {}

  @Get()
  findAll(): PlayerApiDtoV1[] {
    const players = this.playersService.findAll();
    return players.map((player) => this.playerMapper.mapToDto(player));
  }

  @Get(':id')
  findOne(@Param('id') id: string): PlayerApiDtoV1 {
    const player = this.playersService.findOne(id);
    return this.playerMapper.mapToDto(player);
  }

  @Post()
  create(@Body() createPlayerDto: Omit<PlayerApiDtoV1, 'id'>): PlayerApiDtoV1 {
    const playerEntity = this.playerMapper.mapToEntity(createPlayerDto);
    const createdPlayer = this.playersService.createPlayer(playerEntity);
    return this.playerMapper.mapToDto(createdPlayer);
  }
}