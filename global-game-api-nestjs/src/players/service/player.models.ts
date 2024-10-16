import { Type } from "class-transformer";

// Player model for the service layer
export class Player {
  id: string;
  avatarUri: string;
  country: string;
  isBanned: boolean;
  isActive: boolean;

  @Type(() => Date)
  updateDate: Date;

  @Type(() => Date)
  creationDate: Date;
}


export class CreatePlayer {
  avatarUri: string;
  country: string;
}

export class UpdatePlayer {
  avatarUri: string;
  country: string;
  isBanned: boolean;
}
