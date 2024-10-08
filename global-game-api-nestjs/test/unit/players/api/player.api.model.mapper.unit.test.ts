import { ApiPlayerMapper } from "src/players/api/players.api.model.mapper";
import { PlayerApiDtoV1, PlayerCreateApiV1 } from "src/players/api/players.models.dto";
import { Player } from "src/players/service/player.models";

describe("ApiPlayerMapper", () => {
    let mapper: ApiPlayerMapper;

    beforeEach(() => {
        mapper = new ApiPlayerMapper();
    });

    test("mapToApiDto_WithValidPlayer_ShouldSucceed", () => {
        // Arrange
        const player: Player = {
            id: "123",
            avatarUri: "http://example.com/avatar.png",
            country: "US",
            isBanned: false,
            isActive: true,
            updateDate: new Date(),
            creationDate: new Date()
        };

        // Act
        const result = mapper.mapToApiDto(player);

        // Assert
        expect(result).toBeInstanceOf(PlayerApiDtoV1);
        expect(result.id).toBe(player.id);
        expect(result.avatarUri).toBe(player.avatarUri);
        expect(result.country).toBe(player.country);
        expect(result.isBanned).toBe(player.isBanned);
        expect(result.isActive).toBe(player.isActive);
        expect(result.updateDate).toEqual(player.updateDate);
        expect(result.creationDate).toEqual(player.creationDate);
    });

    test("mapToApiDto_WithNullPlayer_ShouldThrowError", () => {
        // Arrange
        const player = null;

        // Act
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        const action = (): PlayerApiDtoV1 => mapper.mapToApiDto(player as any);

        // Assert
        expect(action).toThrow("player is required");
    });

    test("mapToEntity_WithValidPlayerCreateDto_ShouldSucceed", () => {
        // Arrange
        const createPlayerDto: PlayerCreateApiV1 = {
            avatarUri: "http://example.com/avatar.png",
            country: "US"
        };

        // Act
        const result = mapper.mapToEntity(createPlayerDto);

        // Assert
        expect(result).toBeInstanceOf(Player);
        expect(result.avatarUri).toEqual(createPlayerDto.avatarUri);
        expect(result.country).toEqual(createPlayerDto.country);
        expect(result.isBanned).toBe(undefined);
        expect(result.isActive).toBe(undefined);
    });

    test("mapToEntity_WithNullCreatePlayerDto_ShouldThrowError", () => {
        // Arrange
        const createPlayerDto = null;

        // Act
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        const action = (): Player => mapper.mapToEntity(createPlayerDto as any);

        // Assert
        expect(action).toThrow("createPlayerDto is required");
    });
});
