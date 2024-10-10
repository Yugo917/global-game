import { Module } from "@nestjs/common";
import { PlayersModule } from "./players/module/players.module";
import { ConfigModule } from "@nestjs/config";
import { LoggerModule } from "./common/logger/logger.module";


@Module({
  imports: [
    LoggerModule,
    ConfigModule.forRoot({
      isGlobal: true
    }),
    PlayersModule
  ],
  controllers: [],
  providers: []
})
export class AppModule { }
