import { models } from "../models/index.js";

const User = models.User;

const normalize = (user) => {
  if (user) {
    const {id, email, name, surname} = user;
    return {id, email, name, surname};
  } else {
    return null;
  }
}

const getById = async (id) => {
  const user = await User.findByPk(id);
  return normalize(user);
}

const create = async (name, surname, password, email) => {
  const user = await User.create({ name, surname, password, email });
  return normalize(user);
}

const update = (id, body) => {
  return User.update(body, { where: { id } });
}

const remove = (id) => {
  User.destroy({
    where: {
      id
    }
  });
}

const findByEmail = (email) => {
  return User.findOne({ where: {email}});
}

const userService = {
  findByEmail,
  remove,
  normalize,
  getById,
  create,
  update,
};

export default userService;
