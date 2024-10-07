import { Module } from "@nestjs/common";
import { PlayersService } from "../service/players.service";
import { PlayersController } from "../api/players.controller";
import { ApiPlayerMapper } from "../api/players.api.model.mapper";
import { MongooseModule } from "@nestjs/mongoose";
import { Playerv1CollectionName, PlayerV1Schema } from "../service/player.schema";


@Module({
  imports: [
    MongooseModule.forFeature([{ name: Playerv1CollectionName, schema: PlayerV1Schema }])
  ],
  providers: [PlayersService, ApiPlayerMapper],
  controllers: [PlayersController]
})
export class PlayersModule { }
