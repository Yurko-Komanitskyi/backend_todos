import { models } from "../models/index.js";

const Todo = models.Todo;

const getAll = async (UserId) => {
  return await Todo.findAll({ where: { UserId } });
};

const create = async ({
  name,
  description,
  deadline,
  UserId,
}) => {
  return await Todo.create({ name, description, deadline, UserId });
}

const update = async ({ id, UserId, body }) => {
  return Todo.update(body, { where: { id, UserId } });
}

const remove = async (id, UserId) => {
  Todo.destroy({
    where: {
      id,
      UserId,
    }
  });
}
const todoService = {
  remove,
  update,
  create,
  getAll,
};

export default todoService;