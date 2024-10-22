import { Module } from "@nestjs/common";
import { PlayersModule } from "./players/module/players.module";
import { ConfigModule } from "@nestjs/config";
import { LoggerModule } from "./common/logger/logger.module";
import { MapperModule } from "./common/mapper/mapper.module";


@Module({
  imports: [
    LoggerModule,
    ConfigModule.forRoot({
      isGlobal: true
    }),
    MapperModule,
    PlayersModule
  ],
  controllers: [],
  providers: []
})
export class AppModule { }
