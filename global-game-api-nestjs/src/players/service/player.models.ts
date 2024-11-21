export class Player {
  public id: string = "";
  public name: string = "";
  public email: string = "";
  public avatarUri: string = "";
  public country: string = "";
  public thirdPartyIdentifiers: ThirdPartyIdentifier[] = [];
  public isBanned: boolean = false;
  public isActive: boolean = false;
  public updateDate: Date = new Date();
  public creationDate: Date = new Date();
  private __isPlayer?: unknown;
}

export class ThirdPartyIdentifier {
  public id: string = "";
  public name: string = "";
  public email: string = "";
  public avatarUri: string = "";
  public gameServiceProvider: "Unknown" | "GoogleGames" | "GameCenter" = "Unknown";
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
  public thirdPartyIdentifiers: ThirdPartyIdentifier[] = [];
  private __isUpdatePlayer?: unknown;
}
