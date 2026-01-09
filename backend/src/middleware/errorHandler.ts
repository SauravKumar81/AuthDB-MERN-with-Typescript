import type { ErrorRequestHandler ,Response } from "express";
import z from "zod"
import { BAD_REQUEST } from "../constants/http.js";

const handleZodError =(res:Response , error:z.ZodError)=>{
    const errors = error.issues.map((err)=>({
        path:err.path.join ("."),
        message:err.message,
    }))
    return res.status(BAD_REQUEST).json({
        message:error.message,
        error,
    });
};
const errorHandler: ErrorRequestHandler = (error ,req ,res ,next)=>{
    console.log(`Path: ${req.path}`,error);

    if(error instanceof z.ZodError){
        return handleZodError(res,error)

    }
    return res.status(500).send("Internal Server Error");
};

export default errorHandler;