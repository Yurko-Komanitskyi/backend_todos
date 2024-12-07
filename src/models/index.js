import Sequelize from 'sequelize';
import * as User from './user.js';
import * as Todo from './todo.js';
import * as Token from './token.js';

let config = {
  database: process.env.DATABASE_NAME,
  username: process.env.DATABASE_USER,
  password: process.env.DATABASE_PASSWORD,
  host: process.env.DATABASE_HOST,
  dialect: process.env.DATABASE_DIALECT,
};

const db = {};

const sequelize = new Sequelize(config.database, config.username, config.password, {
  host: config.host,
  dialect: config.dialect,
});

let model = User.initialization(sequelize, Sequelize.DataTypes);
db[model.name] = model;
model = Todo.initialization(sequelize, Sequelize.DataTypes);
db[model.name] = model;
model = Token.initialization(sequelize, Sequelize.DataTypes);
db[model.name] = model;

Object.keys(db).forEach(modelName => {
  if (db[modelName].associate) {
    db[modelName].associate(db);
  }
});
db.sequelize = sequelize;
db.Sequelize = Sequelize;

const models = {
  User: User.User,
  Todo: Todo.Todo,
  Token: Token.Token,
}

export default db;
export {
  models,
  sequelize
};

