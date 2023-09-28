import express from "express";
import dotenv from "dotenv";
dotenv.config();
import morgan from "morgan";
import cors from "cors";
import authRoutes from "./routes/authRoutes.js";
import { dbConnection } from "./dbConnection/dbConnection.js";
import { errorHandler } from "./middlewares/errorHandler.js";
import cookieParser from "cookie-parser";

//Middlewares
const app = express();
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(morgan("common"));


//DB connection
dbConnection();

app.use("/api", authRoutes);

//error handler
app.use(errorHandler);

app.listen(5050, () => console.log("listening on port 5050"));
