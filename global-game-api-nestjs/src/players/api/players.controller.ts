import { Controller, Get, Param, Post, Body, Put, Delete, Patch } from "@nestjs/common";
import { PlayersService } from "../service/player.service";
import { PlayerApiDtoV1, PlayerCreateApiV1, PlayerUpdateApiV1 } from "./players.models.dto";
import { ApiPlayerMapper } from "./players.api.model.mapper";
import { ApiTags, ApiOperation, ApiResponse } from "@nestjs/swagger";

@ApiTags("players")
@Controller("players")
export class PlayersController {
  public constructor(
    private readonly playersService: PlayersService,
    private readonly playerMapper: ApiPlayerMapper
  ) { }

  @Get()
  @ApiOperation({ summary: "Get all players" })
  @ApiResponse({ status: 200, description: "List of all players", type: [PlayerApiDtoV1] })
  public async findAll(): Promise<PlayerApiDtoV1[]> {
    const players = await this.playersService.findAll();
    const res = players.map(m => this.playerMapper.mapToApiDto(m));
    return res;
  }

  @Get(":id")
  @ApiOperation({ summary: "Find a player by ID" })
  @ApiResponse({ status: 200, description: "Player found", type: PlayerApiDtoV1 })
  @ApiResponse({ status: 404, description: "Player not found" })
  public async findOne(@Param("id") id: string): Promise<PlayerApiDtoV1> {
    const player = await this.playersService.findOne(id);
    return this.playerMapper.mapToApiDto(player);
  }

  @Post()
  @ApiOperation({ summary: "Create a new player" })
  @ApiResponse({ status: 201, description: "Player created", type: PlayerApiDtoV1 })
  public async create(@Body() createPlayerDto: PlayerCreateApiV1): Promise<PlayerApiDtoV1> {
    const playerEntity = this.playerMapper.mapToEntity(createPlayerDto);
    const createdPlayer = await this.playersService.createPlayer(playerEntity);
    return this.playerMapper.mapToApiDto(createdPlayer);
  }

  @Put(":id")
  @ApiOperation({ summary: "Update a player's details" })
  @ApiResponse({ status: 200, description: "Player updated", type: PlayerApiDtoV1 })
  @ApiResponse({ status: 404, description: "Player not found" })
  public async update(@Param("id") id: string, @Body() updatePlayerDto: PlayerUpdateApiV1): Promise<PlayerApiDtoV1> {
    const playerEntity = this.playerMapper.mapToEntity(updatePlayerDto);
    const updatedPlayer = await this.playersService.updatePlayer(id, playerEntity);
    return this.playerMapper.mapToApiDto(updatedPlayer);
  }

  @Delete(":id")
  @ApiOperation({ summary: "Delete a player by ID" })
  @ApiResponse({ status: 204, description: "Player deleted" })
  @ApiResponse({ status: 404, description: "Player not found" })
  public async delete(@Param("id") id: string): Promise<void> {
    await this.playersService.deletePlayer(id);
  }

  @Patch(":id")
  @ApiOperation({ summary: "Deactivate a player" })
  @ApiResponse({ status: 200, description: "Player deactivated", type: PlayerApiDtoV1 })
  @ApiResponse({ status: 404, description: "Player not found" })
  public async deactivate(@Param("id") id: string): Promise<PlayerApiDtoV1> {
    const updatedPlayer = await this.playersService.deactivatePlayer(id);
    return this.playerMapper.mapToApiDto(updatedPlayer);
  }
}
