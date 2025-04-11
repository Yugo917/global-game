import { IPlayerSearchCriteriaDtoV1 } from "../../../../clients/v1/ModelsApiV1";
import { IPlayerSearchCriteria } from "./PlayerSearchCriteria";

export class PlayerMapper {
  public static toPlayerSearchCriteriaDtoV1(searchCriteria: IPlayerSearchCriteria) {
    const searchDto: IPlayerSearchCriteriaDtoV1 = {
      ids: searchCriteria.ids?.split(";"),
      names: searchCriteria.names?.split(";"),
      emails: searchCriteria.emails?.split(";"),
      thirdPartyIds: searchCriteria.thirdPartyIds?.split(";"),
      thirdPartyNames: searchCriteria.thirdPartyNames?.split(";"),
      thirdPartyEmails: searchCriteria.thirdPartyEmails?.split(";"),
      creationDateStart: searchCriteria.creationDateStart,
      creationDateEnd: searchCriteria.creationDateEnd,
      nbRows: searchCriteria.nbRows

    };
    return searchDto;
  }
}
