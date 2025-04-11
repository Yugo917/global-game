export enum AppStore {
    AppelStore = "AppelStore",
    GooglePlayStore = "GooglePlayStore",
    XiaomiStore = "XiaomiStore",
    PlaystationStore = "PlaystationStore",
    NintendoEShop = "NintendoEShop",
    Steam = "Steam",
    unknown = "unknown"
}

export class Game {
    public id: string = "";
    public name: string = "";
    public thirdPartyIdentifiers: ThirdPartyIdentifier[] = [];
    public badgeUri: string = "";
    public isActive: boolean = false;
    public appStore: AppStore = AppStore.unknown;
    public updateDate: Date = new Date();
    public creationDate: Date = new Date();
    private __isGame?: unknown;
}

export class ThirdPartyIdentifier {
    public id: string = "";
    public name: string = "";
    public appStore: AppStore = AppStore.unknown;
}

export class CreateGame {
    public name: string = "";
    public badgeUri: string = "";
    public appStore: AppStore = AppStore.unknown;
    public thirdPartyIdentifiers: ThirdPartyIdentifier[] = [];
}

export class UpdateGame {
    public name: string = "";
    public badgeUri: string = "";
    public appStore: AppStore = AppStore.unknown;
    public thirdPartyIdentifiers: ThirdPartyIdentifier[] = [];
}

export class GameSearchCriteria {
    public ids?: string[];
    public names?: string[];
    public creationDateStart?: Date;
    public creationDateEnd?: Date;
    public nbRows: number = 100;
}