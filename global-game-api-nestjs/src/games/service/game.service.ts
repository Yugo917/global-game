import { Injectable, NotFoundException } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { Model } from "mongoose";
import { v4 as uuidv4 } from "uuid";

import { GameV1CollectionName, IGameDocument } from "./game.schema";
import { CreateGame, Game, GameSearchCriteria, UpdateGame } from "./game.models";
import { DbGameMapper } from "./game.db.model.mapper";


@Injectable()
export class GamesService {
    public constructor(
        @InjectModel(GameV1CollectionName) private readonly gameModel: Model<IGameDocument>,
    ) { }

    public async findAll(): Promise<Game[]> {
        const res = await this.gameModel.find().lean().exec();
        return res.map(DbGameMapper.mapToEntity);
    }

    public async findOne(id: string): Promise<Game> {
        const game = await this.gameModel.findOne({ id }).lean().exec();
        if (!game) {
            throw new NotFoundException(`Game with id ${id} not found`);
        }
        return DbGameMapper.mapToEntity(game);
    }

    public async search(criteria: GameSearchCriteria): Promise<Game[]> {
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        const mongoQuery: Record<string, any> = {};

        if (criteria.ids?.length) {
            mongoQuery.id = { $in: criteria.ids };
        }

        if (criteria.names?.length) {
            mongoQuery.name = { $in: criteria.names.map(name => new RegExp(name, "i")) };
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

        const games = await this.gameModel.find(mongoQuery).limit(criteria.nbRows).lean().exec();
        return games.map(DbGameMapper.mapToEntity);
    }

    public async create(createGame: CreateGame): Promise<Game> {
        const newGame: IGameDocument = {
            id: uuidv4(),
            name: createGame.name,
            badgeUri: createGame.badgeUri,
            isActive: true,
            appStore: createGame.appStore,
            thirdPartyIdentifiers: createGame.thirdPartyIdentifiers ?? [],
            creationDate: new Date(),
            updateDate: new Date()
        };

        await this.gameModel.insertMany([newGame]);
        return this.findOne(newGame.id);
    }

    public async update(id: string, updatedData: UpdateGame): Promise<Game> {
        const game = await this.gameModel.findOneAndUpdate(
            { id },
            {
                name: updatedData.name,
                badgeUri: updatedData.badgeUri,
                appStore: updatedData.appStore,
                thirdPartyIdentifiers: updatedData.thirdPartyIdentifiers,
                updateDate: new Date()
            },
            { new: true },
        ).lean().exec();

        if (!game) {
            throw new NotFoundException(`Game with id ${id} not found`);
        }

        return DbGameMapper.mapToEntity(game);
    }

    public async delete(id: string): Promise<void> {
        const result = await this.gameModel.deleteOne({ id }).exec();
        if (result.deletedCount === 0) {
            throw new NotFoundException(`Game with id ${id} not found`);
        }
    }

    public async deactivate(id: string): Promise<Game> {
        const game = await this.gameModel.findOneAndUpdate(
            { id },
            {
                isActive: false,
                updateDate: new Date()
            },
            { new: true },
        ).lean().exec();

        if (!game) {
            throw new NotFoundException(`Game with id ${id} not found`);
        }

        return DbGameMapper.mapToEntity(game);
    }
}
