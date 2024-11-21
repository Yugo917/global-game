import { Test, TestingModule } from "@nestjs/testing";
import { INestApplication } from "@nestjs/common";
import request from "supertest";
import { MongooseModule } from "@nestjs/mongoose";
import { PlayersModule } from "src/players/module/players.module";
import { PlayerCreateApiV1 } from "src/players/api/players.models.dto";
import * as dotenv from "dotenv";
import { PlayersService } from "src/players/service/player.service";
import { getAppValidationPipe } from "src/main";

dotenv.config();

describe("PlayersController (Integration)", () => {
    let app: INestApplication;
    let playersService: PlayersService;

    beforeAll(async () => {
        const moduleFixture: TestingModule = await Test.createTestingModule({
            imports: [
                PlayersModule,
                MongooseModule.forRoot(process.env.MONGODB_URI as string)
            ]
        }).compile();

        app = moduleFixture.createNestApplication();
        app.useGlobalPipes(getAppValidationPipe());
        playersService = moduleFixture.get<PlayersService>(PlayersService);
        await app.init();
    });

    afterAll(async () => {
        await app.close();
    });

    // Utility function to create a player
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const createPlayer = async (playerData: PlayerCreateApiV1): Promise<any> => {
        return await request(app.getHttpServer())
            .post("/players")
            .send(playerData)
            .expect(201);
    };

    describe("findAll", () => {
        it("findAll_WithExistingPlayers_ShouldSucceed", async () => {
            // Arrange: Create sample player with all required properties
            await createPlayer({
                name: "John Doe",
                email: "john.doe@example.com",
                avatarUri: "http://example.com/avatar1.png",
                country: "US"
            });

            // Act 
            const response = await request(app.getHttpServer()).get("/players").expect(200);

            // Assert
            expect(response.body.length).toBeGreaterThan(0);
        });

        it("findAll_WithNoPlayers_ShouldReturnEmptyArray", async () => {
            // Arrange
            await playersService["playerModel"].deleteMany({});

            // Act & Assert
            const response = await request(app.getHttpServer()).get("/players").expect(200);
            expect(response.body).toEqual([]);
        });
    });

    describe("findOne", () => {
        it("findOne_WithValidId_ShouldReturnPlayer", async () => {
            // Arrange
            const { body: createdPlayer } = await createPlayer({
                name: "John Doe",
                email: "john.doe@example.com",
                avatarUri: "http://example.com/avatar2.png",
                country: "CN"
            });

            // Act & Assert
            const response = await request(app.getHttpServer())
                .get(`/players/${createdPlayer.id}`)
                .expect(200);

            expect(response.body.id).toBe(createdPlayer.id);
        });

        it("findOne_WithInvalidId_ShouldThrowNotFoundException", async () => {
            await request(app.getHttpServer()).get("/players/nonexistent-id").expect(404);
        });
    });

    describe("create", () => {
        it("create_WithValidData_ShouldReturnCreatedPlayer", async () => {
            const playerData = {
                name: "John Doe",
                email: "john.doe@example.com",
                avatarUri: "http://example.com/avatar3.png",
                country: "FR"
            };
            const response = await createPlayer(playerData);
            expect(response.body).toHaveProperty("id");
            expect(response.body.avatarUri).toBe(playerData.avatarUri);
        });

        it("create_WithMissingData_ShouldThrowError", async () => {
            const invalidPlayerData = { avatarUri: "" }; // Missing required data
            await request(app.getHttpServer()).post("/players").send(invalidPlayerData).expect(400);
        });

        it("create_WithNotConformData_ShouldThrowError", async () => {
            const invalidPlayerData = { avatarUri: 456, country: 123 }; // Invalid data types
            await request(app.getHttpServer()).post("/players").send(invalidPlayerData).expect(400);
        });
    });

    describe("update", () => {
        it("update_WithValidData_ShouldReturnUpdatedPlayer", async () => {
            // Arrange
            const { body: createdPlayer } = await createPlayer({
                name: "John Doe",
                email: "john.doe@example.com",
                avatarUri: "http://example.com/avatar4.png",
                country: "GR"
            });
            const updatedData = {
                avatarUri: "http://example.com/updated-avatar.png",
                country: "SP",
                thirdPartyIdentifiers: [{ id: "google_id", name: "google_name", email: "google_email@gmail.com", avatarUri: "google_avatarURI", gameServiceProvider: "Unknown" }]
            };

            // Act & Assert
            const response = await request(app.getHttpServer())
                .put(`/players/${createdPlayer.id}`)
                .send(updatedData)
                .expect(200);

            expect(response.body.avatarUri).toBe(updatedData.avatarUri);
            expect(response.body.country).toBe(updatedData.country);
        });

        it("update_WithNonExistingPlayer_ShouldThrowError", async () => {
            const updatedData = {
                avatarUri: "http://example.com/updated-avatar.png",
                country: "SP"
            };
            await request(app.getHttpServer()).put("/players/nonexistent-id").send(updatedData).expect(404);
        });

        it("update_WithMissingData_ShouldThrowError", async () => {
            // Arrange
            const { body: createdPlayer } = await createPlayer({
                name: "John Doe",
                email: "john.doe@example.com",
                avatarUri: "http://example.com/avatar5.png",
                country: "IT"
            });
            const invalidData = { avatarUri: "" }; // Missing required data

            // Act & Assert
            await request(app.getHttpServer())
                .put(`/players/${createdPlayer.id}`)
                .send(invalidData)
                .expect(400);
        });

        it("update_WithNotConformData_ShouldThrowError", async () => {
            // Arrange
            const { body: createdPlayer } = await createPlayer({
                name: "John Doe",
                email: "john.doe@example.com",
                avatarUri: "http://example.com/avatar6.png",
                country: "PT"
            });
            const invalidData = { avatarUri: "invalid-uri", country: 123 }; // Invalid data

            // Act & Assert
            await request(app.getHttpServer())
                .put(`/players/${createdPlayer.id}`)
                .send(invalidData)
                .expect(400);
        });
    });

    describe("delete", () => {
        it("delete_WithValidId_ShouldSucceed", async () => {
            // Arrange
            const { body: createdPlayer } = await createPlayer({
                name: "John Doe",
                email: "john.doe@example.com",
                avatarUri: "http://example.com/avatar7.png",
                country: "NT"
            });

            // Act & Assert
            await request(app.getHttpServer()).delete(`/players/${createdPlayer.id}`).expect(200);

            // Confirm deletion
            await request(app.getHttpServer()).get(`/players/${createdPlayer.id}`).expect(404);
        });

        it("delete_WithInvalidId_ShouldThrowError", async () => {
            await request(app.getHttpServer()).delete("/players/nonexistent-id").expect(404);
        });
    });

    describe("deactivate", () => {
        it("deactivate_WithValidId_ShouldReturnDeactivatedPlayer", async () => {
            // Arrange
            const { body: createdPlayer } = await createPlayer({
                name: "John Doe",
                email: "john.doe@example.com",
                avatarUri: "http://example.com/avatar8.png",
                country: "BR"
            });

            // Act & Assert
            const response = await request(app.getHttpServer())
                .patch(`/players/deactive/${createdPlayer.id}`)
                .expect(200);

            expect(response.body.isActive).toBe(false);
        });

        it("deactivate_WithAlreadyInactivePlayer_ShouldNotThrowError", async () => {
            // Arrange
            const { body: createdPlayer } = await createPlayer({
                name: "John Doe",
                email: "john.doe@example.com",
                avatarUri: "http://example.com/avatar9.png",
                country: "AR"
            });

            // First deactivate
            await request(app.getHttpServer()).patch(`/players/deactive/${createdPlayer.id}`).expect(200);

            // Attempt to deactivate again
            await request(app.getHttpServer()).patch(`/players/deactive/${createdPlayer.id}`).expect(200);
        });

        it("deactivate_WithInvalidId_ShouldThrowError", async () => {
            await request(app.getHttpServer()).patch("/players/nonexistent-id").expect(404);
        });
    });
});
