import express from 'express';
// import cors from 'cors';
import connectDB from './config/db.js';

import dotenv from 'dotenv';
dotenv.config();

const PORT = process.env.PORT || 5000;

const app = express();

app.get("/", (req,res)=> {
    res.send("biniam");
});

connectDB();

app.listen(PORT, () => {
    console.log(`server started at port ${PORT}`)
});

