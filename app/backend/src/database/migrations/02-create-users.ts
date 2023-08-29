import { Model, QueryInterface, DataTypes } from 'sequelize';
import IUser from '../../../src/Interfaces/User';

export default{
  up: async (queryInterface: QueryInterface) => {
    return queryInterface.createTable<Model<IUser>>('users', {
      id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
        allowNull: false,
      },
      userName: {
        field: 'user_name',
        type: DataTypes.STRING,
      },
      role:{
        type: DataTypes.STRING,
      },
      email:{
        type: DataTypes.STRING,
      },
      password:{
        type: DataTypes.STRING,
      },
    })
  },
  down: async (queryInterface: QueryInterface) => {
    return queryInterface.dropTable('users');
  }
}