import { ApiError } from "../exeptions/api.error.js";
import bcrypt from "bcrypt";

export function validateEmail(value) {
  if (!value.trim()) {
    return "Email is required";
  }

  const emailPattern = /^[\w.+-]+@([\w-]+\.){1,3}[\w-]{2,}$/;

  if (!emailPattern.test(value)) {
    return "Email is not valid";
  }
}

export function validatePassword(value) {
  if (!value.trim()) {
    return "Password is required";
  }

  if (value.length < 6) {
    return "At least 6 characters";
  }

  const regularExpression = /^[a-zA-Z0-9!@#$%^&*]{6,16}$/;
  if (!regularExpression.test(value)) {
    return "Password should contain atleast one number and one special character";
  }
}

export function validateName(value) {
  if (!value.trim()) {
    return "Name is required";
  }
}

export function validateSurname(value) {
  if (!value.trim()) {
    return "Surname is required";
  }
}

export const update = async (req, res) => {
  const { id } = req.params;
  const body = req.body;

  const errors = {
    name: body.name === undefined ? null : validateName(body.name),
    surname: body.role === undefined ? null : validateSurname(body.surname),
    password:
      body.password === undefined ? null : validatePassword(body.password),
    email: body.email === undefined ? null : validateEmail(body.email),
  };

  if (errors.name || errors.surname || errors.password || errors.email) {
    throw ApiError.UnprocessableEntity(errors);
  }

  if (body.password) {
    body.password = await bcrypt.hash(body.password, 10);
  }

  await userService.update(id, body);
  res.sendStatus(200);
};

export const remove = async (req, res) => {
  const { id } = req.params;

  userService.remove(id);
  res.sendStatus(204);
};
