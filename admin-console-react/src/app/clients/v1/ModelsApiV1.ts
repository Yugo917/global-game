export interface IPlayerDtoV1 {
  id: string;

  name: string;

  email: string;

  avatarUri: string;

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
  id: string | null;
  name: string | null;
  email: string | null;
  creationDateStart: Date | null;
  creationDateEnd: Date | null;
  pageIndex: number | null;
  nbRowPerPage: number | null;
  limit: number | null;
  gameId: string | null;
}
