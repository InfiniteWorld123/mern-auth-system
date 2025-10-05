import { JWT_SECRET } from "../constants/env.js";
import { AppError } from "../utils/AppError.js";
import { catchError } from "../utils/catchError.js";
import jwt from "jsonwebtoken"

export const verifyToken = catchError((req, res, next) => {
    const token = req.cookies.token;
    if (!token) throw new AppError("Unauthorized - Invalid token", 401);
    
    const decoded = jwt.verify(token, JWT_SECRET);
    req.userId = decoded.id;

    next()
})