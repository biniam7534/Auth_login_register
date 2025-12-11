import express from 'express';
// import cors from 'cors';
import {connectDB} from './config/db.js';
import authRoutes from './routes/auth.js';
import dotenv from 'dotenv';
dotenv.config();

const PORT = process.env.PORT || 5000;

const app = express();

app.use("/api/users", authRoutes)
connectDB();

app.listen(PORT, () => {
    console.log(`server started at port ${PORT}`)
});

