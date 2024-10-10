import { ApiProperty } from "@nestjs/swagger";
import { IsBoolean, IsDate, IsNotEmpty, IsString } from "class-validator";

export class PlayerApiDtoV1 {
  @ApiProperty({ description: "Unique identifier of the player" })
  @IsNotEmpty()
  @IsString()
  public id: string;

  @ApiProperty({ description: "URI of the player avatar" })
  @IsNotEmpty()
  @IsString()
  public avatarUri: string;

  @ApiProperty({ description: "Country of the player" })
  @IsNotEmpty()
  @IsString()
  public country: string;

  @ApiProperty({ description: "Flag indicating if the player is banned" })
  @IsNotEmpty()
  @IsBoolean()
  public isBanned: boolean;

  @ApiProperty({ description: "Active status of the player" })
  @IsNotEmpty()
  @IsBoolean()
  public isActive: boolean;

  @ApiProperty({ description: "Last update date of the player record" })
  @IsNotEmpty()
  @IsDate()
  public updateDate: Date;

  @ApiProperty({ description: "Creation date of the player record" })
  @IsNotEmpty()
  @IsDate()
  public creationDate: Date;
}

export class PlayerCreateApiV1 {
  @ApiProperty({ description: "URI of the player avatar" })
  @IsNotEmpty()
  @IsString()
  public avatarUri: string;

  @ApiProperty({ description: "Country of the player" })
  @IsNotEmpty()
  @IsString()
  public country: string;
}

export class PlayerUpdateApiV1 {
  @ApiProperty({ description: "URI of the player avatar" })
  @IsNotEmpty()
  @IsString()
  public avatarUri: string;

  @ApiProperty({ description: "Country of the player" })
  @IsNotEmpty()
  @IsString()
  public country: string;

  @ApiProperty({ description: "Flag indicating if the player is banned" })
  @IsNotEmpty()
  @IsBoolean()
  public isBanned: boolean;
}
