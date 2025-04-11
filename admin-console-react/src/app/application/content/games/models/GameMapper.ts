import { IGameSearchCriteriaDtoV1 } from "../../../../clients/v1/ModelsApiV1";
import { IGameSearchCriteria } from "./GameSearchCriteria";

export class GameMapper {
  public static toGameSearchCriteriaDtoV1(searchCriteria: IGameSearchCriteria): IGameSearchCriteriaDtoV1 {
    const searchDto: IGameSearchCriteriaDtoV1 = {
      ids: searchCriteria.ids?.split(";"),
      names: searchCriteria.names?.split(";"),
      creationDateStart: searchCriteria.creationDateStart,
      creationDateEnd: searchCriteria.creationDateEnd,
      nbRows: searchCriteria.nbRows
    };

    return searchDto;
  }
}
