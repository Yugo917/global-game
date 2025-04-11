import { ApiProperty, ApiPropertyOptional } from "@nestjs/swagger";
import { Type } from "class-transformer";
import { IsArray, IsDate, IsEmail, IsEnum, IsInt, IsNotEmpty, IsOptional, IsString, Matches, Min, ValidateNested } from "class-validator";

export type AvatarNameApiV1 =
  | "zebra" | "rabbit" | "rhino" | "buffalo" | "crocodile"
  | "seal" | "pig" | "hippo" | "giraffe" | "ostrich"
  | "walrus" | "penguin" | "bear" | "snake" | "chicken"
  | "gecko" | "macaw" | "horse" | "elephant" | "duck"
  | "sloth" | "panda" | "blue_hippo" | "eagle" | "moose"
  | "gray_rhino" | "owl" | "gorilla" | "koala" | "camel";

const enumAvatarValidation = {
  zebra: "zebra",
  rabbit: "rabbit",
  rhino: "rhino",
  buffalo: "buffalo",
  crocodile: "crocodile",
  seal: "seal",
  pig: "pig",
  hippo: "hippo",
  giraffe: "giraffe",
  ostrich: "ostrich",
  walrus: "walrus",
  penguin: "penguin",
  bear: "bear",
  snake: "snake",
  chicken: "chicken",
  gecko: "gecko",
  macaw: "macaw",
  horse: "horse",
  elephant: "elephant",
  duck: "duck",
  sloth: "sloth",
  panda: "panda",
  blue_hippo: "blue_hippo",
  eagle: "eagle",
  moose: "moose",
  gray_rhino: "gray_rhino",
  owl: "owl",
  gorilla: "gorilla",
  koala: "koala",
  camel: "camel"
}

export class ThirdPartyIdentifierApiV1 {
  @ApiProperty({ description: "Unique identifier for the third-party account" })
  @IsNotEmpty()
  @IsString()
  public id: string = "";

  @ApiProperty({ description: "Name associated with the third-party account" })
  @IsNotEmpty()
  @IsString()
  public name: string = "";

  @ApiProperty({ description: "Email associated with the third-party account" })
  @IsNotEmpty()
  @IsEmail()
  public email: string = "";

  @ApiProperty({ description: "Avatar URI for the third-party account" })
  @IsNotEmpty()
  @IsString()
  public avatarUri: string = "";

  @ApiProperty({
    description: "The game service provider (e.g., Unknown, GoogleGames, GameCenter)",
    enum: ["Unknown", "GoogleGames", "GameCenter"]
  })
  @IsNotEmpty()
  @IsString()
  @Matches(/^(Unknown|GoogleGames|GameCenter)$/, {
    message: "gameServiceProvider must be one of the following values: Unknown, GoogleGames, GameCenter"
  })
  public gameServiceProvider: "Unknown" | "GoogleGames" | "GameCenter" = "Unknown";
}

export class PlayerApiV1 {
  @ApiProperty({ description: "Unique identifier of the player" })
  public id: string = "";

  @ApiProperty({ description: "Name of the player" })
  public name: string = "";

  @ApiProperty({ description: "Email of the player" })
  public email: string = "";

  @ApiProperty({ description: "URI of the player avatar" })
  public avatarUri: string = "";

  @ApiProperty({ description: "The player avatar name" })
  public avatarName: AvatarNameApiV1 = "bear";

  @ApiProperty({ description: "Country of the player" })
  public country: string = "";

  @ApiProperty({
    description: "List of third-party identifiers associated with the player",
    type: [ThirdPartyIdentifierApiV1]
  })
  public thirdPartyIdentifiers: ThirdPartyIdentifierApiV1[] = [];

  @ApiProperty({ description: "Flag indicating if the player is banned" })
  public isBanned: boolean = false;

  @ApiProperty({ description: "Active status of the player" })
  public isActive: boolean = false;

  @ApiProperty({ description: "Last update date of the player record" })
  public updateDate: Date = new Date();

  @ApiProperty({ description: "Creation date of the player record" })
  public creationDate: Date = new Date();
}

export class PlayerCreateApiV1 {
  @ApiProperty({ description: "Name of the player" })
  @IsNotEmpty()
  @IsString()
  public name: string = "";

  @ApiProperty({ description: "Email of the player" })
  @IsNotEmpty()
  @IsEmail()
  public email: string = "";

  @ApiProperty({ description: "URI of the player avatar" })
  @IsNotEmpty()
  @IsString()
  public avatarUri: string = "";

  @ApiProperty({ description: "The player avatar name" })
  @IsEnum(enumAvatarValidation)
  public avatarName: AvatarNameApiV1 = "bear";

  @ApiProperty({ description: "Country of the player" })
  @IsNotEmpty()
  @Matches(/^[A-Z]{2}$/, { message: "Country must be a 2-letter ISO code" })
  public country: string = "";
}

export class PlayerUpdateApiV1 {
  @ApiProperty({ description: "URI of the player avatar" })
  @IsNotEmpty()
  @IsString()
  public avatarUri: string = "";

  @ApiProperty({ description: "The player avatar name" })
  @IsEnum(enumAvatarValidation)
  public avatarName: AvatarNameApiV1 = "bear";

  @ApiProperty({ description: "Country of the player" })
  @IsNotEmpty()
  @Matches(/^[A-Z]{2}$/, { message: "Country must be a 2-letter ISO code" })
  public country: string = "";

  @ApiProperty({
    description: "List of third-party identifiers associated with the player",
    type: [ThirdPartyIdentifierApiV1]
  })
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => ThirdPartyIdentifierApiV1)
  public thirdPartyIdentifiers: ThirdPartyIdentifierApiV1[] = [];
}

export class PlayerSearchCriteriaApiV1 {
  @ApiPropertyOptional({
    description: "Unique identifier of the players",
    type: [String]
  })
  @IsOptional()
  @IsString({ each: true })
  public ids?: string[];

  @ApiPropertyOptional({
    description: "Names of the players",
    type: [String]
  })
  @IsOptional()
  @IsString({ each: true })
  public names?: string[];

  @ApiPropertyOptional({
    description: "Emails of the players",
    type: [String]
  })
  @IsOptional()
  @IsString({ each: true })
  public emails?: string[];

  @ApiPropertyOptional({
    description: "List of third-party identifiers associated with the player",
    type: [String]
  })
  @IsOptional()
  @IsArray()
  @IsString({ each: true })
  public thirdPartyIds?: string[];

  @ApiPropertyOptional({
    description: "List of third-party names associated with the player",
    type: [String]
  })
  @IsOptional()
  @IsArray()
  @IsString({ each: true })
  public thirdPartyNames?: string[];

  @ApiPropertyOptional({
    description: "List of third-party emails associated with the player",
    type: [String]
  })
  @IsOptional()
  @IsArray()
  @IsString({ each: true })
  public thirdPartyEmails?: string[];


  @ApiPropertyOptional({
    description: "Start date for creation date filter (inclusive)",
    type: String,
    format: "date-time",
    example: "2023-01-01T00:00:00.000Z"
  })
  @IsOptional()
  @IsDate()
  @Type(() => Date)
  public creationDateStart?: Date;

  @ApiPropertyOptional({
    description: "End date for creation date filter (inclusive)",
    type: String,
    format: "date-time",
    example: "2023-12-31T23:59:59.999Z"
  })
  @IsOptional()
  @IsDate()
  @Type(() => Date)
  public creationDateEnd?: Date;


  @ApiProperty({
    description: "Number of players to return",
    example: 100
  })
  @IsInt()
  @Min(1)
  public nbRows: number = 100;
}
