import { Model } from 'sequelize';

export class Token extends Model {
  static associate(models) {
    Token.belongsTo(models.User);
  }
}
export const initialization = (sequelize, DataTypes) => {
  Token.init({
    id: {
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
      type: DataTypes.INTEGER
    },
    refreshToken: {
      type: DataTypes.TEXT
    }
  }, {
    sequelize,
    modelName: 'Token',
  });
  return Token;
};
