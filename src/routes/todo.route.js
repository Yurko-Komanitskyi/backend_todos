import express from "express";
import * as todoController from '../controllers/todo.controller.js';
import { authMiddleware } from "../middleware/authMiddleware.js";
import { catchError } from "../utils/catchError.js";

const router = express.Router();

router.get('/todo', authMiddleware, catchError(todoController.get));

router.get('/todo/:id', authMiddleware, catchError(todoController.getOne));

router.post('/todo', authMiddleware, express.json(), catchError(todoController.create));

router.patch('/todo/:id', authMiddleware, express.json(), catchError(todoController.update));

router.delete('/todo/:id', authMiddleware, catchError(todoController.remove));

export { router };
