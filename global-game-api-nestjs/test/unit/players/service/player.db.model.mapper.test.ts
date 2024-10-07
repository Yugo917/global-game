import "reflect-metadata";
import { Player } from "src/players/service/player.models";
import { IPlayerDocument } from "src/players/service/player.schema";
import { DbPlayerMapper } from "src/players/service/players.db.model.mapper";

describe("DbPlayerMapper", () => {

    test("mapToEntity_WithValidPlayerDocument_ShouldSucceed", () => {
        // Arrange
        const playerDocument: IPlayerDocument = {
            playerId: "123",
            avatarUri: "http://example.com/avatar.png",
            country: "US",
            isBanned: false,
            isActive: true,
            updateDate: new Date(),
            creationDate: new Date()
        };

        // Act
        const result = DbPlayerMapper.mapToEntity(playerDocument);

        // Assert
        expect(result).toBeInstanceOf(Player);
        expect(result.id).toBe(playerDocument.playerId);
        expect(result.avatarUri).toBe(playerDocument.avatarUri);
        expect(result.country).toBe(playerDocument.country);
        expect(result.isBanned).toBe(playerDocument.isBanned);
        expect(result.isActive).toBe(playerDocument.isActive);
        expect(result.updateDate).toEqual(playerDocument.updateDate);
        expect(result.creationDate).toEqual(playerDocument.creationDate);
    });

    test("mapToEntity_WithNullPlayerDocument_ShouldThrowError", () => {
        // Arrange
        const playerDocument = null;

        // Act
        const action = () => DbPlayerMapper.mapToEntity(playerDocument as any);

        // Assert
        expect(action).toThrow("playerDocument is required");
    });

    test("mapToEntity_WithEmptyPlayerDocument_ShouldThrowError", () => {
        // Arrange
        const playerDocument = {} as IPlayerDocument;

        // Act
        const action = () => DbPlayerMapper.mapToEntity(playerDocument);

        // Assert
        expect(action).toThrow("playerDocument is required");
    });
});
