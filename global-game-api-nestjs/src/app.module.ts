import { Module } from "@nestjs/common";
import { PlayersModule } from "./players/module/players.module";
import { ConfigModule } from "@nestjs/config";
import { LoggerModule } from "./common/logger/logger.module";
import { MapperModule } from "./common/mapper/mapper.module";
import { GamesModule } from "./games/module/games.module";


@Module({
  imports: [
    LoggerModule,
    ConfigModule.forRoot({
      isGlobal: true
    }),
    MapperModule,
    PlayersModule,
    GamesModule
  ],
  controllers: [],
  providers: []
})
export class AppModule { }
