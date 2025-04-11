import { Injectable, NotFoundException } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { Model } from "mongoose";
import { IPlayerDocument, PlayerDocument, Playerv1CollectionName } from "./player.schema";
import { CreatePlayer, Player, PlayerSearchCriteria, UpdatePlayer } from "./player.models";
import { v4 as uuidv4 } from "uuid";
import { DbPlayerMapper } from "./players.db.model.mapper";

@Injectable()
export class PlayersService {
  public constructor(
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

  public async search(criteria: PlayerSearchCriteria): Promise<Player[]> {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const mongoQuery: Record<string, any> = {};

    if (criteria.ids?.length) {
      mongoQuery.playerId = { $in: criteria.ids };
    }

    if (criteria.names?.length) {
      mongoQuery.name = { $in: criteria.names.map(name => new RegExp(name, "i")) };
    }

    if (criteria.emails?.length) {
      mongoQuery.email = { $in: criteria.emails.map(email => new RegExp(email, "i")) };
    }

    if (criteria.thirdPartyIds?.length) {
      mongoQuery["thirdParties.id"] = { $in: criteria.thirdPartyIds };
    }

    if (criteria.thirdPartyNames?.length) {
      mongoQuery["thirdParties.name"] = { $in: criteria.thirdPartyNames };
    }

    if (criteria.thirdPartyEmails?.length) {
      mongoQuery["thirdParties.email"] = { $in: criteria.thirdPartyEmails };
    }

    if (criteria.creationDateStart || criteria.creationDateEnd) {
      mongoQuery.creationDate = {};
      if (criteria.creationDateStart) {
        mongoQuery.creationDate.$gte = criteria.creationDateStart;
      }
      if (criteria.creationDateEnd) {
        mongoQuery.creationDate.$lte = criteria.creationDateEnd;
      }
    }

    console.log("mongoQuery", mongoQuery);

    const players = await this.playerModel
      .find(mongoQuery)
      .limit(criteria.nbRows)
      .lean()
      .exec();

    return players.map(DbPlayerMapper.mapToEntity);
  }


  public async create(createPlayer: CreatePlayer): Promise<Player> {
    const newPlayer: IPlayerDocument = {
      name: createPlayer.name,
      email: createPlayer.email,
      avatarUri: createPlayer.avatarUri,
      avatarName: createPlayer.avatarName,
      country: createPlayer.country,
      thirdPartyIdentifiers: [],
      playerId: uuidv4(),
      isActive: true,
      isBanned: false,
      creationDate: new Date(),
      updateDate: new Date()
    };
    await this.playerModel.insertMany([newPlayer]);
    return await this.findOne(newPlayer.playerId);
  }

  public async update(id: string, updatedData: UpdatePlayer): Promise<Player> {
    const player = await this.playerModel.findOneAndUpdate(
      { playerId: id },
      {
        avatarUri: updatedData.avatarUri,
        avatarName: updatedData.avatarName,
        country: updatedData.country,
        thirdPartyIdentifiers: updatedData.thirdPartyIdentifiers,
        updateDate: new Date()
      },
      { new: true },
    ).exec();

    if (!player) {
      throw new NotFoundException(`Player with id ${id} not found`);
    }
    return DbPlayerMapper.mapToEntity(player);
  }

  public async delete(id: string): Promise<void> {
    const result = await this.playerModel.deleteOne({ playerId: id }).exec();
    if (result.deletedCount == 0) {
      throw new NotFoundException(`Player with id ${id} not found`);
    }
  }

  public async deactivate(id: string): Promise<Player> {
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

  public async ban(id: string): Promise<Player> {
    const player = await this.playerModel.findOneAndUpdate(
      { playerId: id },
      {
        banned: true,
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
