import { jwtService } from "../services/jwt.service.js";

export const authMiddleware = (req, res, next) => {
  const autorization = req.headers['authorization'] || '';
  const [,token] = autorization.split(' ');

  if (!autorization || !token) {
    res.sendStatus(401);
    return;
  }

  const userDate = jwtService.verify(token);
  if (!userDate) {
    res.sendStatus(401);
    return;
  }

  req.user = userDate;
  next();
}
