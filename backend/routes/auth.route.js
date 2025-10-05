import { Router } from "express";
import { signUp, signIn, signOut, verifyEmail, forgotPassword, resetPassword, checkAuth } from "../controllers/auth.controller.js";
import { validate } from "../middlewares/validate.middleware.js"
import { signupSchema, signinSchema, resetPasswordSchema } from "../validation/auth.validation.js"
import { verifyToken } from "../middlewares/verifyToken.middleware.js";

const authRouter = Router();

authRouter.post("/sign-up", validate(signupSchema), signUp);

authRouter.post("/sign-in", validate(signinSchema), signIn);

authRouter.post("/sign-out", signOut);

authRouter.post("/verify-email", verifyEmail);

authRouter.post("/forgot-password", forgotPassword);

authRouter.post("/reset-password/:token", validate(resetPasswordSchema), resetPassword);

authRouter.get("/check-auth", verifyToken, checkAuth);


export default authRouter;