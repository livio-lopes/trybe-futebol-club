import { Board } from '../Interfaces/Match';
import TeamModel from '../models/TeamModel';
import MatchModel from '../models/MatchModel';
import IClassification from '../Interfaces/Leaderboard';
import Classification from '../utils/InfoLeaderboard';

class LeaderboardService {
  constructor(
    private teamModel: TeamModel = new TeamModel(),
    private matchModel: MatchModel = new MatchModel(),
  ) {}

  private async getLeaderboardNoOrder(board:Board): Promise<IClassification[]> {
    const teams = await this.teamModel.findAll();
    const matches = await this.matchModel.findAll();
    const classification = teams.map((team) => ({ teamId: team.id, name: team.teamName }));
    return classification.map((team) => ({
      name: team.name,
      totalPoints: Classification.countTotalPoints(matches, team.teamId, board),
      totalGames: Classification.countTotalGames(matches, team.teamId, board),
      totalVictories: Classification.countVictories(matches, team.teamId, board),
      totalDraws: Classification.countDraws(matches, team.teamId, board),
      totalLosses: Classification.countLosses(matches, team.teamId, board),
      goalsFavor: Classification.countGoalsFavor(matches, team.teamId, board),
      goalsOwn: Classification.countGoalsOwn(matches, team.teamId, board),
      goalsBalance: Classification.countGoalsBalance(matches, team.teamId, board),
      efficiency: Classification.efficiency(matches, team.teamId, board),
    }));
  }

  public async getLeaderboardOrded(board:Board):Promise<IClassification[]> {
    const leaderboardNoOrder = await this.getLeaderboardNoOrder(board);
    // https://developer.mozilla.org/pt-BR/docs/Web/JavaScript/Reference/Global_Objects/Array/sort
    const leaderboardOrderByVictories = leaderboardNoOrder
      .sort((a:IClassification, b:IClassification) =>
        b.totalPoints - a.totalPoints
        || b.totalVictories - a.totalVictories
        || b.goalsBalance - a.goalsBalance
        || b.goalsFavor - a.goalsFavor);
    return leaderboardOrderByVictories;
  }

  //   [].every()
  //   [].some()
  // public async getLeaderboardOrderByGoalsBalance(board:Board):Promise<IClassification[]> {
  //   const leaderboardOrderByVictories = await this.getLeaderboardOrderByVictories(board);
  //   const leaderboardOrderByGoalsBalance = leaderboardOrderByVictories
  //     .sort((a:IClassification, b:IClassification) =>
  //       b.goalsBalance - a.goalsBalance);
  //   return leaderboardOrderByGoalsBalance;
  // }

  // public async getLeaderboardOrderByGoalsFavor(board:Board):Promise<IClassification[]> {
  //   const leaderboardOrderByGoalsBalance = await this.getLeaderboardOrderByGoalsBalance(board);
  //   const leaderboardOrderByGoalsFavor = leaderboardOrderByGoalsBalance
  //     .sort((a:IClassification, b:IClassification) =>
  //       b.goalsFavor - a.goalsFavor);
  //   return leaderboardOrderByGoalsFavor;
  // }

  public async getLeaderboard(board:Board):Promise<IClassification[]> {
    const leaderboard = await this.getLeaderboardOrded(board);
    return leaderboard;
  }
}
export default LeaderboardService;

// const TRUE = () => {
//   console.log('true');
//   return true;
// };
// const FALSE = () => {
//   console.log('false');
//   return false;
// };

// TRUE() && TRUE();
// TRUE() && FALSE();
// FALSE() && TRUE();
// FALSE() && FALSE();

// true && true;
// true && false;
// false && true;
// false && false;

// true || true;
// true || false;
// false || true;
// false || false;
