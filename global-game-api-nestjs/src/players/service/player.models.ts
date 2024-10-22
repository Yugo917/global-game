export class Player {
  public id: string = "";
  public name: string = "";
  public email: string = "";
  public avatarUri: string = "";
  public country: string = "";
  public isBanned: boolean = false;
  public isActive: boolean = false;
  public updateDate: Date = new Date();
  public creationDate: Date = new Date();
  private __isPlayer?: unknown;
}

export class CreatePlayer {
  public name: string = "";
  public email: string = "";
  public avatarUri: string = "";
  public country: string = "";
  private __isCreatePlayer?: unknown;
}

export class UpdatePlayer {
  public avatarUri: string = "";
  public country: string = "";
  private __isUpdatePlayer?: unknown;
}
