import { NotFoundException } from '@nestjs/common';
import { Player } from 'src/players/service/player.models';
import { PlayersService } from 'src/players/service/players.service';

describe('PlayersService', () => {
  let service: PlayersService;

  beforeEach(() => {
    service = new PlayersService();
  });

  describe('findAll', () => {
    test('findAll_WithPlayersInDatabase_ShouldReturnAllPlayers', () => {
      // Arrange
      // Act
      const players = service.findAll();
      // Assert
      expect(players).toBeDefined();
      expect(players.length).toBeGreaterThan(0);
    });

    test('findAll_WithNoPlayers_ShouldReturnEmptyArray', () => {
      // Arrange
      service['players'] = [];
      // Act
      const players = service.findAll();
      // Assert
      expect(players).toEqual([]);
    });
  });

  describe('findOne', () => {
    test('findOne_WithExistingPlayerId_ShouldReturnPlayer', () => {
      // Arrange
      const playerId = '1';
      // Act
      const player = service.findOne(playerId);
      // Assert
      expect(player).toBeDefined();
      expect(player.id).toBe(playerId);
    });

    test('findOne_WithNonExistingPlayerId_ShouldThrowNotFoundException', () => {
      // Arrange
      const playerId = 'non-existing-id';
      // Act
      const action = () => service.findOne(playerId);
      // Assert
      expect(action).toThrow(NotFoundException);
    });

    test('findOne_WithInvalidFormatId_ShouldThrowNotFoundException', () => {
      // Arrange
      const playerId = '';
      // Act
      const action = () => service.findOne(playerId);
      // Assert
      expect(action).toThrow(NotFoundException);
    });
  });

  describe('createPlayer', () => {
    test('createPlayer_WithValidPlayerData_ShouldCreateAndReturnPlayer', () => {
      // Arrange
      const playerData: Omit<Player, 'id'> = {
        avatarUri: 'https://example.com/avatar3.png',
        country: 'UK',
        isBanned: false,
        isActive: true,
        creationDate: new Date(),
        updateDate: new Date(),
      };
      // Act
      const newPlayer = service.createPlayer(playerData);
      // Assert
      expect(newPlayer).toBeDefined();
      expect(newPlayer.id).toBeDefined();
      expect(newPlayer.country).toBe('UK');
    });

    test('createPlayer_WithEmptyPlayerData_ShouldCreatePlayerWithDefaults', () => {
      // Arrange
      const playerData: Omit<Player, 'id'> = {
        avatarUri: '',
        country: '',
        isBanned: false,
        isActive: true,
        creationDate: new Date(),
        updateDate: new Date(),
      };
      // Act
      const newPlayer = service.createPlayer(playerData);
      // Assert
      expect(newPlayer).toBeDefined();
      expect(newPlayer.id).toBeDefined();
      expect(newPlayer.country).toBe('');
    });
  });

  describe('updatePlayer', () => {
    test('updatePlayer_WithExistingPlayerId_ShouldUpdatePlayerData', () => {
      // Arrange
      const playerId = '1';
      const updatedData: Omit<Player, 'id'> = {
        avatarUri: 'https://example.com/new-avatar.png',
        country: 'France',
        isBanned: false,
        isActive: true,
        creationDate: new Date(),
        updateDate: new Date(),
      };
      // Act
      const updatedPlayer = service.updatePlayer(playerId, updatedData);
      // Assert
      expect(updatedPlayer).toBeDefined();
      expect(updatedPlayer.country).toBe('France');
    });

    test('updatePlayer_WithNonExistingPlayerId_ShouldThrowNotFoundException', () => {
      // Arrange
      const playerId = 'non-existing-id';
      const updatedData: Omit<Player, 'id'> = {
        avatarUri: 'https://example.com/new-avatar.png',
        country: 'France',
        isBanned: false,
        isActive: true,
        creationDate: new Date(),
        updateDate: new Date(),
      };
      // Act
      const action = () => service.updatePlayer(playerId, updatedData);
      // Assert
      expect(action).toThrow(NotFoundException);
    });
  });

  describe('deletePlayer', () => {
    test('deletePlayer_WithExistingPlayerId_ShouldRemovePlayer', () => {
      // Arrange
      const playerId = '1';
      // Act
      service.deletePlayer(playerId);
      // Assert
      expect(() => service.findOne(playerId)).toThrow(NotFoundException);
    });

    test('deletePlayer_WithNonExistingPlayerId_ShouldThrowNotFoundException', () => {
      // Arrange
      const playerId = 'non-existing-id';
      // Act
      const action = () => service.deletePlayer(playerId);
      // Assert
      expect(action).toThrow(NotFoundException);
    });
  });

  describe('deactivatePlayer', () => {
    test('deactivatePlayer_WithExistingPlayerId_ShouldSetIsActiveToFalse', () => {
      // Arrange
      const playerId = '1';
      // Act
      const deactivatedPlayer = service.deactivatePlayer(playerId);
      // Assert
      expect(deactivatedPlayer.isActive).toBe(false);
    });

    test('deactivatePlayer_WithNonExistingPlayerId_ShouldThrowNotFoundException', () => {
      // Arrange
      const playerId = 'non-existing-id';
      // Act
      const action = () => service.deactivatePlayer(playerId);
      // Assert
      expect(action).toThrow(NotFoundException);
    });
  });
});
