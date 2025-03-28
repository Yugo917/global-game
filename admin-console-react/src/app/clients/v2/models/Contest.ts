export interface IContestDto {
  id: string;
  name: string;
  unit: string;
  winnerComparaisonOperator: WinnerComparaisonOperatorDto;
}

export enum WinnerComparaisonOperatorDto {
  Superior = "Superior",
  Inferior = "Inferior",
}
