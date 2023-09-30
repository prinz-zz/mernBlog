import express from "express";
import dotenv from "dotenv";
dotenv.config();
import morgan from "morgan";
import cors from "cors";
import authRoutes from "./routes/authRoutes.js";
import { dbConnection } from "./dbConnection/dbConnection.js";
import { errorHandler } from "./middlewares/errorHandler.js";
import cookieParser from "cookie-parser";

const app = express();

//Middlewares
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(morgan("common"));
app.use(cors());

// app.use(
//   cors({
//     origin: "http://localhost:4000",
//     credentials: true, // <= Accept credentials (cookies) sent by the client
//   })
// );

//DB connection
dbConnection();

app.use("/api/users", authRoutes);

//error handler
app.use(errorHandler);

app.listen(5050, () => console.log("listening on port 5050"));
