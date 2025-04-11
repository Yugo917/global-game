import { Controller, Get, Param, Post, Body, Put, Delete, Patch, Inject } from "@nestjs/common";
import { ApiTags, ApiOperation, ApiResponse } from "@nestjs/swagger";


import { CreateGame, Game, UpdateGame } from "../service/game.models";
import { GameApiV1, GameCreateApiV1, GameSearchCriteriaApiV1, GameUpdateApiV1 } from "./games.models.dto";
import { MODULE_KEY_MAPPER } from "src/common/mapper/mapper.module";
import { Mapper } from "src/common/mapper/mapper";
import { GamesService } from "../service/game.service";

@ApiTags("games")
@Controller("games")
export class GamesController {
    public constructor(
        @Inject() private readonly gamesService: GamesService,
        @Inject(MODULE_KEY_MAPPER) private readonly mapper: Mapper,
    ) { }

    @Get()
    @ApiOperation({ summary: "Get all games" })
    @ApiResponse({ status: 200, description: "List of all games", type: [GameApiV1] })
    public async findAll(): Promise<GameApiV1[]> {
        const games = await this.gamesService.findAll();
        return this.mapper.mapArray(games, Game, GameApiV1);
    }

    @Get(":id")
    @ApiOperation({ summary: "Find a game by ID" })
    @ApiResponse({ status: 200, description: "Game found", type: GameApiV1 })
    @ApiResponse({ status: 404, description: "Game not found" })
    public async findOne(@Param("id") id: string): Promise<GameApiV1> {
        const game = await this.gamesService.findOne(id);
        return this.mapper.map(game, Game, GameApiV1);
    }

    @Post("search")
    @ApiOperation({ summary: "Search games by criteria" })
    @ApiResponse({ status: 200, description: "List of games matching the criteria", type: [GameApiV1] })
    public async search(@Body() criteria: GameSearchCriteriaApiV1): Promise<GameApiV1[]> {
        const games = await this.gamesService.search(criteria);
        return this.mapper.mapArray(games, Game, GameApiV1);
    }

    @Post()
    @ApiOperation({ summary: "Create a new game" })
    @ApiResponse({ status: 201, description: "Game created", type: GameApiV1 })
    public async create(@Body() createGameDto: GameCreateApiV1): Promise<GameApiV1> {
        const createGameEntity = this.mapper.map(createGameDto, GameCreateApiV1, CreateGame);
        const createdGame = await this.gamesService.create(createGameEntity);
        return this.mapper.map(createdGame, Game, GameApiV1);
    }

    @Put(":id")
    @ApiOperation({ summary: "Update a game" })
    @ApiResponse({ status: 200, description: "Game updated", type: GameApiV1 })
    @ApiResponse({ status: 404, description: "Game not found" })
    public async update(@Param("id") id: string, @Body() updateGameDto: GameUpdateApiV1): Promise<GameApiV1> {
        const updateGameEntity = this.mapper.map(updateGameDto, GameUpdateApiV1, UpdateGame);
        const updatedGame = await this.gamesService.update(id, updateGameEntity);
        return this.mapper.map(updatedGame, Game, GameApiV1);
    }

    @Delete(":id")
    @ApiOperation({ summary: "Delete a game" })
    @ApiResponse({ status: 204, description: "Game deleted" })
    @ApiResponse({ status: 404, description: "Game not found" })
    public async delete(@Param("id") id: string): Promise<void> {
        await this.gamesService.delete(id);
    }

    @Patch("deactivate/:id")
    @ApiOperation({ summary: "Deactivate a game" })
    @ApiResponse({ status: 200, description: "Game deactivated", type: GameApiV1 })
    @ApiResponse({ status: 404, description: "Game not found" })
    public async deactivate(@Param("id") id: string): Promise<GameApiV1> {
        const updatedGame = await this.gamesService.deactivate(id);
        return this.mapper.map(updatedGame, Game, GameApiV1);
    }
}
