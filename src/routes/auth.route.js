import express from "express";
import * as authController  from "../controllers/authController.js";
import { authMiddleware } from "../middleware/authMiddleware.js";
import cookieParser from "cookie-parser";
import { catchError } from "../utils/catchError.js";

const router = express.Router();

router.get('/refresh', express.json(), cookieParser(), catchError(authController.refresh));
router.post('/login', express.json(), cookieParser(), catchError(authController.login));
router.post('/logout', authMiddleware, express.json(), cookieParser(), catchError(authController.logout));
router.post('/register', express.json(), catchError(authController.register));

export { router };
