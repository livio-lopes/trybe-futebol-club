import { Model, QueryInterface, DataTypes } from 'sequelize';
import ITeam from '../../../src/Interfaces/Team';


export default {
  up: async (queryInterface: QueryInterface) => {
    return queryInterface.createTable<Model<ITeam>>('teams', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: DataTypes.INTEGER,
      },
      teamName: {
        field: 'team_name',
        type: DataTypes.STRING,
      }
    })
  },
  down: async (queryInterface: QueryInterface) => { 
    return queryInterface.dropTable('teams');
  },
}