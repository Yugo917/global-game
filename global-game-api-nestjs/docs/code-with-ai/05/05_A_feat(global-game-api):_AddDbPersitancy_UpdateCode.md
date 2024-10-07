# 05_A_feat(global-game-api):_AddDbPersitancy_UpdateCode

# Prompts :

--------------------------------------------------------------------------------
## Request 01 Add persistency
--------------------------------------------------------------------------------

# Goal
Implement MongoDB persistence for the `PlayersService` in the `global-game` database using the collection `player-v1`.

## Context

### Database Structure

We will use a MongoDB database named `global-game`. The data will be stored in the `player-v1` collection. The following is the `PlayerDbDtoV1` model that represents the schema of this collection:

```typescript
export interface PlayerDbDtoV1 {
  id: string;
  avatarUri: string;
  country: string;
  isBanned: boolean;
  isActive: boolean;
  updateDate: Date;
  creationDate: Date;
}
```

### Current Service Implementation

The `PlayersService` is currently an in-memory service managing an array of `Player` objects. Below is the current implementation of the `PlayersService` class that you'll need to modify to include MongoDB persistence:

```typescript
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

### Player Class

To help you understand the service, here is the `Player` class model:

```typescript
export class Player {
  id: string;
  avatarUri: string;
  country: string;
  isBanned: boolean;
  isActive: boolean;

  @Type(() => Date)
  updateDate: Date;

  @Type(() => Date)
  creationDate: Date;
}
```

## Task

Modify the `PlayersService` class to use MongoDB for data persistence. The data should be stored and retrieved from the `player-v1` collection of the `global-game` database. Ensure that all CRUD operations (`findAll`, `findOne`, `createPlayer`, `updatePlayer`, `deletePlayer`, `deactivatePlayer`) are modified to interact with MongoDB.

Please ensure the following:
1. Use a MongoDB client suitable for a NestJS project (e.g., Mongoose).
2. Keep the method signatures consistent but modify the internal logic to perform database operations.
3. Update the `Player` class or any necessary types if required for compatibility with MongoDB.

If you need any clarification or further guidance, please ask.

--------------------------------------------------------------------------------
## Request02: Configure Local Development Environment
--------------------------------------------------------------------------------

**Objective**: Set up a local development environment for the project.

### Tasks

1. **Create a Setup Command for Development Environment**
   - Add a new command named `setup-dev-env` that runs the following instructions to bring up the necessary services using Docker:
     ```bash
     docker-compose down && docker-compose up -d
     ```

2. **Create `docker-compose.yml` File**
   - Add a `docker-compose.yml` file to the root of the project, defining the necessary infrastructure with the following services:
     - **MongoDB**: A database service for data persistence.
     - **MongoExpress**: A web-based interface to interact with the MongoDB instance.

3. **Initialize MongoDB Database**
   - Add an initialization file to set up the `global-game` database with the following requirements:
     - **Create a Collection**: Initialize a collection named `player-v1`.
     - **Set Validation Rules**: Define schema validation rules for the `player-v1` collection based on the `PlayerDbDtoV1` model.
     - **Add Seed Data**: Insert initial seed data into the `player-v1` collection to facilitate testing and development.

4. **Environment Variable Management**
   - Integrate `.env` file support into the project to manage environment variables effectively.
   - Specify the MongoDB connection string within the `.env` file for secure and dynamic configuration.
   - Ensure the connection string from the `.env` file is correctly utilized within the project to establish a connection to the MongoDB database.

---

--------------------------------------------------------------------------------
## Request03: Enhance schema
--------------------------------------------------------------------------------

"Could you help me modify the following schema and MongoDB collection so that a new field `id` of type GUID (UUID) is added to `PlayerV1Schema`? The field should be automatically generated when a new document is created. Additionally, ensure that this change is reflected both in the TypeScript schema and in the MongoDB collection validator. The `id` field should be required and validated as a proper UUID. 

Below are the current versions of the schema and collection definitions:

```typescript
// TypeScript schema
import { Schema, Document } from 'mongoose';

export const Playerv1CollectionName = "player-v1";

export const PlayerV1Schema = new Schema({
  avatarUri: { type: String, required: true },
  country: { type: String, required: true },
  isBanned: { type: Boolean, required: true, default: false },
  isActive: { type: Boolean, required: true, default: true },
  updateDate: { type: Date, required: true, default: Date.now },
  creationDate: { type: Date, required: true, default: Date.now },
});

export interface PlayerDocument extends Document {
  id: string;
  avatarUri: string;
  country: string;
  isBanned: boolean;
  isActive: boolean;
  updateDate: Date;
  creationDate: Date;
}
```

```javascript
// MongoDB collection with JSON Schema validation
db.createCollection('player-v1', {
  validator: {
    $jsonSchema: {
      bsonType: 'object',
      required: ['avatarUri', 'country', 'isBanned', 'isActive', 'updateDate', 'creationDate'],
      properties: {
        avatarUri: {
          bsonType: 'string',
          description: 'Avatar URI must be a string and is required',
        },
        country: {
          bsonType: 'string',
          description: 'Country must be a string and is required',
        },
        isBanned: {
          bsonType: 'bool',
          description: 'isBanned must be a boolean and is required',
        },
        isActive: {
          bsonType: 'bool',
          description: 'isActive must be a boolean and is required',
        },
        updateDate: {
          bsonType: 'date',
          description: 'updateDate must be a date and is required',
        },
        creationDate: {
          bsonType: 'date',
          description: 'creationDate must be a date and is required',
        },
      },
    },
  },
});
```

Please make sure to include:
1. A new `id` field in `PlayerV1Schema` with type `String`, required, and generated as a UUID (version 4).
2. Validation logic in TypeScript to confirm that `id` follows the GUID format.
3. An update to the MongoDB JSON Schema validator to enforce the `id` field as a string and validate it as a UUID.
4. Update any necessary imports or package requirements.   


