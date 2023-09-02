export default interface IClassification {
  name: string;
  totalPoints: number; // totalVictories * 3 + totalDraws
  totalGames: number;
  totalVictories: number;
  totalDraws: number;
  totalLosses: number;
  goalsFavor:number,
  goalsOwn:number,
  goalsBalance:number, // goalsFavor - goalsOwn
  efficiency:string, // [totalPoints / (totalGames * 3)] * 100
}
