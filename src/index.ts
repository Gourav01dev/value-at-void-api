import dotenv from "dotenv";
dotenv.config();

import express from "express";
import { connectDb } from "./config/dbConnection";
import { jobRouter } from "./routes/jobRoutes";
import { errorHandlerMiddleware } from "./middlewares/error-handler";
import cors from 'cors';

const port = process.env.PORT || "5000";
const apiKey = process.env.API_KEY;
const app = express();

app.use(express.json());

app.use(cors({
  origin: '*'
}));

app.use(`${apiKey}`, jobRouter);

connectDb();

app.use(errorHandlerMiddleware);

app.listen(port, () => console.log(`servers is running on ${port}`));
