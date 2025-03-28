import { IContestDto } from "./Contest";

export interface ILeaderBoardDto {
  contest: IContestDto;
  bestScore: number;
  leaderBoard: ILeaderBoardItemDto[];
}

export interface ILeaderBoardItemDto {
  playerRank: string;
  playerName: string;
  playerScore: string;

}

export interface ISummaryContestDto {
  contest: IContestDto;
  bestScore: number;
}
