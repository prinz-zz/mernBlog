import express from 'express';
import dotenv from 'dotenv';
dotenv.config()
import morgan from 'morgan'
import cors from 'cors'
import authRoutes from './routes/authRoutes.js'

const app = express()
app.use(express.json())
app.use(morgan('common'))
app.use(cors())

app.use('/api', authRoutes)

app.listen(5050, ()=> console.log('listening on port 5050'))