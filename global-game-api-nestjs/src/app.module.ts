import { Module } from "@nestjs/common";
import { PlayersModule } from "./players/module/players.module";
import { ConfigModule } from "@nestjs/config";
import { MongooseModule } from "@nestjs/mongoose";
import { LoggerModule } from "./common/logger/logger.module";


@Module({
  imports: [
    LoggerModule,
    ConfigModule.forRoot({
      isGlobal: true
    }),
    MongooseModule.forRoot(process.env.MONGODB_URI as string),
    PlayersModule

  ],
  controllers: [],
  providers: []
})
export class AppModule { }
