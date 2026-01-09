import { Router } from "express";
import { registerHandler } from "../controllers/auth.controllers.js";

const authRoutes=Router();

authRoutes.post("/register",registerHandler)


export default authRoutes;