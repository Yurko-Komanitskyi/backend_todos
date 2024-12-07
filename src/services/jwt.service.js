import jwt from "jsonwebtoken";

function sing(User) {
  const token = jwt.sign(User, process.env.JWT_KEY, {
    expiresIn: "300s",
  });

  return token;
}

function verify(token) {
  try {
    return jwt.verify(token, process.env.JWT_KEY);
  } catch (error) {
    return null;
  }
}

function singRefresh(User) {
  const token = jwt.sign(User, process.env.JWT_REFRESH_KEY);

  return token;
}

function verifyRefresh(token) {
  try {
    return jwt.verify(token, process.env.JWT_REFRESH_KEY);
  } catch (error) {
    return null;
  }
}

export const jwtService = {
  sing,
  verify,
  verifyRefresh,
  singRefresh,
};
