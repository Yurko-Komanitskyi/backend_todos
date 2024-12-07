import { ApiError } from "../exeptions/api.error.js";
import { jwtService } from "../services/jwt.service.js";
import {
  validateName,
  validateSurname,
  validatePassword,
  validateEmail,
} from "./user.controller.js";
import userService from "../services/user.service.js";
import bcrypt from "bcrypt";
import tokenService from "../services/token.services.js";

export const register = async (req, res) => {
  const { name, surname, password, email } = req.body;

  const errors = {
    name: validateName(name),
    surname: validateSurname(surname),
    password: validatePassword(password),
    email: validateEmail(email),
  };

  if (!errors.email) {
    const user = await userService.findByEmail(email);

    if (user) {
      throw ApiError.BadRequest(`User with this email already exists`);
    }
  }

  if (errors.name || errors.surname || errors.password) {
    throw ApiError.UnprocessableEntity(errors);
  }

  const pw = await bcrypt.hash(password, 10);
  const user = await userService.create(name, surname, pw, email);

  generateTokens(res, user);
};

export const login = async (req, res) => {
  const { email, password } = req.body;

  const user = await userService.findByEmail(email);

  if (!user) {
    throw ApiError.NotFound(`User with this email not found`);
  }

  const isPasswordValid = await bcrypt.compare(password, user.password);

  if (!isPasswordValid) {
    throw ApiError.NotFound(`User with this password not found`);
  }

  generateTokens(res, user);
};

export const refresh = async (req, res) => {
  const { refreshToken } = req.cookies;

  if (!refreshToken) {
    res.sendStatus(401);
    return;
  }

  const userData = jwtService.verifyRefresh(refreshToken);
  const token = await tokenService.getByToken(refreshToken);

  if (!userData || !token) {
    throw ApiError.NotFound(`Invalid refresh token`);
  }

  generateTokens(res, userData);
};

const generateTokens = async (res, user) => {
  const normilezedUser = userService.normalize(user);
  const accesToken = jwtService.sing(normilezedUser);
  const refreshAccessToken = jwtService.singRefresh(normilezedUser);

  await tokenService.save(normilezedUser.id, refreshAccessToken);

  res.cookie("refreshToken", refreshAccessToken, {
    maxAge: 60 * 24 * 60 * 60 * 1000,
    HttpOnly: true,
  });
  res.send({
    user: normilezedUser,
    accesToken,
  });
};

export const logout = async (req, res) => {
  const { refreshToken } = req.cookies;
  const userData = jwtService.verifyRefresh(refreshToken);

  if (!userData || !refreshToken) {
    throw ApiError.NotFound("Invalid token");
  }

  await tokenService.remove(userData.id);
  res.clearCookie("refreshToken");

  res.sendStatus(204);
};
