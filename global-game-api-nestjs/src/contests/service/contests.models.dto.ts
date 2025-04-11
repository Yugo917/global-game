export interface IContest {
    id: string;
    name: string;
    unit: string;
    winnerComparaisonOperator: WinnerComparaisonOperator;
}

export enum WinnerComparaisonOperator {
    Superior = "Superior",
    Inferior = "Inferior",
    Equal = "Equal",
}

export interface IScore {
    id: string,
    idGame: string,
    idPlayer: string,
    value: number,
}
