import { ValidationPipe } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';
import { PlayersController } from 'src/players/api/players.controller';
import { PlayerCreateApiV1, PlayerUpdateApiV1 } from 'src/players/api/players.models.dto';
import { Player } from 'src/players/service/player.models';
import { PlayerMapper } from 'src/players/service/players.model.mapper';
import { PlayersService } from 'src/players/service/players.service';

describe('PlayersController', () => {
  let playersController: PlayersController;
  let playersService: jest.Mocked<PlayersService>;
  let playerMapper: PlayerMapper;

  beforeEach(async () => {

    const playersServiceMock: Partial<jest.Mocked<PlayersService>> = {
      findAll: jest.fn(),
      findOne: jest.fn(),
      createPlayer: jest.fn(),
      updatePlayer: jest.fn(),
      deletePlayer: jest.fn(),
      deactivatePlayer: jest.fn(),
    };

    const module: TestingModule = await Test.createTestingModule({
      controllers: [PlayersController],
      providers: [
        { provide: PlayersService, useValue: playersServiceMock },
        PlayerMapper
      ],
    }).compile();

    playersController = module.get<PlayersController>(PlayersController);
    playersService = module.get(PlayersService);
    playerMapper = new PlayerMapper();

    // Set up the global ValidationPipe for the module
    await module.createNestApplication().useGlobalPipes(new ValidationPipe()).init();
  });
  

  describe('findAll', () => {
    test('findAll_WithExistingPlayers_ShouldSucceed', () => {
      // Arrange
      const players: Player[] = [
        {
          id: '1',
          avatarUri: 'https://example.com/avatar.png',
          country: 'USA',
          isBanned: false,
          isActive: true,
          creationDate: new Date(),
          updateDate: new Date(),
        },
      ];
      playersService.findAll.mockReturnValue(players);
      const expectedDtoList = playerMapper.mapToDtoList(players);

      // Act
      const result = playersController.findAll();

      // Assert
      expect(result).toEqual(expectedDtoList);
      expect(playersService.findAll).toHaveBeenCalledTimes(1);
    });

    test('findAll_WithNoPlayers_ShouldReturnEmptyArray', () => {
      // Arrange
      playersService.findAll.mockReturnValue([]);
      
      // Act
      const result = playersController.findAll();

      // Assert
      expect(result).toEqual([]);
      expect(playersService.findAll).toHaveBeenCalledTimes(1);
    });
  });

  describe('findOne', () => {
    test('findOne_WithValidId_ShouldReturnPlayer', () => {
      // Arrange
      const id = '1';
      const player: Player = {
        id,
        avatarUri: 'https://example.com/avatar.png',
        country: 'USA',
        isBanned: false,
        isActive: true,
        creationDate: new Date(),
        updateDate: new Date(),
      };
      playersService.findOne.mockReturnValue(player);
      const expectedDto = playerMapper.mapToDto(player);

      // Act
      const result = playersController.findOne(id);

      // Assert
      expect(result).toEqual(expectedDto);
      expect(playersService.findOne).toHaveBeenCalledWith(id);
      expect(playersService.findOne).toHaveBeenCalledTimes(1);
    });

    test('findOne_WithInvalidId_ShouldThrowNotFoundException', () => {
      // Arrange
      const id = 'invalid-id';
      playersService.findOne.mockImplementation(() => {
        throw new Error('Player not found');
      });

      // Act & Assert
      expect(() => playersController.findOne(id)).toThrow('Player not found');
      expect(playersService.findOne).toHaveBeenCalledWith(id);
    });
  });

  describe('create', () => {
    test('create_WithValidData_ShouldReturnCreatedPlayer', () => {
      // Arrange
      const createDto: PlayerCreateApiV1 = { avatarUri: 'https://example.com/avatar.png', country: 'USA' };
      const playerEntity: Player = {
        id: '1',
        avatarUri: createDto.avatarUri,
        country: createDto.country,
        isBanned: false,
        isActive: true,
        creationDate: new Date(),
        updateDate: new Date(),
      };
      playersService.createPlayer.mockReturnValue(playerEntity);
      const expectedDto = playerMapper.mapToDto(playerEntity);

      // Act
      const result = playersController.create(createDto);

      // Assert
      expect(result).toEqual(expectedDto);
      expect(playersService.createPlayer).toHaveBeenCalledWith(playerMapper.mapToEntity(createDto));
      expect(playersService.createPlayer).toHaveBeenCalledTimes(1);
    });

    // need to enable ValidationPipe but i don't know how
    // test('create_WithEmptyCountry_ShouldThrowError', () => {
    // const createDto: PlayerCreateApiV1 = { avatarUri: 'https://example.com/avatar.png', country: '' };
    // const action = () =>
    //   {
    //     try {
    //       playersController.create(createDto);
    //     } catch (error) {
    //       console.log('catch------------');
    //       console.log(error);
    //     } 
        
    //   }
    // // Act & Assert
    // expect(() => {
		// 	action()			
		// }).toThrow('country should not be empty'); // Expect an appropriate validation error
    // expect(playersService.createPlayer).not.toHaveBeenCalled();
    // });
  });

  describe('update', () => {
    test('update_WithValidData_ShouldReturnUpdatedPlayer', () => {
      // Arrange
      const id = '1';
      const updateDto: PlayerUpdateApiV1 = { avatarUri: 'https://example.com/avatar-updated.png', country: 'USA', isBanned: false };
      const updatedPlayer: Player = {
        id,
        avatarUri: updateDto.avatarUri,
        country: updateDto.country,
        isBanned: updateDto.isBanned,
        isActive: true,
        creationDate: new Date(),
        updateDate: new Date(),
      };
      playersService.updatePlayer.mockReturnValue(updatedPlayer);
      const expectedDto = playerMapper.mapToDto(updatedPlayer);

      // Act
      const result = playersController.update(id, updateDto);

      // Assert
      expect(result).toEqual(expectedDto);
      expect(playersService.updatePlayer).toHaveBeenCalledWith(id, playerMapper.mapToEntity(updateDto));
      expect(playersService.updatePlayer).toHaveBeenCalledTimes(1);
    });

    test('update_WithNonExistingPlayer_ShouldThrowError', () => {
      // Arrange
      const id = 'non-existing-id';
      const updateDto: PlayerUpdateApiV1 = { avatarUri: 'https://example.com/avatar-updated.png', country: 'USA', isBanned: false };

      playersService.updatePlayer.mockImplementation(() => {
        throw new Error('Player not found');
      });

      // Act & Assert
      expect(() => playersController.update(id, updateDto)).toThrow('Player not found');
      expect(playersService.updatePlayer).toHaveBeenCalledWith(id, playerMapper.mapToEntity(updateDto));
    });
  });

  describe('delete', () => {
    test('delete_WithValidId_ShouldSucceed', () => {
      // Arrange
      const id = '1';

      // Act
      playersController.delete(id);

      // Assert
      expect(playersService.deletePlayer).toHaveBeenCalledWith(id);
      expect(playersService.deletePlayer).toHaveBeenCalledTimes(1);
    });

    test('delete_WithInvalidId_ShouldThrowError', () => {
      // Arrange
      const id = 'invalid-id';
      playersService.deletePlayer.mockImplementation(() => {
        throw new Error('Player not found');
      });

      // Act & Assert
      expect(() => playersController.delete(id)).toThrow('Player not found');
      expect(playersService.deletePlayer).toHaveBeenCalledWith(id);
    });
  });

  describe('deactivate', () => {
    test('deactivate_WithValidId_ShouldReturnDeactivatedPlayer', () => {
      // Arrange
      const id = '1';
      const deactivatedPlayer: Player = {
        id,
        avatarUri: 'https://example.com/avatar.png',
        country: 'USA',
        isBanned: false,
        isActive: false,
        creationDate: new Date(),
        updateDate: new Date(),
      };
      playersService.deactivatePlayer.mockReturnValue(deactivatedPlayer);
      const expectedDto = playerMapper.mapToDto(deactivatedPlayer);

      // Act
      const result = playersController.deactivate(id);

      // Assert
      expect(result).toEqual(expectedDto);
      expect(playersService.deactivatePlayer).toHaveBeenCalledWith(id);
      expect(playersService.deactivatePlayer).toHaveBeenCalledTimes(1);
    });

    test('deactivate_WithAlreadyInactivePlayer_ShouldThrowError', () => {
      // Arrange
      const id = '2';
      playersService.deactivatePlayer.mockImplementation(() => {
        throw new Error('Player is already inactive');
      });

      // Act & Assert
      expect(() => playersController.deactivate(id)).toThrow('Player is already inactive');
      expect(playersService.deactivatePlayer).toHaveBeenCalledWith(id);
    });
  });
});
