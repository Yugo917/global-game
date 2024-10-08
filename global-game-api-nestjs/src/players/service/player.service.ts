import { Injectable, NotFoundException } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { Model } from "mongoose";
import { IPlayerDocument, PlayerDocument, Playerv1CollectionName } from "./player.schema";
import { CreatePlayer, Player, UpdatePlayer } from "./player.models";
import { v4 as uuidv4 } from "uuid";
import { DbPlayerMapper } from "./players.db.model.mapper";


export interface IPlayerService {
  findAll(): Promise<Player[]>;
  findOne(id: string): Promise<Player>;
  createPlayer(playerData: Omit<Player, "id">): Promise<Player>;
  updatePlayer(id: string, updatedData: Omit<Player, "id">): Promise<Player>;
  deletePlayer(id: string): Promise<void>;
  deactivatePlayer(id: string): Promise<Player>;
}

@Injectable()
export class PlayersService implements IPlayerService {
  constructor(
    @InjectModel(Playerv1CollectionName) private readonly playerModel: Model<PlayerDocument>,
  ) { }

  public async findAll(): Promise<Player[]> {
    const res = await this.playerModel.find().lean().exec();
    return res.map(m => DbPlayerMapper.mapToEntity(m));
  }

  public async findOne(id: string): Promise<Player> {
    const player = await this.playerModel.findOne({ playerId: id }).lean().exec();
    if (!player) {
      throw new NotFoundException(`Player with id ${id} not found`);
    }
    return DbPlayerMapper.mapToEntity(player);
  }

  public async createPlayer(createPlayer: CreatePlayer): Promise<Player> {
    const newPlayer: IPlayerDocument = {
      avatarUri: createPlayer.avatarUri,
      country: createPlayer.country,
      playerId: uuidv4(),
      isActive: true,
      isBanned: false,
      creationDate: new Date(),
      updateDate: new Date()
    };
    await this.playerModel.insertMany([newPlayer]);
    return await this.findOne(newPlayer.playerId);
  }

  public async updatePlayer(id: string, updatedData: UpdatePlayer): Promise<Player> {
    const player = await this.playerModel.findOneAndUpdate(
      { playerId: id },
      {
        avatarUri: updatedData.avatarUri,
        country: updatedData.country,
        isBanned: updatedData.isBanned,
        updateDate: new Date()
      },
      { new: true },
    ).exec();

    if (!player) {
      throw new NotFoundException(`Player with id ${id} not found`);
    }
    return DbPlayerMapper.mapToEntity(player);
  }

  public async deletePlayer(id: string): Promise<void> {
    const result = await this.playerModel.deleteOne({ playerId: id }).exec();
    if (result.deletedCount == 0) {
      throw new NotFoundException(`Player with id ${id} not found`);
    }
  }

  public async deactivatePlayer(id: string): Promise<Player> {
    const player = await this.playerModel.findOneAndUpdate(
      { playerId: id },
      {
        isActive: false,
        updateDate: new Date()
      },
      { new: true },
    ).exec();

    if (!player) {
      throw new NotFoundException(`Player with id ${id} not found`);
    }
    return DbPlayerMapper.mapToEntity(player);
  }
}
