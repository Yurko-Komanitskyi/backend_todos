import "dotenv/config";
import express from "express";
import Cors from "cors";

import { router as todoRouter } from "./routes/todo.route.js";
import { router as authRouter } from "./routes/auth.route.js";
import { router as userRouter } from "./routes/user.route.js";
import { errorMiddleware } from "./middleware/errorMiddleware.js";

const PORT = process.env.PORT || 3005;

const app = express();

console.log(process.env.CLIENT_HOST);

app.use(
  Cors({
    origin: process.env.CLIENT_HOST,
    credentials: true,
  })
);

app.use("/", userRouter);
app.use("/", todoRouter);
app.use("/", authRouter);

app.use(errorMiddleware);

app.listen(PORT, () => {
  console.log("server is running", PORT);
});
