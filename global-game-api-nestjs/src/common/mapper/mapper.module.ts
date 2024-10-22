import { Module } from "@nestjs/common";
import { Mapper } from "./mapper";

export const MODULE_KEY_MAPPER = "InHouseMapper";

@Module({
    providers: [
        {
            provide: "InHouseMapper",
            useValue: new Mapper({ strict: true, undefinedIsAValue: false })
        }
    ],
    exports: ["InHouseMapper"]
})
export class MapperModule { }