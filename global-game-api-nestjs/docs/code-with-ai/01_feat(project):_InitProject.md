## Request01 (Orientation):

Act as a backend developer experienced in Node.js, NestJS, and TypeScript, specializing in code scalability and maintainability. Adhere to SOLID principles, clean code, and clean architecture.

Could you create an example of a Web API with dependency injection in the controller using the latest version of NestJS and the latest version of TypeScript?

Here's an improved and more structured version of your prompt for ChatGPT:

---

## Request 02: Add "player" domain

Use `Yarn` as the package manager. The task is to replace the domain "user" with the domain "player." Below is the model definition for `PlayerApiDtoV1`:

```typescript
// PlayerApiDtoV1 class for the controller
export class PlayerApiDtoV1 {
  id: string;
  avatarUri: string;
  country: string;
  isBanned: boolean;
  isActive: boolean;
  updateDate: Date;
  creationDate: Date;
}

// Player class for the service layer
export class Player {
  id: string;
  avatarUri: string;
  country: string;
  isBanned: boolean;
  isActive: boolean;
  updateDate: Date;
  creationDate: Date;
}
```

### Objective
1. Utilize `Yarn` for managing dependencies.
2. Replace any references to "user" with "player" throughout the codebase to ensure the naming is consistent with the `PlayerApiDtoV1` model.
3. Ensure that the `PlayerApiDtoV1` and `Player` classes are properly aligned with each layer they represent (controller and service, respectively).

## Request 03: Object Mapping

Can you create an explicit mapping between PlayerApiDtoV1 and Player in the controller using an alternative TypeScript library to AutoMapper?

Certainly! Here is an enhanced and refined version of your prompt to improve its effectiveness and clarity:

---

## Request 04: Create Installation Script

*As an expert, can you generate a shell script (`install.sh`) that includes all necessary terminal commands to set up a fully functional NestJS Web API project in TypeScript? Ensure that you follow all best practices throughout the setup process, structuring the project according to the standards mentioned in the previous response.*

**Objective:** The script should automate the setup so that by the end of its execution, the project is correctly configured, runnable, and fully operational.



----------------------------------------------------------

## Manual fix with several questions
The project was not totally runnable, but I fixed it with several questions to ChatGPT :)

### The Errors:
- `error TS1270`
- `error TS1241`

### Solution
Add the following compiler options to `tsconfig.json`:

```json
{
  "compilerOptions": {
    "experimentalDecorators": true,
    "emitDecoratorMetadata": true
    // ... other configurations
  }
}


## Run & Test
- yarn start and go http://127.0.0.1:3000/

