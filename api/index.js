import express from 'express';
import { dbConnection } from './config/dbConnection.js';
import dotenv from 'dotenv';
dotenv.config();

const app = express();

dbConnection();

app.listen(7070, ()=>{
    console.log('App is listening on port 7070 !!'); 
})