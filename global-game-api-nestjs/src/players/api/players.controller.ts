import { Controller, Get, Param, Post, Body, Put, Delete, Patch } from '@nestjs/common';
import { PlayersService } from '../service/players.service';
import { PlayerApiDtoV1, PlayerCreateApiV1, PlayerUpdateApiV1 } from './players.models.dto';
import { PlayerMapper } from '../service/players.model.mapper';
import { ApiTags, ApiOperation, ApiResponse } from '@nestjs/swagger';

@ApiTags('players')
@Controller('players')
export class PlayersController {
  constructor(
    private readonly playersService: PlayersService,
    private readonly playerMapper: PlayerMapper
  ) {}

  @Get()
  @ApiOperation({ summary: 'Get all players' })
  @ApiResponse({ status: 200, description: 'List of all players', type: [PlayerApiDtoV1] })
  findAll(): PlayerApiDtoV1[] {
    const players = this.playersService.findAll();
    return this.playerMapper.mapToDtoList(players);
  }

  @Get(':id')
  @ApiOperation({ summary: 'Find a player by ID' })
  @ApiResponse({ status: 200, description: 'Player found', type: PlayerApiDtoV1 })
  @ApiResponse({ status: 404, description: 'Player not found' })
  findOne(@Param('id') id: string): PlayerApiDtoV1 {
    const player = this.playersService.findOne(id);
    return this.playerMapper.mapToDto(player);
  }

  @Post()
  @ApiOperation({ summary: 'Create a new player' })
  @ApiResponse({ status: 201, description: 'Player created', type: PlayerApiDtoV1 })
  create(@Body() createPlayerDto: PlayerCreateApiV1): PlayerApiDtoV1 {
    const playerEntity = this.playerMapper.mapToEntity(createPlayerDto);
    const createdPlayer = this.playersService.createPlayer(playerEntity);
    return this.playerMapper.mapToDto(createdPlayer);
  }

  @Put(':id')
  @ApiOperation({ summary: 'Update a player\'s details' })
  @ApiResponse({ status: 200, description: 'Player updated', type: PlayerApiDtoV1 })
  @ApiResponse({ status: 404, description: 'Player not found' })
  update(@Param('id') id: string, @Body() updatePlayerDto: PlayerUpdateApiV1): PlayerApiDtoV1 {
    const playerEntity = this.playerMapper.mapToEntity(updatePlayerDto);
    const updatedPlayer = this.playersService.updatePlayer(id, playerEntity);
    return this.playerMapper.mapToDto(updatedPlayer);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Delete a player by ID' })
  @ApiResponse({ status: 204, description: 'Player deleted' })
  @ApiResponse({ status: 404, description: 'Player not found' })
  delete(@Param('id') id: string): void {
    this.playersService.deletePlayer(id);
  }

  @Patch(':id')
  @ApiOperation({ summary: 'Deactivate a player' })
  @ApiResponse({ status: 200, description: 'Player deactivated', type: PlayerApiDtoV1 })
  @ApiResponse({ status: 404, description: 'Player not found' })
  deactivate(@Param('id') id: string): PlayerApiDtoV1 {
    const updatedPlayer = this.playersService.deactivatePlayer(id);
    return this.playerMapper.mapToDto(updatedPlayer);
  }
}
