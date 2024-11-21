import { ApiProperty } from "@nestjs/swagger";
import { Type } from "class-transformer";
import { IsNotEmpty, IsString, ValidateNested } from "class-validator";

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
  @IsString()
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
  @IsString()
  public email: string = "";

  @ApiProperty({ description: "URI of the player avatar" })
  @IsNotEmpty()
  @IsString()
  public avatarUri: string = "";

  @ApiProperty({ description: "Country of the player" })
  @IsNotEmpty()
  @IsString()
  public country: string = "";
}

export class PlayerUpdateApiV1 {
  @ApiProperty({ description: "URI of the player avatar" })
  @IsNotEmpty()
  @IsString()
  public avatarUri: string = "";

  @ApiProperty({ description: "Country of the player" })
  @IsNotEmpty()
  @IsString()
  public country: string = "";

  @ApiProperty({
    description: "List of third-party identifiers associated with the player",
    type: [ThirdPartyIdentifierApiV1]
  })
  @ValidateNested({ each: true }) // Valide chaque élément du tableau
  @Type(() => ThirdPartyIdentifierApiV1) // Spécifie le type des éléments
  public thirdPartyIdentifiers: ThirdPartyIdentifierApiV1[] = [];
}
