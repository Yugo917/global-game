import { ApiProperty } from "@nestjs/swagger";
import { IsEnum, IsNotEmpty, IsOptional, IsString } from "class-validator";
import { Type } from "class-transformer";
import { IsArray, IsBoolean, IsDate, ValidateNested } from "class-validator";

export enum AppStoreApiV1 {
    AppelStore = "AppelStore",
    GooglePlayStore = "GooglePlayStore",
    XiaomiStore = "XiaomiStore",
    PlaystationStore = "PlaystationStore",
    NintendoEShop = "NintendoEShop",
    Steam = "Steam",
    unknown = "unknown"
}


export class ThirdGameIdentifierApiV1 {
    @ApiProperty({ description: "Unique identifier for the third-party game" })
    @IsNotEmpty()
    @IsString()
    public id: string = "";

    @ApiProperty({ description: "Display name of the third-party game" })
    @IsNotEmpty()
    @IsString()
    public name: string = "";

    @ApiProperty({
        description: "App store platform of the third-party game",
        enum: AppStoreApiV1
    })
    @IsNotEmpty()
    @IsEnum(AppStoreApiV1)
    public appStore: AppStoreApiV1 = AppStoreApiV1.GooglePlayStore;
}

export class GameApiV1 {
    @ApiProperty({ description: "Unique identifier for the game" })
    @IsNotEmpty()
    @IsString()
    public id: string = "";

    @ApiProperty({ description: "Display name of the game" })
    @IsNotEmpty()
    @IsString()
    public name: string = "";

    @ApiProperty({
        description: "List of third-party identifiers for the game",
        type: [ThirdGameIdentifierApiV1]
    })
    @IsArray()
    @ValidateNested({ each: true })
    @Type(() => ThirdGameIdentifierApiV1)
    public thirdPartyIdentifiers: ThirdGameIdentifierApiV1[] = [];

    @ApiProperty({ description: "Badge uri associated with the game" })
    public badgeUri: string = "";

    @ApiProperty({ description: "Whether the game is active" })
    @IsBoolean()
    public isActive: boolean = true;

    @ApiProperty({ description: "Date of last update" })
    @IsDate()
    public updateDate: Date = new Date();

    @ApiProperty({ description: "Date of creation" })
    @IsDate()
    public creationDate: Date = new Date();
}

export class GameCreateApiV1 {
    @ApiProperty({ example: "Fifa 2025" })
    @IsString()
    @IsNotEmpty()
    public name: string = "";

    @ApiProperty({ example: "https://cdn.domain.com/fifa.png" })
    @IsString()
    @IsNotEmpty()
    public badgeUri: string = "";

    @ApiProperty({ enum: AppStoreApiV1, example: AppStoreApiV1.Steam })
    @IsEnum(AppStoreApiV1)
    public appStore: AppStoreApiV1 = AppStoreApiV1.unknown;

    @ApiProperty({
        description: "List of third party identifiers",
        type: [ThirdGameIdentifierApiV1],
        required: false
    })
    @IsOptional()
    @IsArray()
    public thirdPartyIdentifiers: ThirdGameIdentifierApiV1[] = [];
}

export class GameUpdateApiV1 {
    @ApiProperty({ example: "Fifa 2026" })
    @IsString()
    @IsNotEmpty()
    public name: string = "";

    @ApiProperty({ example: "https://cdn.domain.com/fifa2026.png" })
    @IsString()
    @IsNotEmpty()
    public badgeUri: string = "";

    @ApiProperty({ enum: AppStoreApiV1, example: AppStoreApiV1.GooglePlayStore })
    @IsEnum(AppStoreApiV1)
    public appStore: AppStoreApiV1 = AppStoreApiV1.unknown;

    @ApiProperty({
        description: "List of third party identifiers",
        type: [ThirdGameIdentifierApiV1],
        required: false
    })
    @IsOptional()
    @IsArray()
    public thirdPartyIdentifiers: ThirdGameIdentifierApiV1[] = [];
}


export class GameSearchCriteriaApiV1 {
    @ApiProperty({ required: false, type: [String] })
    @IsOptional()
    @IsArray()
    @IsString({ each: true })
    public ids?: string[];

    @ApiProperty({ required: false, type: [String] })
    @IsOptional()
    @IsArray()
    @IsString({ each: true })
    public names?: string[];

    @ApiProperty({ required: false, type: String, format: "date-time" })
    @IsOptional()
    @IsDate()
    public creationDateStart?: Date;

    @ApiProperty({ required: false, type: String, format: "date-time" })
    @IsOptional()
    @IsDate()
    public creationDateEnd?: Date;

    @ApiProperty({ required: false, default: 100 })
    @IsOptional()
    public nbRows: number = 100;
}




