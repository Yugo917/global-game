import { Inject } from "@nestjs/common";
import { IMappingOptions, Mapper, MapperProfile } from "src/common/mapper/mapper";
import { MODULE_KEY_MAPPER } from "src/common/mapper/mapper.module";
import { CreatePlayer, Player, UpdatePlayer } from "../service/player.models";
import { PlayerApiV1, PlayerCreateApiV1, PlayerUpdateApiV1 } from "./players.models.dto";

export class PlayerApiMapperProfile extends MapperProfile {
    public constructor(@Inject(MODULE_KEY_MAPPER) mapper: Mapper) {
        super(mapper);
        const options: IMappingOptions<object> = {
            ignorePattern: /^_/ // Ignore private properties that start with an underscore
        };

        mapper.addProfile(Player, PlayerApiV1, options);
        mapper.addProfile(PlayerCreateApiV1, CreatePlayer, options);
        mapper.addProfile(PlayerUpdateApiV1, UpdatePlayer, options);
    }
}
