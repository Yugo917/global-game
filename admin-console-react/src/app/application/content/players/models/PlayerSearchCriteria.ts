export interface IPlayerSearchCriteria {
  ids: string;
  names: string;
  emails: string;
  thirdPartyIds: string;
  thirdPartyNames: string;
  thirdPartyEmails: string;
  creationDateStart: Date;
  creationDateEnd: Date;
  nbRows: number;
}
