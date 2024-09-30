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
      throw new NotFoundException(`Player with id ${id} not found`);
    }
    return player;
  }

  createPlayer(player: Omit<Player, 'id'>): Player {
    const newPlayer: Player = {
      ...player,
      id: (this.players.length + 1).toString(),
    };
    this.players.push(newPlayer);
    return newPlayer;
  }
}