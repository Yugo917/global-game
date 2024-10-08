import { Test, TestingModule } from "@nestjs/testing";
import { ApiPlayerMapper } from "src/players/api/players.api.model.mapper";
import { PlayersController } from "src/players/api/players.controller";
import { PlayerCreateApiV1, PlayerUpdateApiV1 } from "src/players/api/players.models.dto";
import { Player } from "src/players/service/player.models";
import { PlayersService } from "src/players/service/player.service";

describe("PlayersController", () => {
    let controller: PlayersController;
    let service: PlayersService;

    beforeEach(async () => {
        const module: TestingModule = await Test.createTestingModule({
            controllers: [PlayersController],
            providers: [
                PlayersService,
                ApiPlayerMapper
            ]
        })
            .overrideProvider(PlayersService)
            .useValue({
                findAll: jest.fn(),
                findOne: jest.fn(),
                createPlayer: jest.fn(),
                updatePlayer: jest.fn(),
                deletePlayer: jest.fn(),
                deactivatePlayer: jest.fn()
            })
            .compile();

        controller = module.get<PlayersController>(PlayersController);
        service = module.get<PlayersService>(PlayersService);
    });

    afterEach(() => {
        jest.clearAllMocks();
    });

    test("findAll_ShouldReturnListOfPlayers", async () => {
        // Arrange
        const players: Player[] = [
            {
                id: "1",
                avatarUri: "http://example.com/avatar.png",
                country: "US",
                isBanned: false,
                isActive: true,
                updateDate: new Date(),
                creationDate: new Date()
            }
        ];
        jest.spyOn(service, "findAll").mockResolvedValue(players);

        // Act
        const result = await controller.findAll();

        // Assert
        expect(result).toHaveLength(1);
        expect(result[0].id).toBe(players[0].id);
    });

    test("findOne_WithExistingId_ShouldReturnPlayer", async () => {
        // Arrange
        const playerId = "1";
        const player: Player = {
            id: playerId,
            avatarUri: "http://example.com/avatar.png",
            country: "US",
            isBanned: false,
            isActive: true,
            updateDate: new Date(),
            creationDate: new Date()
        };
        jest.spyOn(service, "findOne").mockResolvedValue(player);

        // Act
        const result = await controller.findOne(playerId);

        // Assert
        expect(result.id).toBe(playerId);
    });

    test("createPlayer_ShouldReturnNewPlayer", async () => {
        // Arrange
        const playerCreateDto: PlayerCreateApiV1 = {
            avatarUri: "http://example.com/avatar.png",
            country: "US"

        };
        const createdPlayer: Player = {
            avatarUri: playerCreateDto.avatarUri,
            country: playerCreateDto.country,
            id: "123",
            isBanned: false,
            isActive: true,
            updateDate: new Date(),
            creationDate: new Date()
        };
        jest.spyOn(service, "createPlayer").mockResolvedValue(createdPlayer);

        // Act
        const result = await controller.create(playerCreateDto);

        // Assert
        expect(result.id).toBe(createdPlayer.id);
    });

    test("updatePlayer_ShouldReturnUpdatedPlayer", async () => {
        // Arrange
        const playerId = "123";
        const updateDto: PlayerUpdateApiV1 = {
            avatarUri: "http://example.com/new-avatar.png",
            country: "CA",
            isBanned: false
        };
        const updatedPlayer: Player = {
            id: playerId,
            avatarUri: updateDto.avatarUri,
            country: updateDto.country,
            isBanned: updateDto.isBanned,
            isActive: true,
            updateDate: new Date(),
            creationDate: new Date()
        };
        jest.spyOn(service, "updatePlayer").mockResolvedValue(updatedPlayer);

        // Act
        const result = await controller.update(playerId, updateDto);

        // Assert
        expect(result.id).toBe(playerId);
        expect(result.avatarUri).toBe(updateDto.avatarUri);
    });

    test("deletePlayer_ShouldSucceed", async () => {
        // Arrange
        const playerId = "123";
        jest.spyOn(service, "deletePlayer").mockResolvedValue();

        // Act & Assert
        await expect(controller.delete(playerId)).resolves.toBeUndefined();
    });

    test("deactivatePlayer_ShouldReturnUpdatedPlayer", async () => {
        // Arrange
        const playerId = "123";
        const updatedPlayer: Player = {
            id: playerId,
            avatarUri: "http://example.com/avatar.png",
            country: "US",
            isBanned: false,
            isActive: false,
            updateDate: new Date(),
            creationDate: new Date()
        };
        jest.spyOn(service, "deactivatePlayer").mockResolvedValue(updatedPlayer);

        // Act
        const result = await controller.deactivate(playerId);

        // Assert
        expect(result.isActive).toBe(false);
    });
});
