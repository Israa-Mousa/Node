import dotenv from "dotenv";
dotenv.config();
import express, {Request,Response, NextFunction } from "express";
import { getEnvOrThrow } from "./shared/utils/utils";
import { handleError } from './shared/utils/exception';

const app = express();
const PORT = getEnvOrThrow('PORT');
console.log('process.env.PORT',process.env.PORT);
app.use(express.json());

app.get("/", (_req, res) => {
  res.json({ ok: true, message: "Express + TS server is running 🎉" });
});

app.use((error: unknown, req: Request, res: Response, next: NextFunction) => {
  handleError(error, res);
});

app.listen(PORT, () => {
  console.log(`✅ Server running on http://localhost:${PORT}`);
});
