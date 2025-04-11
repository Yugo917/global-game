import { Module } from "@nestjs/common";
import { MongooseModule } from "@nestjs/mongoose";
import { GameV1CollectionName, GameV1Schema } from "../service/game.schema";
import { ResilienceModule } from "src/common/resilience/resilience.module";
import { MapperModule } from "src/common/mapper/mapper.module";
import { MongooseFactory } from "src/common/mongo/mongoose.factory";
import { GameApiMapperProfile } from "../api/game.api.mapper.profile";
import { GamesService } from "../service/game.service";
import { GamesController } from "../api/game.controller";

@Module({
    imports: [
        MapperModule,
        MongooseModule.forRootAsync({
            imports: [ResilienceModule],
            useClass: MongooseFactory
        }),
        MongooseModule.forFeature([
            { name: GameV1CollectionName, schema: GameV1Schema }
        ])
    ],
    providers: [GameApiMapperProfile, GamesService],
    controllers: [GamesController]
})
export class GamesModule { }
