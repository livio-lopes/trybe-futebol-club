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

  public async getLeaderboard(board:Board):Promise<IClassification[]> {
    const leaderboard = await this.getLeaderboardNoOrder(board);
    return Classification.classificationSorted(leaderboard);
  }
}
export default LeaderboardService;
