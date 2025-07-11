import { Test, TestingModule } from "@nestjs/testing";
import { MongooseModule } from "@nestjs/mongoose";
import * as dotenv from "dotenv";
import { PlayersService } from "src/players/service/player.service";
import { Playerv1CollectionName, PlayerV1Schema } from "src/players/service/player.schema";
import { CreatePlayer, Player, UpdatePlayer } from "src/players/service/player.models";
import { v4 as uuidv4 } from "uuid";

dotenv.config();

describe("PlayersService (Integration)", () => {
    let playersService: PlayersService;

    beforeAll(async () => {
        const moduleFixture: TestingModule = await Test.createTestingModule({
            imports: [
                MongooseModule.forRoot(process.env.MONGODB_URI as string),
                MongooseModule.forFeature([{ name: Playerv1CollectionName, schema: PlayerV1Schema }])
            ],
            providers: [PlayersService]
        }).compile();

        playersService = moduleFixture.get<PlayersService>(PlayersService);
    });

    afterAll(async () => {
        const connection = playersService["playerModel"].db;
        await connection.close();
    });

    describe("findAll", () => {
        it("findAll_WithExistingPlayers_ShouldSucceed", async () => {
            // Arrange:
            const player1Data: CreatePlayer = {
                name: uuidv4(),
                email: `${uuidv4()}@gmail.com`,
                avatarUri: `http://example.com/${uuidv4()}.png`,
                avatarName: "bear",
                country: "FR"
            };
            const createdPlayer1 = await playersService.create(player1Data);
            const expectedPlayer1: Player = {
                id: createdPlayer1.id,
                name: player1Data.name,
                email: player1Data.email,
                avatarUri: player1Data.avatarUri,
                avatarName: player1Data.avatarName,
                country: player1Data.country,
                thirdPartyIdentifiers: [],
                isBanned: false,
                isActive: true,
                updateDate: createdPlayer1.updateDate,
                creationDate: createdPlayer1.creationDate
            }
            const player2Data: CreatePlayer = {
                name: uuidv4(),
                email: `${uuidv4()}@gmail.com`,
                avatarUri: `http://example.com/${uuidv4()}.png`,
                avatarName: "rabbit",
                country: "US"
            };
            const createdPlayer2 = await playersService.create(player2Data);
            const expectedPlayer2: Player = {
                id: createdPlayer2.id,
                name: player2Data.name,
                email: player2Data.email,
                avatarUri: player2Data.avatarUri,
                avatarName: player2Data.avatarName,
                country: player2Data.country,
                thirdPartyIdentifiers: [],
                isBanned: false,
                isActive: true,
                updateDate: createdPlayer2.updateDate,
                creationDate: createdPlayer2.creationDate
            }

            // Act
            const players = await playersService.findAll();

            // Assert
            expect(players.length).toBeGreaterThan(0);
            expect(players.find(f => f.id === createdPlayer1.id)).toEqual(expectedPlayer1);
            expect(players.find(f => f.id === createdPlayer1.id)!.updateDate).toBeDateCloseTo(new Date(), 1000);
            expect(players.find(f => f.id === createdPlayer1.id)!.creationDate).toBeDateCloseTo(new Date(), 1000);
            expect(players.find(f => f.id === createdPlayer2.id)).toEqual(expectedPlayer2);
        });

        // it.skip("findAll_WithNoPlayers_ShouldReturnEmptyArray", async () => {
        //     //Arrange
        //     await playersService["playerModel"].deleteMany({});

        //     // Act
        //     const players = await playersService.findAll();

        //     // Assert
        //     expect(players).toEqual([]);
        // });
    });

    describe("findOne", () => {
        it("findOne_WithValidId_ShouldReturnPlayer", async () => {
            // Arrange
            const player: CreatePlayer = {
                name: uuidv4(),
                email: `${uuidv4()}@gmail.com`,
                avatarUri: `http://example.com/${uuidv4()}.png`,
                avatarName: "zebra",
                country: "CA"
            }
            const createdPlayer = await playersService.create(player);

            // Act
            const foundPlayer = await playersService.findOne(createdPlayer.id);

            // Assert
            expect(foundPlayer).toEqual(createdPlayer);
        });

        it("findOne_WithInvalidId_ShouldThrowNotFoundException", async () => {
            await expect(playersService.findOne("invalid-id")).rejects.toThrow("Player with id invalid-id not found");
        });
    });

    describe("create", () => {
        it("create_WithValidData_ShouldReturnCreatedPlayer", async () => {
            // Arrange
            const playerData: CreatePlayer = {
                name: uuidv4(),
                email: `${uuidv4()}@gmail.com`,
                avatarUri: `http://example.com/${uuidv4()}.png`,
                avatarName: "penguin",
                country: "FR"
            };

            // Act
            const createdPlayer = await playersService.create(playerData);

            // Assert
            const expectedResult: Player = {
                name: playerData.name,
                email: playerData.email,
                avatarUri: playerData.avatarUri,
                avatarName: playerData.avatarName,
                country: playerData.country,
                thirdPartyIdentifiers: [],
                isActive: true,
                isBanned: false,
                creationDate: createdPlayer.creationDate,
                updateDate: createdPlayer.updateDate,
                id: createdPlayer.id
            }
            expect(createdPlayer).toEqual(expectedResult);
            expect(createdPlayer.updateDate).toBeDateCloseTo(new Date(), 1000);
            expect(createdPlayer.creationDate).toBeDateCloseTo(new Date(), 1000);
        });

        it("create_WithMissingData_ShouldThrowError", async () => {
            const invalidPlayerData = { avatarUri: "" }; // Missing required fields

            // eslint-disable-next-line @typescript-eslint/no-explicit-any
            await expect(playersService.create(invalidPlayerData as any)).rejects.toThrow();
        });
    });

    describe("search", () => {


        it("search_ByName_ShouldReturnPlayer", async () => {
            const uniqueName = uuidv4();
            const playerData: CreatePlayer = {
                name: uniqueName,
                email: `${uuidv4()}@example.com`,
                avatarUri: `http://example.com/${uuidv4()}.png`,
                avatarName: "rabbit",
                country: "FR"
            };
            const createdPlayer = await playersService.create(playerData);

            const results = await playersService.search({
                names: [uniqueName],
                nbRows: 10
            });

            expect(results.length).toBe(1);
            expect(results[0].id).toBe(createdPlayer.id);
        });

        it("search_ByEmail_ShouldReturnPlayer", async () => {
            const uniqueEmail = `${uuidv4()}@example.com`;
            const playerData: CreatePlayer = {
                name: uuidv4(),
                email: uniqueEmail,
                avatarUri: `http://example.com/${uuidv4()}.png`,
                avatarName: "rhino",
                country: "US"
            };
            const createdPlayer = await playersService.create(playerData);

            const results = await playersService.search({
                emails: [uniqueEmail],
                nbRows: 10
            });

            expect(results.length).toBe(1);
            expect(results[0].id).toBe(createdPlayer.id);
        });

        it("search_ByCreationDateRange_ShouldReturnPlayer", async () => {
            const playerData: CreatePlayer = {
                name: uuidv4(),
                email: `${uuidv4()}@example.com`,
                avatarUri: `http://example.com/${uuidv4()}.png`,
                avatarName: "buffalo",
                country: "BE"
            };
            const createdPlayer = await playersService.create(playerData);

            const start = new Date(Date.now() - 60 * 1000);
            const end = new Date(Date.now() + 60 * 1000);

            const results = await playersService.search({
                creationDateStart: start,
                creationDateEnd: end,
                nbRows: 10
            });

            expect(results.length).toBe(1);
            expect(results[0].id).toBe(createdPlayer.id);
        });

        it("search_ByThirdPartyId_ShouldReturnPlayer", async () => {
            const playerData: CreatePlayer = {
                name: uuidv4(),
                email: `${uuidv4()}@example.com`,
                avatarUri: `http://example.com/${uuidv4()}.png`,
                avatarName: "crocodile",
                country: "DE"
            };
            const createdPlayer = await playersService.create(playerData);
            const thirdPartyId = uuidv4();
            await playersService.update(createdPlayer.id, {
                // eslint-disable-next-line no-restricted-syntax
                ...playerData, thirdPartyIdentifiers: [
                    { id: thirdPartyId, name: "third", email: `${uuidv4()}@gmail.com`, avatarUri: "google_avatarURI", gameServiceProvider: "Unknown" }
                ]
            })

            const results = await playersService.search({
                thirdPartyIds: [thirdPartyId],
                nbRows: 10
            });

            expect(results.length).toBe(1);
            expect(results[0].id).toBe(createdPlayer.id);
        });

        it("search_withMultiCriteria_ShouldReturnPlayer", async () => {
            const uniqueName = uuidv4();
            const uniqueEmail = `${uuidv4()}@example.com`;
            const thirdPartyName = "discord";
            const thirdPartyId = uuidv4();
            const thirdPartyEmail = `${uuidv4()}@discord.com`;

            const playerData: CreatePlayer = {
                name: uniqueName,
                email: uniqueEmail,
                avatarUri: `http://example.com/${uuidv4()}.png`,
                avatarName: "seal",
                country: "CA"
            };
            const createdPlayer = await playersService.create(playerData);

            await playersService["playerModel"].updateOne(
                { playerId: createdPlayer.id },
                {
                    $set: {
                        thirdPartyIdentifiers: [
                            { name: thirdPartyName, id: thirdPartyId, email: thirdPartyEmail }
                        ]
                    }
                }
            ).exec();

            const results = await playersService.search({
                names: [uniqueName],
                emails: [uniqueEmail],
                thirdPartyNames: [thirdPartyName],
                thirdPartyIds: [thirdPartyId],
                thirdPartyEmails: [thirdPartyEmail],
                nbRows: 10
            });

            expect(results.length).toBe(1);
            expect(results[0].id).toBe(createdPlayer.id);
        });

        it("search_WithNoCriteria_ShouldReturnLimitedResults", async () => {
            const playerData: CreatePlayer = {
                name: uuidv4(),
                email: `${uuidv4()}@example.com`,
                avatarUri: `http://example.com/${uuidv4()}.png`,
                avatarName: "pig",
                country: "UK"
            };
            await playersService.create(playerData);

            const results = await playersService.search({
                nbRows: 5
            });

            expect(results.length).toBeLessThanOrEqual(5);
        });

        it("search_WithNonMatchingCriteria_ShouldReturnEmptyArray", async () => {
            const playerData: CreatePlayer = {
                name: uuidv4(),
                email: `${uuidv4()}@example.com`,
                avatarUri: `http://example.com/${uuidv4()}.png`,
                avatarName: "giraffe",
                country: "IT"
            };
            await playersService.create(playerData);

            const results = await playersService.search({
                names: ["NotMatching"],
                nbRows: 10
            });

            expect(results).toEqual([]);
        });
    });


    describe("update", () => {
        it("update_WithValidData_ShouldReturnUpdatedPlayer", async () => {
            // Arrange
            const playerData: CreatePlayer = {
                name: uuidv4(),
                email: `${uuidv4()}@gmail.com`,
                avatarUri: `http://example.com/${uuidv4()}.png`,
                avatarName: "hippo",
                country: "GR"
            };
            const createdPlayer = await playersService.create(playerData);

            const updatePlayerData: UpdatePlayer = {
                avatarUri: `http://example.com/${uuidv4()}.png`,
                avatarName: "koala",
                country: "FR",
                thirdPartyIdentifiers: [{ id: "google_id", name: "google_name", email: "google_email@gmail.com", avatarUri: "google_avatarURI", gameServiceProvider: "Unknown" }]
            }

            // Act
            const updatedPlayer = await playersService.update(createdPlayer.id, updatePlayerData);

            // Assert
            expect(updatedPlayer).toMatchObject(updatePlayerData);
        });

        it("update_WithNonExistingPlayer_ShouldThrowError", async () => {
            // Arrange
            const updatedData: UpdatePlayer = {
                avatarUri: "http://example.com/updated-avatar.png",
                avatarName: "owl",
                country: "Spain",
                thirdPartyIdentifiers: []
            };

            // Act & Assert
            await expect(playersService.update("nonexistent-id", updatedData)).rejects.toThrow("Player with id nonexistent-id not found");
        });
    });

    describe("delete", () => {
        it("delete_WithValidId_ShouldThrowError", async () => {
            // Arrange
            const createdPlayer = await playersService.create({
                name: uuidv4(),
                email: `${uuidv4()}@gmail.com`,
                avatarUri: "http://example.com/avatar5.png",
                avatarName: "duck",
                country: "NE"
            });

            // Act
            await playersService.delete(createdPlayer.id);

            // Assert
            await expect(playersService.findOne(createdPlayer.id)).rejects.toThrow(`Player with id ${createdPlayer.id} not found`);
        });

        it("delete_WithInvalidId_ShouldThrowError", async () => {
            await expect(playersService.delete("invalid-id")).rejects.toThrow("Player with id invalid-id not found");
        });
    });

    describe("deactivate", () => {
        it("deactivate_WithValidId_ShouldReturnDeactivatedPlayer", async () => {
            // Arrange
            const createdPlayer = await playersService.create({
                name: uuidv4(),
                email: `${uuidv4()}@gmail.com`,
                avatarUri: "http://example.com/avatar6.png",
                avatarName: "camel",
                country: "BR"
            });

            // Act
            const deactivatedPlayer = await playersService.deactivate(createdPlayer.id);

            // Assert
            expect(deactivatedPlayer.isActive).toBe(false);
        });

        it("deactivate_WithAlreadyInactivePlayer_ShouldNotThrowError", async () => {
            // Arrange
            const createdPlayer = await playersService.create({
                name: uuidv4(),
                email: `${uuidv4()}@gmail.com`,
                avatarUri: "http://example.com/avatar7.png",
                avatarName: "moose",
                country: "AR"
            });

            // First deactivate the player
            await playersService.deactivate(createdPlayer.id);

            // Act & Assert: Trying to deactivate again should throw an error
            expect(async () => { await playersService.deactivate(createdPlayer.id) }).not.toThrow();
        });

        it("deactivate_WithInvalidId_ShouldThrowError", async () => {
            await expect(playersService.deactivate("invalid-id")).rejects.toThrow("Player with id invalid-id not found");
        });
    });
});
