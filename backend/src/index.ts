import "dotenv/config";
import express from "express";
import connectDB from "./config/db.js";
import { APP_ORIGIN, NODE_ENV, PORT } from "./constants/env.js";
import cors from "cors"
import cookieParser from "cookie-parser";
import errorHandler from "./middleware/errorHandler.js";
import catchError from "./utils/catchError.js";

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors({
    origin: APP_ORIGIN,
    credentials: true,
}));

app.use(cookieParser());



app.get("/", catchError(  async(req, res,next) => {

    throw new Error("we testing the errror dynamic");
    res.status(200).json({
      status:"healthy"
    });

    
  })
 
);
app.use(errorHandler);

app.listen(PORT,()=>{
    console.log(`Server is running on port ${PORT} in ${NODE_ENV} mode`);
    connectDB();
});

