import { Module } from '@nestjs/common';
import { PlayersService } from '../service/players.service';
import { PlayersController } from '../api/players.controller';
import { PlayerMapper } from '../service/players.model.mapper';


@Module({
  providers: [PlayersService, PlayerMapper],
  controllers: [PlayersController]
})
export class PlayersModule {}
