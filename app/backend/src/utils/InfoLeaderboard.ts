import { IMatchWithAssociations, GameResults, Board } from '../Interfaces/Match';

export default class Classification {
  private static allMatchesFinished(matches:IMatchWithAssociations[]):IMatchWithAssociations[] {
    return matches.filter((match) => match.inProgress === false);
  }

  private static allMatchesFinishedWithTeamId(
    matches:IMatchWithAssociations[],
    teamId:number,
  ):IMatchWithAssociations[] {
    return Classification.allMatchesFinished(matches)
      .filter((match) => match.homeTeamId === teamId || match.awayTeamId === teamId);
  }

  private static allMatchesHomeTeamId(
    matches:IMatchWithAssociations[],
    teamId:number,
  ):IMatchWithAssociations[] {
    return Classification.allMatchesFinishedWithTeamId(matches, teamId)
      .filter((match) => match.homeTeamId === teamId);
  }

  private static allMatchesAwayTeamId(
    matches:IMatchWithAssociations[],
    teamId:number,
  ):
    IMatchWithAssociations[] {
    return Classification.allMatchesFinishedWithTeamId(matches, teamId)
      .filter((match) => match.awayTeamId === teamId);
  }

  private static gameRules(match:IMatchWithAssociations, teamId:number):GameResults {
    if (match.homeTeamId === teamId && match.homeTeamGoals > match.awayTeamGoals) {
      return 'Victory';
    }
    if (match.awayTeamId === teamId && match.awayTeamGoals > match.homeTeamGoals) {
      return 'Victory';
    }
    if (match.homeTeamGoals === match.awayTeamGoals) {
      return 'Draw';
    }
    return 'Defeat';
  }

  private static chooseBoardTeamId(
    board: Board,
    matches:IMatchWithAssociations[],
    teamId:number,
  ):IMatchWithAssociations[] {
    if (board === 'home') {
      return Classification.allMatchesHomeTeamId(matches, teamId);
    }
    if (board === 'away') {
      return Classification.allMatchesAwayTeamId(matches, teamId);
    }
    return Classification.allMatchesFinishedWithTeamId(matches, teamId);
  }

  public static countGoalsFavor(
    matches:IMatchWithAssociations[],
    teamId:number,
    board: Board,
  ):number {
    const allMatchesFinished = Classification.chooseBoardTeamId(board, matches, teamId);
    let counter = 0;
    allMatchesFinished.forEach((match) => {
      if (match.homeTeamId === teamId) {
        counter += match.homeTeamGoals;
      }
      if (match.awayTeamId === teamId) {
        counter += match.awayTeamGoals;
      }
    });
    return counter;
  }

  public static countGoalsOwn(
    matches:IMatchWithAssociations[],
    teamId:number,
    board: Board,
  ):number {
    const allMatchesFinished = Classification.chooseBoardTeamId(board, matches, teamId);
    let counter = 0;
    allMatchesFinished.forEach((match) => {
      if (match.homeTeamId === teamId) {
        counter += match.awayTeamGoals;
      }
      if (match.awayTeamId === teamId) {
        counter += match.homeTeamGoals;
      }
    });
    return counter;
  }

  public static countGoalsBalance(
    matches:IMatchWithAssociations[],
    teamId:number,
    board: Board,
  ):number {
    const goalsFavor = Classification.countGoalsFavor(matches, teamId, board);
    const goalsOwn = Classification.countGoalsOwn(matches, teamId, board);
    return goalsFavor - goalsOwn;
  }

  public static countVictories(
    matches:IMatchWithAssociations[],
    teamId:number,
    board:Board,
  ):number {
    const allMatchesFinished = Classification.chooseBoardTeamId(board, matches, teamId);
    let counter = 0;
    allMatchesFinished.forEach((match) => {
      if (Classification.gameRules(match, teamId) === 'Victory') {
        counter += 1;
      }
    });
    return counter;
  }

  public static countDraws(
    matches:IMatchWithAssociations[],
    teamId:number,
    board: Board,
  ):number {
    let counter = 0;
    const allMatchesFinished = Classification.chooseBoardTeamId(board, matches, teamId);
    allMatchesFinished.forEach((match) => {
      if (Classification.gameRules(match, teamId) === 'Draw') {
        counter += 1;
      }
    });
    return counter;
  }

  public static countTotalPoints(
    matches:IMatchWithAssociations[],
    teamId:number,
    board:Board,
  ):number {
    const victoryPoint = 3;
    const drawPoint = 1;
    const totalVictories = Classification.countVictories(matches, teamId, board) * victoryPoint;
    const totalDraws = Classification.countDraws(matches, teamId, board) * drawPoint;
    return totalDraws + totalVictories;
  }

  public static efficiency(
    matches:IMatchWithAssociations[],
    teamId:number,
    board:Board,
  ):string {
    const totalPoints = Classification.countTotalPoints(matches, teamId, board);
    const totalGames = Classification.countTotalGames(matches, teamId, board);
    const result = (totalPoints / (totalGames * 3)) * 100;
    console.log(result);
    return result.toFixed(2);
  }

  public static countLosses(
    matches:IMatchWithAssociations[],
    teamId:number,
    board: Board,
  ):number {
    const allMatchesFinished = Classification.chooseBoardTeamId(board, matches, teamId);
    let counter = 0;
    allMatchesFinished.forEach((match) => {
      if (Classification.gameRules(match, teamId) === 'Defeat') {
        counter += 1;
      }
    });
    return counter;
  }

  public static countTotalGames(
    matches: IMatchWithAssociations[],
    teamId: number,
    board: Board,
  ): number {
    const totalGames = Classification.chooseBoardTeamId(board, matches, teamId);
    return totalGames.length;
  }
}

// public async countMatchestoTeam(teamId: number): Promise<number> {
//   const matches = await this.model.count({
//     where: { [sequelize.Op.or]: [{ homeTeamId: teamId }, { awayTeamId: teamId }] } });
//   return matches;
// }
