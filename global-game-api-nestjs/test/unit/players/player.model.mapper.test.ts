import { PlayerCreateApiV1, PlayerUpdateApiV1 } from "src/players/api/players.models.dto";
import { Player } from "src/players/service/player.models";
import { PlayerMapper } from "src/players/service/players.model.mapper";


describe('PlayerMapper', () => {
  let mapper: PlayerMapper;

  beforeEach(() => {
    mapper = new PlayerMapper();
  });

  describe('mapToDto', () => {
    test('mapToDto_WithValidPlayer_ShouldReturnPlayerApiDtoV1', () => {
      // Arrange
      const player: Player = {
        id: '1',
        avatarUri: 'https://example.com/avatar1.png',
        country: 'USA',
        isBanned: false,
        isActive: true,
        updateDate: new Date(),
        creationDate: new Date(),
      };
      // Act
      const playerDto = mapper.mapToDto(player);
      // Assert
      expect(playerDto).toBeDefined();
      expect(playerDto.id).toBe(player.id);
      expect(playerDto.country).toBe(player.country);
    });

    test('mapToDto_WithUndefinedPlayer_ShouldReturnUndefined', () => {
      // Arrange
      const player = undefined;
      // Act
      const playerDto = mapper.mapToDto(player as unknown as Player);
      // Assert
      expect(playerDto).toEqual(undefined);
    });
  });

  describe('mapToDtoList', () => {
    test('mapToDtoList_WithValidPlayerList_ShouldReturnDtoList', () => {
      // Arrange
      const players: Player[] = [
        {
          id: '1',
          avatarUri: 'https://example.com/avatar1.png',
          country: 'USA',
          isBanned: false,
          isActive: true,
          updateDate: new Date(),
          creationDate: new Date(),
        },
        {
          id: '2',
          avatarUri: 'https://example.com/avatar2.png',
          country: 'Canada',
          isBanned: false,
          isActive: true,
          updateDate: new Date(),
          creationDate: new Date(),
        },
      ];
      // Act
      const playerDtos = mapper.mapToDtoList(players);
      // Assert
      expect(playerDtos).toBeDefined();
      expect(playerDtos.length).toBe(players.length);
      expect(playerDtos[0].id).toBe(players[0].id);
    });

    test('mapToDtoList_WithEmptyPlayerList_ShouldReturnEmptyArray', () => {
      // Arrange
      const players: Player[] = [];
      // Act
      const playerDtos = mapper.mapToDtoList(players);
      // Assert
      expect(playerDtos).toEqual([]);
    });
  });

  describe('mapToEntity', () => {
    test('mapToEntity_WithValidCreateDto_ShouldReturnPlayerEntityWithoutId', () => {
      // Arrange
      const createDto: PlayerCreateApiV1 = {
        avatarUri: 'https://example.com/avatar3.png',
        country: 'UK'
      };
      // Act
      const playerEntity = mapper.mapToEntity(createDto);
      // Assert
      expect(playerEntity).toBeDefined();
      expect(playerEntity.avatarUri).toBe(createDto.avatarUri);
      expect(playerEntity.country).toBe(createDto.country);
    });

    test('mapToEntity_WithPartialCreateDto_ShouldMapPropertiesCorrectly', () => {
      // Arrange
      const createDto: Partial<PlayerCreateApiV1> = {
        country: 'Spain',
      };
      // Act
      const playerEntity = mapper.mapToEntity(createDto as PlayerCreateApiV1);
      // Assert
      expect(playerEntity.country).toBe('Spain');
    });
  });

  describe('mapToUpdatedEntity', () => {
    test('mapToUpdatedEntity_WithValidUpdateData_ShouldUpdatePlayerProperties', () => {
      // Arrange
      const existingPlayer: Player = {
        id: '1',
        avatarUri: 'https://example.com/avatar1.png',
        country: 'USA',
        isBanned: false,
        isActive: true,
        updateDate: new Date(),
        creationDate: new Date(),
      };
      const updateDto: PlayerUpdateApiV1 = {
        avatarUri: 'https://example.com/updated-avatar.png',
        country: 'Germany',
        isBanned: false,
      };
      // Act
      const updatedPlayer = mapper.mapToUpdatedEntity(existingPlayer, updateDto);
      // Assert
      expect(updatedPlayer).toBeDefined();
      expect(updatedPlayer.avatarUri).toBe(updateDto.avatarUri);
      expect(updatedPlayer.country).toBe(updateDto.country);
      expect(updatedPlayer.isBanned).toBe(updateDto.isBanned);
    });

    test('mapToUpdatedEntity_WithEmptyUpdateDto_ShouldReturnUnchangedPlayer', () => {
      // Arrange
      const existingPlayer: Player = {
        id: '1',
        avatarUri: 'https://example.com/avatar1.png',
        country: 'USA',
        isBanned: false,
        isActive: true,
        updateDate: new Date(),
        creationDate: new Date(),
      };
      const updateDto: Partial<PlayerUpdateApiV1> = {};
      // Act
      const updatedPlayer = mapper.mapToUpdatedEntity(existingPlayer, updateDto as PlayerUpdateApiV1);
      // Assert
      expect(updatedPlayer).toEqual(existingPlayer);
    });
  });

  describe('mapToDeactivatedEntity', () => {
    test('mapToDeactivatedEntity_WithIsActiveFalse_ShouldDeactivatePlayer', () => {
      // Arrange
      const existingPlayer: Player = {
        id: '1',
        avatarUri: 'https://example.com/avatar1.png',
        country: 'USA',
        isBanned: false,
        isActive: true,
        updateDate: new Date(),
        creationDate: new Date(),
      };
      // Act
      const deactivatedPlayer = mapper.mapToDeactivatedEntity(existingPlayer, false);
      // Assert
      expect(deactivatedPlayer.isActive).toBe(false);
    });

    test('mapToDeactivatedEntity_WithIsActiveTrue_ShouldActivatePlayer', () => {
      // Arrange
      const existingPlayer: Player = {
        id: '1',
        avatarUri: 'https://example.com/avatar1.png',
        country: 'USA',
        isBanned: false,
        isActive: false,
        updateDate: new Date(),
        creationDate: new Date(),
      };
      // Act
      const activatedPlayer = mapper.mapToDeactivatedEntity(existingPlayer, true);
      // Assert
      expect(activatedPlayer.isActive).toBe(true);
    });
  });
});
