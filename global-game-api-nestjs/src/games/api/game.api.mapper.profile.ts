import { Inject } from "@nestjs/common";
import { IMappingOptions, Mapper, MapperProfile } from "src/common/mapper/mapper";
import { MODULE_KEY_MAPPER } from "src/common/mapper/mapper.module";
import { CreateGame, Game, UpdateGame } from "../service/game.models";
import { GameApiV1, GameCreateApiV1, GameUpdateApiV1 } from "./games.models.dto";

export class GameApiMapperProfile extends MapperProfile {
    public constructor(@Inject(MODULE_KEY_MAPPER) mapper: Mapper) {
        super(mapper);

        const options: IMappingOptions<object> = {
            ignorePattern: /^_/ // Ignore les propriétés privées commençant par _
        };

        mapper.addProfile(Game, GameApiV1, options);
        mapper.addProfile(GameCreateApiV1, CreateGame, options);
        mapper.addProfile(GameUpdateApiV1, UpdateGame, options);
    }
}
