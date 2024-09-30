import { Module } from '@nestjs/common';
import { PlayersModule } from './players/module/players.module';


@Module({
  imports: [PlayersModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
