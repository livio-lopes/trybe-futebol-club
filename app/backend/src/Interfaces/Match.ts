export default interface IMatch {
  id: number;
  homeTeamId: number;
  homeTeamGoals: number;
  awayTeamId: number;
  awayTeamGoals: number;
  inProgress: boolean;
}

export interface INewMatch {
  homeTeamId: number;
  awayTeamId: number;
  awayTeamGoals: number;
  homeTeamGoals: number;
}

export type GameResults = 'Victory' | 'Defeat' | 'Draw';

export type Board = 'home' | 'away' | undefined;

export interface IMatchWithAssociations extends IMatch {
  homeTeam: { teamName: string };
  awayTeam: { teamName: string };
}

export interface IGoalsScore{
  id:number
  homeTeamGoals: number;
  awayTeamGoals: number;
}

export interface IGoals{
  status: number;
  data: { message: string };
}
