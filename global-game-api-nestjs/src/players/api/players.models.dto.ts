import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty, IsString } from "class-validator";

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
}
