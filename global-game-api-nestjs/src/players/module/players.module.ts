import { Module } from "@nestjs/common";
import { PlayersService } from "../service/player.service";
import { PlayersController } from "../api/players.controller";
import { MongooseModule } from "@nestjs/mongoose";
import { Playerv1CollectionName, PlayerV1Schema } from "../service/player.schema";
import { ResilienceModule } from "src/common/resilience/resilience.module";
import { MongooseFactory } from "src/common/mongo/mongoose.factory";
import { MapperModule } from "src/common/mapper/mapper.module";
import { PlayerApiMapperProfile } from "../api/players.api.mapper.profile";


@Module({
  imports: [MapperModule, MongooseModule.forRootAsync({
    imports: [ResilienceModule],
    useClass: MongooseFactory
  }), MongooseModule.forFeature([{ name: Playerv1CollectionName, schema: PlayerV1Schema }])],
  providers: [PlayerApiMapperProfile, PlayersService],
  controllers: [PlayersController]
})
export class PlayersModule { }