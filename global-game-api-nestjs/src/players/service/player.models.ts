type AvatarName =
  | "zebra" | "rabbit" | "rhino" | "buffalo" | "crocodile"
  | "seal" | "pig" | "hippo" | "giraffe" | "ostrich"
  | "walrus" | "penguin" | "bear" | "snake" | "chicken"
  | "gecko" | "macaw" | "horse" | "elephant" | "duck"
  | "sloth" | "panda" | "blue_hippo" | "eagle" | "moose"
  | "gray_rhino" | "owl" | "gorilla" | "koala" | "camel" | "unknown";


export class Player {
  public id: string = "";
  public name: string = "";
  public email: string = "";
  public avatarUri: string = "";
  public avatarName: AvatarName = "unknown";
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
  public avatarName: AvatarName = "unknown";
  public country: string = "";
  private __isCreatePlayer?: unknown;
}

export class UpdatePlayer {
  public avatarUri: string = "";
  public avatarName: AvatarName = "unknown";
  public country: string = "";
  public thirdPartyIdentifiers: ThirdPartyIdentifier[] = [];
  private __isUpdatePlayer?: unknown;
}

export class PlayerSearchCriteria {
  public ids?: string[];;
  public names?: string[];;
  public emails?: string[];;
  public thirdPartyIds?: string[];
  public thirdPartyNames?: string[];
  public thirdPartyEmails?: string[];
  public creationDateStart?: Date;
  public creationDateEnd?: Date;
  public nbRows: number = 0;
  private __isSearchCriteria?: unknown;
}
