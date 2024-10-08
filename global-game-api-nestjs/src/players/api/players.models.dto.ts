import { ApiProperty } from "@nestjs/swagger";
import { IsBoolean, IsDate, IsNotEmpty, IsString } from "class-validator";

export class PlayerApiDtoV1 {
  @ApiProperty({ description: "Unique identifier of the player" })
  @IsNotEmpty()
  @IsString()
  id: string;

  @ApiProperty({ description: "URI of the player avatar" })
  @IsNotEmpty()
  @IsString()
  avatarUri: string;

  @ApiProperty({ description: "Country of the player" })
  @IsNotEmpty()
  @IsString()
  country: string;

  @ApiProperty({ description: "Flag indicating if the player is banned" })
  @IsNotEmpty()
  @IsBoolean()
  isBanned: boolean;

  @ApiProperty({ description: "Active status of the player" })
  @IsNotEmpty()
  @IsBoolean()
  isActive: boolean;

  @ApiProperty({ description: "Last update date of the player record" })
  @IsNotEmpty()
  @IsDate()
  updateDate: Date;

  @ApiProperty({ description: "Creation date of the player record" })
  @IsNotEmpty()
  @IsDate()
  creationDate: Date;
}

export class PlayerCreateApiV1 {
  @ApiProperty({ description: "URI of the player avatar" })
  @IsNotEmpty()
  @IsString()
  avatarUri: string;

  @ApiProperty({ description: "Country of the player" })
  @IsNotEmpty()
  @IsString()
  country: string;
}

export class PlayerUpdateApiV1 {
  @ApiProperty({ description: "URI of the player avatar" })
  @IsNotEmpty()
  @IsString()
  avatarUri: string;

  @ApiProperty({ description: "Country of the player" })
  @IsNotEmpty()
  @IsString()
  country: string;

  @ApiProperty({ description: "Flag indicating if the player is banned" })
  @IsNotEmpty()
  @IsBoolean()
  isBanned: boolean;
}
