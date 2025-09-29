import { Router } from "express";
import { catchError } from "../utils/catchError.js";

const authRouter = Router();

export const signUp = catchError(async (req, res) => {
    res.json({ message: "User signed up successfully" });
})

export const signIn = catchError(async (req, res) => {
    res.json({ message: "User signed in successfully" });
})

export const signOut = catchError(async (req, res) => {
    res.json({ message: "User signed out successfully" });
})
