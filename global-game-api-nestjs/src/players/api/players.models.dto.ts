import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty } from 'class-validator';

export class PlayerApiDtoV1 {
  @ApiProperty({ description: 'Unique identifier of the player' })
  id: string;

  @ApiProperty({ description: 'URI of the player avatar' })
  avatarUri: string;

  @ApiProperty({ description: 'Country of the player' })
  country: string;

  @ApiProperty({ description: 'Flag indicating if the player is banned' })
  isBanned: boolean;

  @ApiProperty({ description: 'Active status of the player' })
  isActive: boolean;

  @ApiProperty({ description: 'Last update date of the player record' })
  updateDate: Date;

  @ApiProperty({ description: 'Creation date of the player record' })
  creationDate: Date;
}

export class PlayerCreateApiV1 {
  @ApiProperty({ description: 'URI of the player avatar' })
  @IsNotEmpty()
  avatarUri: string;

  @ApiProperty({ description: 'Country of the player' })
  @IsNotEmpty()
  country: string;
}

export class PlayerUpdateApiV1 {
  @ApiProperty({ description: 'URI of the player avatar' })
  @IsNotEmpty()
  avatarUri: string;

  @ApiProperty({ description: 'Country of the player' })
  @IsNotEmpty()
  country: string;

  @ApiProperty({ description: 'Flag indicating if the player is banned' })
  @IsNotEmpty()
  isBanned: boolean;
}
