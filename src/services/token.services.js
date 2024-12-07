import { models } from "../models/index.js";

const Token = models.Token;

const save = async (UserId, newToken) => {
  const token = await Token.findOne({ where: { UserId } });

  if (!token) {
    await Token.create({ UserId, refreshToken: newToken });
    return;
  }

  token.refreshToken = newToken;
  await token.save();
};

const getByToken = async (refreshToken) => {
  return Token.findOne({ where: { refreshToken } });
};

const remove = async (UserId) => {
  return Token.destroy({ where: { UserId } });
};

const tokenService = {
  save,
  remove,
  getByToken,
};

export default tokenService;
