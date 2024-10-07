# 05_A_feat(global-game-api):_AddDbPersitancy_RewriteTests

# Prompts :

--------------------------------------------------------------------------------
## Request 01 analyse files
--------------------------------------------------------------------------------

**Prompt:**

"Act as a backend developer with expertise in **Node.js**, **NestJS**, and **TypeScript**. Analyze the TypeScript files attached and retain the relevant code in your memory for future reference. Once the analysis is complete, please confirm by responding with 'Done'."



--------------------------------------------------------------------------------
## Request 02 create test
--------------------------------------------------------------------------------

Can you update the unit test `player.service.test` to test the new code of `player.service.ts`

while adhering to the following guidelines:

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

--------------------------------------------------------------------------------
## Request 02 create test
--------------------------------------------------------------------------------


Can you create a unit test for the following class while adhering to the following guidelines:

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

class to be tested :

```Ts
import { plainToInstance } from 'class-transformer';
import { Player } from './player.models';
import { PlayerDocument } from './player.schema';

export class DbPlayerMapper {
  
  public static mapToEntity(playerDocument: PlayerDocument): Player {
    return plainToInstance(Player, {
      id: playerDocument.playerId,
      avatarUri: playerDocument.avatarUri,
      country: playerDocument.country,
      isBanned: playerDocument.isBanned,
      isActive: playerDocument.isActive,
      updateDate: playerDocument.updateDate,
      creationDate: playerDocument.creationDate,
    });
  }
}
```
