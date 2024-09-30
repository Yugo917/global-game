# 03_feat(global-game-api):_AddCrudAndSwagger
`add global-game-api-nestjs_Step01.zip in attachement for ChatGpt`

## Request01 Add CRUD Player controller :

**Directive 01**: Analyze the entire attached project, focusing only on TypeScript files.

**Role**: Act as a backend developer skilled in Node.js, NestJS, and TypeScript, with expertise in code scalability and maintainability. Apply SOLID principles, clean code practices, and clean architecture throughout the solution.

**Task**: Modify the `players.controller.ts` and `players.models.dto.ts` files to implement CRUD operations following the Request Model Pattern. For each endpoint, create a corresponding `ApiDto`. Implement the following endpoints:

- **Read**: `GET {baseApiUrl}/{foo}/{fooId}`
- **Create**: `POST {baseApiUrl}/{foo}`
- **Update**: `PUT {baseApiUrl}/{foo}/{fooId}`
- **Delete**: `DELETE {baseApiUrl}/{foo}/{fooId}`
- **Deactivate**: `PATCH {baseApiUrl}/{foo}/{fooId}`

**Specifications**:
- Utilize the Request Model Pattern to ensure each endpoint has a well-defined `ApiDto`.
- The `update` endpoint should use the following model:

```typescript
export class PlayerUpdateApiV1 {
  avatarUri: string;
  country: string;
  isBanned: boolean;
}
```

Please ensure that the implementations are aligned with best practices in NestJS, maintaining consistency with the overall architecture of the project.

## Request02 Add CRUD Player service level :

**Task Extension**: Building on the previous modifications, update `players.model.mapper.ts` and `players.service.ts` to ensure the project is fully functional and runnable.

- **Requirements**: Refactor the mapper and service files to align with the CRUD operations implemented in the `players.controller.ts` and `players.models.dto.ts`.
- Ensure that all mappings between data models and DTOs are correctly handled within `players.model.mapper.ts`.
- Update `players.service.ts` to integrate the CRUD operations with the necessary business logic and data handling for the endpoints defined previously.

Make sure all code changes adhere to clean architecture principles, follow NestJS best practices, and maintain consistency across the project.

## Request03 Add swagger :

**Objective**: Integrate Swagger into my project using the latest available versions of the necessary packages.

- **Requirements**: Configure Swagger to be automatically generated from metadata exposed in controllers and models, without the need for explicitly defining an OpenAPI specification.
- Ensure all necessary configurations are in place for proper functionality, including setting up automatic endpoint documentation generation and making sure Swagger UI is correctly accessible.
- Follow best practices to ensure the integration is seamless, and the Swagger documentation remains up-to-date with any changes in the controllers or models.

Please include any relevant code snippets, configuration settings, and installation steps required for successful implementation.

## Request04 Create bash

Task: As an expert backend developer, generate a shell script (install.sh) that will apply the proposed modifications to my project.

The script should automate the update process, ensuring that the new files and changes for the players.controller.ts, players.models.dto.ts, players.model.mapper.ts, and players.service.ts are integrated seamlessly.
Include any necessary steps for installing dependencies, running migrations, and ensuring the project is fully built and runnable after the modifications.
Ensure the script is well-structured, contains comments for clarity, and handles potential errors gracefully to avoid disrupting the update process.
The goal is to have a single command that applies all the modifications and sets up the project to run smoothly with your proposed enhancements.


## Request05 Add find all players end point

**Task**: Update `players.model.mapper.ts` and `players.service.ts` to implement a new `findAll` endpoint.

- **Requirements**: 
  - Modify `players.model.mapper.ts` to include the necessary logic for mapping data to and from the format required by the new `findAll` endpoint.
  - Update `players.service.ts` to add a `findAll` method, ensuring it retrieves and returns all player records from the data source.
- Ensure the `findAll` endpoint adheres to the existing code structure and practices, including proper error handling and consistent formatting.
- Provide any necessary adjustments to other parts of the project (e.g., DTOs, controller) to support the integration of the `findAll` functionality.

----------------------------------------------------------

## Manual update
 - Modify Deactivate endpoint to work without dto in request

----------------------------------------------------------

## Run & Test manually
- yarn start and go http://127.0.0.1:3000/api/docs