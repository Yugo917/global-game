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
