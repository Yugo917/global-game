export interface IPlayerDto {
  identifier: IPlayerIdentifierDto;
  thirdPartyIdentifiers: IThirdPartyPlayerIdentifierDto[];
  avatarUri: string;
  country: string;
  isBanned: boolean;
  isActive: boolean;
  updateDate: Date;
  creationDate: Date;
}

export interface IPlayerIdentifierDto {
  id: string;
  name: string;
  email: string;
}

export interface IServiceProviderDto {
  serviceProvider: ServiceProviderDto;
}

export enum ServiceProviderDto {
  GlobalGames = "GlobalGames",
  GoogleGames = "GoogleGames",
  GameCenter = "GameCenter"
}

export interface IThirdPartyPlayerIdentifierDto extends IPlayerIdentifierDto, IServiceProviderDto { }

export interface IPlayerSearchCriteriaDto {
  id: string | null;
  name: string | null;
  email: string | null;
  creationDateStart: Date | null;
  creationDateEnd: Date | null;
  pageIndex: number | null;
  pageResultNumber: number | null;
  gameId: string | null;
}

export interface IGameDto {
  id: string;
  name: string;
}
