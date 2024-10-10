import { Module } from "@nestjs/common";
import { PlayersService } from "../service/player.service";
import { PlayersController } from "../api/players.controller";
import { ApiPlayerMapper } from "../api/players.api.model.mapper";
import { MongooseModule } from "@nestjs/mongoose";
import { Playerv1CollectionName, PlayerV1Schema } from "../service/player.schema";
import { ResilienceModule } from "src/common/resilience/resilience.module";
import { MongooseFactory } from "src/common/mongo/mongoose.factory";


@Module({
  imports: [MongooseModule.forRootAsync({
    imports: [ResilienceModule],
    useClass: MongooseFactory
  }), MongooseModule.forFeature([{ name: Playerv1CollectionName, schema: PlayerV1Schema }])],
  providers: [PlayersService, ApiPlayerMapper],
  controllers: [PlayersController]
})
export class PlayersModule { }
