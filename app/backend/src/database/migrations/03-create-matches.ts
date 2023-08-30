import { on } from 'events';
import { type } from 'os';
import { Model, QueryInterface, DataTypes } from 'sequelize';
import IMatch from '../../Interfaces/Match';


export default {
  up: async (queryInterface: QueryInterface) => {
    return queryInterface.createTable<Model<IMatch>>('matches', {
      id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
        allowNull: false
      },
      homeTeamId: {
        type: DataTypes.INTEGER,
        field: 'home_team_id',
        allowNull: false,
        references:{
          model: 'teams',
          key: 'id'
          
        },
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE',
      },
      homeTeamGoals: {
        type: DataTypes.INTEGER,
        field: 'home_team_goals',
      },
      awayTeamId: {
        type: DataTypes.INTEGER,
        field: 'away_team_id',
        allowNull: false,
        references:{
          model: 'teams',
          key: 'id'
          
        },
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE',
      },
      awayTeamGoals: {
        type: DataTypes.INTEGER,
        field: 'away_team_goals',
      },
      inProgress: {
        type: DataTypes.BOOLEAN,
        field: 'in_progress',
      },

    })
  },
  down: async (queryInterface: QueryInterface) => { 
    return queryInterface.dropTable('matches');
  }
}