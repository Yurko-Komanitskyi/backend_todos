import { ApiError } from "../exeptions/api.error.js";
import todoService from "../services/todo.service.js";

export function validateName(value) {
  if (!value.trim()) {
    return "Name is required";
  }
}

export function validateDeadline(value) {
  if (!value) {
    return;
  }

  const deadlineDate = new Date(value);

  if (isNaN(deadlineDate)) {
    return "Invalid date format";
  }
}

export const get = async (req, res) => {
  const UserId = req.user.id;
  res.send(await todoService.getAll(UserId));
};

export const create = async (req, res) => {
  const { name, description, deadline } = req.body;
  const UserId = req.user.id;

  const errors = {
    name: validateName(name),
    deadline: validateDeadline(deadline),
  };

  if (errors.name || errors.deadline) {
    throw ApiError.UnprocessableEntity(errors);
  }

  const todo = await todoService.create({
    name,
    description,
    deadline,
    UserId,
  });
  res.statusCode = 201;
  res.send(todo);
};

export const update = async (req, res) => {
  const { id } = req.params;
  const body = req.body;
  const UserId = req.user.id;

  const errors = {
    name: body.name === undefined ? null : validateName(body.name),
    deadline:
      body.deadline === undefined ? null : validateDeadline(body.deadline),
  };

  if (errors.name || errors.deadline) {
    throw ApiError.UnprocessableEntity(errors);
  }

  await todoService.update({ id, UserId, body });
  res.sendStatus(200);
};

export const remove = async (req, res) => {
  const { id } = req.params;
  const UserId = req.user.id;

  await todoService.remove(id, UserId);
  res.sendStatus(204);
};
