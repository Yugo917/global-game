#!/bin/bash

# install.sh: Script to apply modifications and set up the NestJS project with Swagger integration.

# Ensure the script stops on any error
set -e

# Define paths for target files
CONTROLLER_FILE="./src/players/api/players.controller.ts"
DTO_FILE="./src/players/api/players.models.dto.ts"
MAPPER_FILE="./src/players/service/players.model.mapper.ts"
SERVICE_FILE="./src/players/service/players.service.ts"
MAIN_FILE="./src/main.ts"

# Function to handle errors gracefully
function handle_error {
    echo "An error occurred. Please check the above messages for details."
    exit 1
}

# Trap errors to ensure graceful exit
trap handle_error ERR

# Backup original files
echo "Creating backups of original files..."
cp $CONTROLLER_FILE "${CONTROLLER_FILE}.bak"
cp $DTO_FILE "${DTO_FILE}.bak"
cp $MAPPER_FILE "${MAPPER_FILE}.bak"
cp $SERVICE_FILE "${SERVICE_FILE}.bak"
cp $MAIN_FILE "${MAIN_FILE}.bak"
echo "Backups created successfully."

# Install Swagger and necessary dependencies
echo "Installing Swagger and dependencies..."
yarn add @nestjs/swagger swagger-ui-express

# Update main.ts to integrate Swagger
echo "Integrating Swagger into main.ts..."
cat <<EOL > $MAIN_FILE
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  // Set up Swagger options
  const config = new DocumentBuilder()
    .setTitle('Global Game API')
    .setDescription('API documentation for Global Game platform')
    .setVersion('1.0')
    .build();

  // Generate Swagger document
  const document = SwaggerModule.createDocument(app, config);

  // Set up Swagger UI endpoint
  SwaggerModule.setup('api/docs', app, document);

  await app.listen(3000);
}
bootstrap();
EOL
echo "Swagger integrated into main.ts."

# Update content for controller
echo "Updating players.controller.ts..."
cat <<EOL > $CONTROLLER_FILE
import { Controller, Get, Param, Post, Body, Put, Delete, Patch } from '@nestjs/common';
import { PlayersService } from '../service/players.service';
import { PlayerApiDtoV1, PlayerCreateApiV1, PlayerUpdateApiV1, PlayerDeactivateApiV1 } from './players.models.dto';
import { PlayerMapper } from '../service/players.model.mapper';
import { ApiTags, ApiOperation, ApiResponse } from '@nestjs/swagger';

@ApiTags('players')
@Controller('players')
export class PlayersController {
  constructor(
    private readonly playersService: PlayersService,
    private readonly playerMapper: PlayerMapper
  ) {}

  @Get(':id')
  @ApiOperation({ summary: 'Find a player by ID' })
  @ApiResponse({ status: 200, description: 'Player found', type: PlayerApiDtoV1 })
  @ApiResponse({ status: 404, description: 'Player not found' })
  findOne(@Param('id') id: string): PlayerApiDtoV1 {
    const player = this.playersService.findOne(id);
    return this.playerMapper.mapToDto(player);
  }

  @Post()
  @ApiOperation({ summary: 'Create a new player' })
  @ApiResponse({ status: 201, description: 'Player created', type: PlayerApiDtoV1 })
  create(@Body() createPlayerDto: PlayerCreateApiV1): PlayerApiDtoV1 {
    const playerEntity = this.playerMapper.mapToEntity(createPlayerDto);
    const createdPlayer = this.playersService.createPlayer(playerEntity);
    return this.playerMapper.mapToDto(createdPlayer);
  }

  @Put(':id')
  @ApiOperation({ summary: 'Update a player\'s details' })
  @ApiResponse({ status: 200, description: 'Player updated', type: PlayerApiDtoV1 })
  @ApiResponse({ status: 404, description: 'Player not found' })
  update(@Param('id') id: string, @Body() updatePlayerDto: PlayerUpdateApiV1): PlayerApiDtoV1 {
    const playerEntity = this.playerMapper.mapToEntity(updatePlayerDto);
    const updatedPlayer = this.playersService.updatePlayer(id, playerEntity);
    return this.playerMapper.mapToDto(updatedPlayer);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Delete a player by ID' })
  @ApiResponse({ status: 204, description: 'Player deleted' })
  @ApiResponse({ status: 404, description: 'Player not found' })
  delete(@Param('id') id: string): void {
    this.playersService.deletePlayer(id);
  }

  @Patch(':id')
  @ApiOperation({ summary: 'Deactivate a player' })
  @ApiResponse({ status: 200, description: 'Player deactivated', type: PlayerApiDtoV1 })
  @ApiResponse({ status: 404, description: 'Player not found' })
  deactivate(@Param('id') id: string, @Body() deactivatePlayerDto: PlayerDeactivateApiV1): PlayerApiDtoV1 {
    const updatedPlayer = this.playersService.deactivatePlayer(id, deactivatePlayerDto.isActive);
    return this.playerMapper.mapToDto(updatedPlayer);
  }
}
EOL
echo "Updated players.controller.ts."

# Update content for DTO
echo "Updating players.models.dto.ts..."
cat <<EOL > $DTO_FILE
import { ApiProperty } from '@nestjs/swagger';

export class PlayerApiDtoV1 {
  @ApiProperty({ description: 'Unique identifier of the player' })
  id: string;

  @ApiProperty({ description: 'URI of the player avatar' })
  avatarUri: string;

  @ApiProperty({ description: 'Country of the player' })
  country: string;

  @ApiProperty({ description: 'Flag indicating if the player is banned' })
  isBanned: boolean;

  @ApiProperty({ description: 'Active status of the player' })
  isActive: boolean;

  @ApiProperty({ description: 'Last update date of the player record' })
  updateDate: Date;

  @ApiProperty({ description: 'Creation date of the player record' })
  creationDate: Date;
}

export class PlayerCreateApiV1 {
  @ApiProperty({ description: 'URI of the player avatar' })
  avatarUri: string;

  @ApiProperty({ description: 'Country of the player' })
  country: string;
}

export class PlayerUpdateApiV1 {
  @ApiProperty({ description: 'URI of the player avatar' })
  avatarUri: string;

  @ApiProperty({ description: 'Country of the player' })
  country: string;

  @ApiProperty({ description: 'Flag indicating if the player is banned' })
  isBanned: boolean;
}

export class PlayerDeactivateApiV1 {
  @ApiProperty({ description: 'Flag indicating active status of the player' })
  isActive: boolean;
}
EOL
echo "Updated players.models.dto.ts."

# Update content for Mapper
echo "Updating players.model.mapper.ts..."
cat <<EOL > $MAPPER_FILE
import { plainToInstance } from "class-transformer";
import { Player } from "./players.service";
import { PlayerApiDtoV1, PlayerCreateApiV1, PlayerUpdateApiV1, PlayerDeactivateApiV1 } from "../api/players.models.dto";
import { Injectable } from "@nestjs/common";

@Injectable()
export class PlayerMapper {
  
  // Method to map Player to PlayerApiDtoV1
  public mapToDto(player: Player): PlayerApiDtoV1 {
    return plainToInstance(PlayerApiDtoV1, player);
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
EOL
echo "Updated players.model.mapper.ts."

# Update content for Service
echo "Updating players.service.ts..."
cat <<EOL > $SERVICE_FILE
import { Injectable, NotFoundException } from '@nestjs/common';
import { Type } from 'class-transformer';

// Player model for the service layer
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

  findAll(): Player[] {
    return this.players;
  }

  findOne(id: string): Player {
    const player = this.players.find((player) => player.id === id);
    if (!player) {
      throw new NotFoundException(\`Player with id \${id} not found\`);
    }
    return player;
  }

  createPlayer(player: Omit<Player, 'id'>): Player {
    const newPlayer: Player = {
      ...player,
      id: (this.players.length + 1).toString(),
      creationDate: new Date(),
      updateDate: new Date(),
    };
    this.players.push(newPlayer);
    return newPlayer;
  }

  updatePlayer(id: string, updatedData: Omit<Player, 'id'>): Player {
    const index = this.players.findIndex((player) => player.id === id);
    if (index === -1) {
      throw new NotFoundException(\`Player with id \${id} not found\`);
    }
    const updatedPlayer = {
      ...this.players[index],
      ...updatedData,
      updateDate: new Date(),
    };
    this.players[index] = updatedPlayer;
    return updatedPlayer;
  }

  deletePlayer(id: string): void {
    const index = this.players.findIndex((player) => player.id === id);
    if (index === -1) {
      throw new NotFoundException(\`Player with id \${id} not found\`);
    }
    this.players.splice(index, 1);
  }

  deactivatePlayer(id: string, isActive: boolean): Player {
    const index = this.players.findIndex((player) => player.id === id);
    if (index === -1) {
      throw new NotFoundException(\`Player with id \${id} not found\`);
    }
    this.players[index].isActive = isActive;
    this.players[index].updateDate = new Date();
    return this.players[index];
  }
}
EOL
echo "Updated players.service.ts."

# Placeholder for database migrations (if applicable)
# Uncomment and replace with your specific migration command
# echo "Running migrations..."
# yarn migration:run

# Build and start the project
echo "Building and starting the project..."
yarn build
yarn start

echo "All updates applied successfully! Project is ready to run."
