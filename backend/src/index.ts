import "dotenv/config";
import express from "express";
import connectDB from "./config/db.js";
import { APP_ORIGIN, NODE_ENV, PORT } from "./constants/env.js";
import cors from "cors";
import cookieParser from "cookie-parser";
import errorHandler from "./middleware/errorHandler.js";
import catchError from "./utils/catchError.js";
import { OK } from "./constants/http.js";
import authRoutes from "./routes/auth.route.js";
const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(
  cors({
    origin: APP_ORIGIN,
    credentials: true,
  })
);

app.use(cookieParser());

app.get(
  "/",
  catchError(async ( req,res,next) => {
    return res.status(OK).json({
      status: "healthy",
    });
  })
);
app.use("/auth",authRoutes)
app.use(errorHandler);

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT} in ${NODE_ENV} mode`);
  connectDB();
});
