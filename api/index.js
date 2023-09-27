import express from 'express';
import dotenv from 'dotenv';
dotenv.config()
import morgan from 'morgan'
import cors from 'cors'

const app = express()
app.use(morgan('common'))
app.use(cors())

app.listen(5050, ()=> console.log('listening on port 5050'))