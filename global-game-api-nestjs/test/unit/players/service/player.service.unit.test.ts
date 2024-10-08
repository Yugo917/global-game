/* eslint-disable @typescript-eslint/no-explicit-any */

import { Test, TestingModule } from "@nestjs/testing";
import { getModelToken } from "@nestjs/mongoose";
import { Model } from "mongoose";
import { NotFoundException } from "@nestjs/common";
import { PlayersService } from "src/players/service/player.service";
import { IPlayerDocument, PlayerDocument, Playerv1CollectionName } from "src/players/service/player.schema";

describe("PlayersService (Unit)", () => {
  let service: PlayersService;
  let model: Model<PlayerDocument>;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        PlayersService,
        {
          provide: getModelToken(Playerv1CollectionName),
          useValue: {
            find: jest.fn(),
            findOne: jest.fn(),
            create: jest.fn(),
            findByIdAndUpdate: jest.fn(),
            insertMany: jest.fn(),
            deleteOne: jest.fn()
          }
        }
      ]
    }).compile();

    service = module.get<PlayersService>(PlayersService);
    model = module.get<Model<PlayerDocument>>(getModelToken(Playerv1CollectionName));
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  test("findAll_ShouldReturnListOfPlayers", async () => {
    // Arrange
    const playerDocuments: IPlayerDocument[] = [
      { playerId: "123", avatarUri: "http://example.com/avatar.png", country: "US", isBanned: false, isActive: true, updateDate: new Date(), creationDate: new Date() }
    ];
    jest.spyOn(model, "find").mockReturnValue({
      lean: jest.fn().mockReturnThis(),
      exec: jest.fn().mockResolvedValue(playerDocuments)
    } as any);

    // Act
    const result = await service.findAll();

    // Assert
    expect(result).toHaveLength(1);
    expect(result[0].id).toBe(playerDocuments[0].playerId);
  });

  test("findOne_WithExistingId_ShouldReturnPlayer", async () => {
    // Arrange
    const playerId = "123";
    const playerDocument: IPlayerDocument = { playerId, avatarUri: "http://example.com/avatar.png", country: "US", isBanned: false, isActive: true, updateDate: new Date(), creationDate: new Date() };
    jest.spyOn(model, "findOne").mockReturnValue({
      lean: jest.fn().mockReturnThis(),
      exec: jest.fn().mockResolvedValue(playerDocument)
    } as any);

    // Act
    const result = await service.findOne(playerId);

    // Assert
    expect(result.id).toBe(playerDocument.playerId);
  });

  test("findOne_WithNonExistingId_ShouldThrowNotFoundException", async () => {
    // Arrange
    const playerId = "non-existing-id";
    jest.spyOn(model, "findOne").mockReturnValue({
      lean: jest.fn().mockReturnThis(),
      exec: jest.fn().mockResolvedValue(null)
    } as any);

    // Act & Assert
    await expect(service.findOne(playerId)).rejects.toThrow(NotFoundException);
  });

  test("createPlayer_WithValidData_ShouldReturnNewPlayer", async () => {
    // Arrange
    const playerData: IPlayerDocument = { playerId: "123", avatarUri: "http://example.com/avatar.png", country: "US", isBanned: false, isActive: true, updateDate: new Date(), creationDate: new Date() };
    jest.spyOn(model, "insertMany").mockResolvedValue(playerData as any);
    jest.spyOn(model, "findOne").mockReturnValue({
      lean: jest.fn().mockReturnThis(),
      exec: jest.fn().mockResolvedValue(playerData)
    } as any);

    // Act
    const result = await service.createPlayer(playerData as any);

    // Assert
    expect(result.id).toBe(playerData.playerId);
  });

  test("deletePlayer_WithExistingId_ShouldSucceed", async () => {
    // Arrange
    const playerId = "123";
    jest.spyOn(model, "deleteOne").mockReturnValue({
      lean: jest.fn().mockReturnThis(),
      exec: jest.fn().mockResolvedValue({ deletedCount: 1 } as any)
    } as any);

    // Act & Assert
    await expect(service.deletePlayer(playerId)).resolves.toBeUndefined();
  });

  test("deletePlayer_WithNonExistingId_ShouldThrowNotFoundException", async () => {
    // Arrange
    const playerId = "non-existing-id";
    jest.spyOn(model, "deleteOne").mockReturnValue({
      lean: jest.fn().mockReturnThis(),
      exec: jest.fn().mockResolvedValue({ deletedCount: 0 } as any)
    } as any);

    // Act & Assert
    await expect(service.deletePlayer(playerId)).rejects.toThrow(NotFoundException);
  });
});
