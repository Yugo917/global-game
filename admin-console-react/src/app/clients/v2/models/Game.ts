export interface IGameDto {
  globalGameIdentifier: IGameIdentifierDto;
  thirdPartyIdentifiers: IThirdGameIdentifierDto[];
  badge: string;
  isActive: boolean;
  updateDate: Date;
  creationDate: Date;
}

export interface IGameIdentifierDto {
  id: string;
  name: string;
}

export interface IAppStoreDto {
  appStore: AppStore;
}

export enum AppStore {
  AppelStore = "AppelStore",
  GooglePlayStore = "GooglePlayStore",
  XiaomiStore = "XiaomiStore",
  Steam = "Steam",
}

export interface IThirdGameIdentifierDto extends IGameIdentifierDto, IAppStoreDto { }
