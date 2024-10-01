## Request01 Unit tests and orientation:

Act as a backend developer experienced in **Node.js**, **NestJS**, and **TypeScript**, specializing in **scalability** and **maintainability** of code. Apply **SOLID** principles, **clean code**, and **clean architecture** practices.

Can you create a unit test file for the following classe while adhering to the following guidelines:

1. **Mocking Dependencies**:
   - Each injected dependency (via DI) should be mocked using its **interface**, if available. Otherwise, directly mock the class.
   
2. **Atomicity of Tests**:
   - Ensure each test is **atomic** (only one behavior per test).

3. **Test Cases**:
   - Each method should be tested with:
     - **A successful case**.
     - **Two edge cases**.
     - If the method throws specific exceptions, create tests to verify that these errors are correctly thrown.

4. **Test Structure**:
   - All tests should follow the **Arrange, Act, Assert** (AAA) pattern for clear structuring:
     - **Arrange**: Set up the necessary conditions for the test (mock dependencies, prepare data, etc.).
     - **Act**: Execute the action being tested (call the target method or function).
     - **Assert**: Verify that the result matches the expected outcome (compare results, check exceptions, etc.).

   - Follow the example code provided below for structuring and naming tests. Also, adapt the behavior in your tests to properly separate the action from the assertion, particularly in cases of asynchronous methods or when exceptions are expected.

   - For tests like **MyAsyncMethodToTest_WithSpecificUseCase_ShouldThrowExceptionType**, ensure that **the action** and **the assert** are well separated, as shown in `fileSample`.

5. **Test Naming Convention**:
   - Follow the naming convention "MyMethodToTest_WithSpecificUseCase_ShouldSucceed" or "MyMethodToTest_WithSpecificUseCase_ShouldThrowExceptionType," as shown in `fileSample`:

Here is `fileSample`:
```typescript
describe("MyClassToTest", () => {

  test("MyMethodToTest_WithSpecificUseCase_ShouldSucceed", () => {
    // Arrange
    // Act
    // Assert
  });

  test("MyMethodToTest_WithSpecificUseCase_ShouldThrowExceptionType", () => {
    // Arrange
    // Act
    const action = () => {
      throw new Error("my error");
    };
    // Assert
    expect(() => {
      action();
    }).toThrow("my error");
  });

  test("MyAsyncMethodToTest_WithSpecificUseCase_ShouldSucceed", async () => {
    // Arrange
    // Act
    // Assert
  });

  test("MyAsyncMethodToTest_WithSpecificUseCase_ShouldThrowExceptionType", async () => {
    // Arrange
    // Act
    const action = async () => {
      throw new Error("my error");
    };
    // Assert
    expect(async () => {
      await action();
    }).toThrow("my error");
  });

});
```

Ensure that test coverage is comprehensive and error cases are properly handled.

The class to be tested : 

```TS
// players.controller.ts
import { Injectable, NotFoundException } from '@nestjs/common';
import { Player } from './player.models';

@Injectable()
export class PlayersService {
  private players: Player[] = [
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

  public findAll(): Player[] {
    return this.players;
  }

  public findOne(id: string): Player {
    const player = this.players.find((player) => player.id === id);
    if (!player) {
      throw new NotFoundException(`Player with id ${id} not found`);
    }
    return player;
  }

  public createPlayer(player: Omit<Player, 'id'>): Player {
    const newPlayer: Player = {
      ...player,
      id: (this.players.length + 1).toString(),
      creationDate: new Date(),
      updateDate: new Date(),
    };
    this.players.push(newPlayer);
    return newPlayer;
  }

  public updatePlayer(id: string, updatedData: Omit<Player, 'id'>): Player {
    const index = this.players.findIndex((player) => player.id === id);
    if (index === -1) {
      throw new NotFoundException(`Player with id ${id} not found`);
    }
    const updatedPlayer = {
      ...this.players[index],
      ...updatedData,
      updateDate: new Date(),
    };
    this.players[index] = updatedPlayer;
    return updatedPlayer;
  }

  public deletePlayer(id: string): void {
    const index = this.players.findIndex((player) => player.id === id);
    if (index === -1) {
      throw new NotFoundException(`Player with id ${id} not found`);
    }
    this.players.splice(index, 1);
  }

  public deactivatePlayer(id: string): Player {
    const index = this.players.findIndex((player) => player.id === id);
    if (index === -1) {
      throw new NotFoundException(`Player with id ${id} not found`);
    }
    this.players[index].isActive = false;
    this.players[index].updateDate = new Date();
    return this.players[index];
  }
}
```

---
# Request 02

and for this class :

```TS
import { plainToInstance } from "class-transformer";
import { PlayerApiDtoV1, PlayerCreateApiV1, PlayerUpdateApiV1 } from "../api/players.models.dto";
import { Injectable } from "@nestjs/common";
import { Player } from "./player.models";

@Injectable()
export class PlayerMapper {
  
  // Method to map Player to PlayerApiDtoV1
  public mapToDto(player: Player): PlayerApiDtoV1 {
    return plainToInstance(PlayerApiDtoV1, player);
  }

  // Method to map a list of Player entities to a list of PlayerApiDtoV1 DTOs
  public mapToDtoList(players: Player[]): PlayerApiDtoV1[] {
    return players.map(player => this.mapToDto(player));
  }

  // Method to map PlayerCreateApiV1 to Player (excluding ID)
  public mapToEntity(createPlayerDto: PlayerCreateApiV1): Omit<Player, 'id'> {
    return plainToInstance(Player, createPlayerDto);
  }

  // Method to update an existing Player with PlayerUpdateApiV1 data
  public mapToUpdatedEntity(existingPlayer: Player, updatePlayerDto: PlayerUpdateApiV1): Player {
    return { ...existingPlayer, ...plainToInstance(Player, updatePlayerDto) };
  }

  // Method to update Player's active status for deactivation
  public mapToDeactivatedEntity(existingPlayer: Player, isActive: boolean): Player {
    return { ...existingPlayer, isActive };
  }
}

```
