import express from 'express';
import { dbConnection } from './config/dbConnection.js';
import dotenv from 'dotenv';
dotenv.config();
import userRoutes from './routes/userRoutes.js';


const app = express();


app.use('/api/user', userRoutes)

dbConnection();

app.listen(7070, ()=>{
    console.log('App is listening on port 7070 !!'); 
})