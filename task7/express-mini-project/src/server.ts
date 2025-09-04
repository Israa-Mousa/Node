import dotenv from "dotenv";
dotenv.config();
import express, { Request, Response, NextFunction } from "express";
import { getEnvOrThrow } from "./shared/utils/utils";
import { handleError } from './shared/utils/exception';
import { userRouter } from "./users/user.route";
import { authRouter } from "./auth/auth.routes";
import { responseEnhancer } from "./shared/middlewares/response.middleware";
import { isProduction } from './config/app.config';
import { userRepository } from "./users/user.repsitory";
userRepository.init()
const app = express();
const PORT = getEnvOrThrow('PORT');

// Apply the responseEnhancer middleware here
app.use(responseEnhancer);

app.use(express.json());

app.get("/", (_req, res) => {
  res.json({ ok: true, message: "Express + TS server is running 🎉" });
});

console.log('process.env.xxxxx', process.env.PORT);

// Now apply userRouter routes
app.use('/api/v1/auth', authRouter);

app.use('/api/v1/users', userRouter);

// Error handler middleware should be at the end
app.use((error: unknown, req: Request, res: Response, next: NextFunction) => {
  handleError(error, res);
});

app.listen(PORT, () => {
  console.log(`✅ Server running on http://localhost:${PORT}`);
});
