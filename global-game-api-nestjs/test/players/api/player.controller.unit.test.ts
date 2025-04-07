import { Test, TestingModule } from "@nestjs/testing";
import { MapperModule } from "src/common/mapper/mapper.module";
import { PlayerApiMapperProfile } from "src/players/api/players.api.mapper.profile";
import { PlayersController } from "src/players/api/players.controller";
import { PlayerCreateApiV1, PlayerUpdateApiV1 } from "src/players/api/players.models.dto";
import { Player } from "src/players/service/player.models";
import { PlayersService } from "src/players/service/player.service";

describe("PlayersController (Unit)", () => {
    let controller: PlayersController;
    let service: PlayersService;

    beforeEach(async () => {
        const module: TestingModule = await Test.createTestingModule({
            controllers: [PlayersController],
            imports: [MapperModule],
            providers: [
                PlayerApiMapperProfile,
                PlayersService
            ]
        })
            .overrideProvider(PlayersService)
            .useValue({
                findAll: jest.fn(),
                findOne: jest.fn(),
                create: jest.fn(),
                update: jest.fn(),
                delete: jest.fn(),
                deactivate: jest.fn(),
                ban: jest.fn()
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
                name: "John Doe",
                email: "john.doe@example.com",
                avatarUri: "http://example.com/avatar.png",
                avatarName: "penguin",
                country: "US",
                thirdPartyIdentifiers: [{ id: "google_id", name: "google_name", email: "google_email@gmail.com", avatarUri: "google_avatarURI", gameServiceProvider: "GoogleGames" }],
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
            name: "John Doe",
            email: "john.doe@example.com",
            avatarUri: "http://example.com/avatar.png",
            avatarName: "seal",
            country: "US",
            thirdPartyIdentifiers: [],
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
            name: "John Doe",
            email: "john.doe@example.com",
            avatarUri: "http://example.com/avatar.png",
            avatarName: "chicken",
            country: "US"
        };
        const createdPlayer: Player = {
            id: "123",
            name: playerCreateDto.name,
            email: playerCreateDto.email,
            avatarUri: playerCreateDto.avatarUri,
            avatarName: playerCreateDto.avatarName,
            country: playerCreateDto.country,
            thirdPartyIdentifiers: [],
            isBanned: false,
            isActive: true,
            updateDate: new Date(),
            creationDate: new Date()
        };
        jest.spyOn(service, "create").mockResolvedValue(createdPlayer);

        // Act
        const result = await controller.create(playerCreateDto);

        // Assert
        expect(result.id).toBe(createdPlayer.id);
    });

    test("updatePlayer_ShouldReturnUpdatedPlayer", async () => {
        // Arrange
        const playerId = "123";
        const updateDto: PlayerUpdateApiV1 = {
            avatarName: "blue_hippo",
            avatarUri: "http://example.com/new-avatar.png",
            country: "CA",
            thirdPartyIdentifiers: [{ id: "google_id", name: "google_name", email: "google_email@gmail.com", avatarUri: "google_avatarURI", gameServiceProvider: "GoogleGames" }]
        };
        const updatedPlayer: Player = {
            id: playerId,
            name: "John Doe",
            email: "john.doe@example.com",
            avatarUri: updateDto.avatarUri,
            avatarName: updateDto.avatarName!,
            country: updateDto.country,
            thirdPartyIdentifiers: [{ id: "google_id", name: "google_name", email: "google_email@gmail.com", avatarUri: "google_avatarURI", gameServiceProvider: "GoogleGames" }],
            isBanned: false,
            isActive: true,
            updateDate: new Date(),
            creationDate: new Date()
        };
        jest.spyOn(service, "update").mockResolvedValue(updatedPlayer);

        // Act
        const result = await controller.update(playerId, updateDto);

        // Assert
        expect(result.id).toBe(playerId);
        expect(result.avatarName).toBe(updateDto.avatarName);
        expect(result.avatarUri).toBe(updateDto.avatarUri);
        expect(result.thirdPartyIdentifiers).toEqual(updateDto.thirdPartyIdentifiers);
    });

    test("deletePlayer_ShouldSucceed", async () => {
        // Arrange
        const playerId = "123";
        jest.spyOn(service, "delete").mockResolvedValue();

        // Act & Assert
        await expect(controller.delete(playerId)).resolves.toBeUndefined();
    });

    test("deactivatePlayer_ShouldReturnUpdatedPlayer", async () => {
        // Arrange
        const playerId = "123";
        const updatedPlayer: Player = {
            id: playerId,
            name: "John Doe",
            email: "john.doe@example.com",
            avatarUri: "http://example.com/avatar.png",
            avatarName: "giraffe",
            country: "US",
            thirdPartyIdentifiers: [],
            isBanned: false,
            isActive: false,
            updateDate: new Date(),
            creationDate: new Date()
        };
        jest.spyOn(service, "deactivate").mockResolvedValue(updatedPlayer);

        // Act
        const result = await controller.deactivate(playerId);

        // Assert
        expect(result.isActive).toBe(false);
    });
});
