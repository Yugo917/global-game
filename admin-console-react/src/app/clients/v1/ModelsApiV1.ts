// Players
export interface IPlayerDtoV1 {
  id: string;
  name: string;
  email: string;
  avatarUri: string;
  avatarName: string;
  country: string;
  thirdPartyIdentifiers: IThirdPartyIdentifierDtoV1[];
  isBanned: boolean;
  isActive: boolean;
  updateDate: Date;
  creationDate: Date;
}

export interface IThirdPartyIdentifierDtoV1 {
  id: string;
  name: string;
  email: string;
  avatarUri: string;
  gameServiceProvider: "Unknown" | "GoogleGames" | "GameCenter";
}

export interface IPlayerCreateDtoV1 {
  name: string;

  email: string;

  avatarUri: string;

  country: string;
}

export interface IPlayerUpdateDtoV1 {
  avatarUri: string;

  country: string;

  thirdPartyIdentifiers: IThirdPartyIdentifierDtoV1[];
}

export interface IPlayerSearchCriteriaDtoV1 {
  ids?: string[];
  names?: string[];
  emails?: string[];
  thirdPartyIds?: string[];
  thirdPartyNames?: string[];
  thirdPartyEmails?: string[];
  creationDateStart?: Date;
  creationDateEnd?: Date;
  nbRows: number;
}

// Games
export enum AppStoreDtoV1 {
  AppelStore = "AppelStore",
  GooglePlayStore = "GooglePlayStore",
  XiaomiStore = "XiaomiStore",
  PlaystationStore = "PlaystationStore",
  NintendoEShop = "NintendoEShop",
  Steam = "Steam",
  unknown = "unknown"
}

export interface IThirdGameIdentifierDtoV1 {
  id: string;
  name: string;
  appStore: AppStoreDtoV1;
}

export interface IGameDtoV1 {
  id: string;
  name: string;
  badgeUri: string;
  isActive: boolean;
  thirdPartyIdentifiers: IThirdGameIdentifierDtoV1[];
  creationDate: Date;
  updateDate: Date;
}

export interface IGameCreateDtoV1 {
  name: string;
  badgeUri: string;
  appStore: AppStoreDtoV1;
  thirdPartyIdentifiers?: IThirdGameIdentifierDtoV1[];
}

export interface IGameUpdateDtoV1 {
  name: string;
  badgeUri: string;
  appStore: AppStoreDtoV1;
  thirdPartyIdentifiers?: IThirdGameIdentifierDtoV1[];
}

export interface IGameSearchCriteriaDtoV1 {
  ids?: string[];
  names?: string[];
  appStores?: AppStoreDtoV1[];
  creationDateStart?: Date;
  creationDateEnd?: Date;
  nbRows?: number;
}
