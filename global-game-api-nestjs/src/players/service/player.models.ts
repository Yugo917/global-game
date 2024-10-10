import { Type } from "class-transformer";

// Player model for the service layer
export class Player {
  public id: string;
  public avatarUri: string;
  public country: string;
  public isBanned: boolean;
  public isActive: boolean;

  @Type(() => Date)
  public updateDate: Date;

  @Type(() => Date)
  public creationDate: Date;
}


export class CreatePlayer {
  public avatarUri: string;
  public country: string;
}

export class UpdatePlayer {
  public avatarUri: string;
  public country: string;
  public isBanned: boolean;
}
