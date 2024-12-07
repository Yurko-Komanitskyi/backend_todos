import express from "express";
import * as userController from './../controllers/user.controller.js';
import { authMiddleware } from "../middleware/authMiddleware.js";
import { catchError } from "../utils/catchError.js";

const router = express.Router();

router.patch('/user/:id', authMiddleware, express.json(), catchError(userController.update));

router.delete('/user/:id', authMiddleware, catchError(userController.remove));

export { router };
