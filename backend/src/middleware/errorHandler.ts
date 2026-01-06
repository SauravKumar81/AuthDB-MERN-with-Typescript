import type { ErrorRequestHandler } from "express";

const errorHandler: ErrorRequestHandler = (error ,req ,res ,next)=>{
    console.log(`Path: ${req.path}`,error);
    return res.status(500).send("Internal Server Error");
};

export default errorHandler;