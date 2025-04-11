import { Controller, Get, Param, Post, Body, Put, Delete, Patch, Inject } from "@nestjs/common";
import { PlayersService } from "../service/player.service";
import { PlayerApiV1, PlayerCreateApiV1, PlayerSearchCriteriaApiV1, PlayerUpdateApiV1 } from "./players.models.dto";
import { ApiTags, ApiOperation, ApiResponse } from "@nestjs/swagger";
import { CreatePlayer, Player, UpdatePlayer } from "../service/player.models";
import { MODULE_KEY_MAPPER } from "src/common/mapper/mapper.module";
import { Mapper } from "src/common/mapper/mapper";

@ApiTags("players")
@Controller("players")
export class PlayersController {
  public constructor(
    @Inject() private readonly playersService: PlayersService,
    @Inject(MODULE_KEY_MAPPER) private readonly mapper: Mapper,
  ) { }

  @Get()
  @ApiOperation({ summary: "Get all players" })
  @ApiResponse({ status: 200, description: "List of all players", type: [PlayerApiV1] })
  public async findAll(): Promise<PlayerApiV1[]> {
    const players = await this.playersService.findAll();
    const res = await this.mapper.mapArray(players, Player, PlayerApiV1);
    return res;
  }

  @Get(":id")
  @ApiOperation({ summary: "Find a player by ID" })
  @ApiResponse({ status: 200, description: "Player found", type: PlayerApiV1 })
  @ApiResponse({ status: 404, description: "Player not found" })
  public async findOne(@Param("id") id: string): Promise<PlayerApiV1> {
    const player = await this.playersService.findOne(id);
    return this.mapper.map(player, Player, PlayerApiV1);
  }

  @Post("search")
  @ApiOperation({ summary: "Search players by criteria" })
  @ApiResponse({ status: 200, description: "List of players matching the criteria", type: [PlayerApiV1] })
  public async search(@Body() criteria: PlayerSearchCriteriaApiV1): Promise<PlayerApiV1[]> {
    const players: Player[] = await this.playersService.search(criteria);
    return players.map(player =>
      this.mapper.map(player, Player, PlayerApiV1),
    );
  }

  @Post()
  @ApiOperation({ summary: "Create a new player" })
  @ApiResponse({ status: 201, description: "Player created", type: PlayerApiV1 })
  public async create(@Body() createPlayerDto: PlayerCreateApiV1): Promise<PlayerApiV1> {
    const createPlayerEntity = this.mapper.map(createPlayerDto, PlayerCreateApiV1, CreatePlayer);
    const createdPlayer = await this.playersService.create(createPlayerEntity);
    return this.mapper.map(createdPlayer, Player, PlayerApiV1);
  }

  @Put(":id")
  @ApiOperation({ summary: "Update a player's details" })
  @ApiResponse({ status: 200, description: "Player updated", type: PlayerApiV1 })
  @ApiResponse({ status: 404, description: "Player not found" })
  public async update(@Param("id") id: string, @Body() updatePlayerDto: PlayerUpdateApiV1): Promise<PlayerApiV1> {
    const updatePlayerEntity = this.mapper.map(updatePlayerDto, PlayerUpdateApiV1, UpdatePlayer);
    const updatedPlayer = await this.playersService.update(id, updatePlayerEntity);
    return this.mapper.map(updatedPlayer, Player, PlayerApiV1);
  }

  @Delete(":id")
  @ApiOperation({ summary: "Delete a player by ID" })
  @ApiResponse({ status: 204, description: "Player deleted" })
  @ApiResponse({ status: 404, description: "Player not found" })
  public async delete(@Param("id") id: string): Promise<void> {
    await this.playersService.delete(id);
  }

  @Patch("deactive/:id")
  @ApiOperation({ summary: "Deactivate a player" })
  @ApiResponse({ status: 200, description: "Player deactivated", type: PlayerApiV1 })
  @ApiResponse({ status: 404, description: "Player not found" })
  public async deactivate(@Param("id") id: string): Promise<PlayerApiV1> {
    const updatedPlayer = await this.playersService.deactivate(id);
    return this.mapper.map(updatedPlayer, Player, PlayerApiV1);
  }

  @Patch("ban/:id")
  @ApiOperation({ summary: "Ban a player" })
  @ApiResponse({ status: 200, description: "Player banned", type: PlayerApiV1 })
  @ApiResponse({ status: 404, description: "Player not found" })
  public async ban(@Param("id") id: string): Promise<PlayerApiV1> {
    const updatedPlayer = await this.playersService.ban(id);
    return this.mapper.map(updatedPlayer, Player, PlayerApiV1);
  }
}
