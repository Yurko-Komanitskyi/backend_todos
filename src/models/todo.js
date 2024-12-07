import { Model } from 'sequelize';

export class Todo extends Model {
  static associate(models) {
    Todo.belongsTo(models.User);
  }
}
export const initialization = (sequelize, DataTypes) => {
  Todo.init({
    id: {
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
      type: DataTypes.INTEGER
    },
    name: {
      type: DataTypes.TEXT,
      allowNull: false,
    },
    description: {
      type: DataTypes.STRING,
    },
    deadline: {
      type: DataTypes.DATE,
    },
  }, {
    sequelize,
    modelName: 'Todo',
  });
  return Todo;
};