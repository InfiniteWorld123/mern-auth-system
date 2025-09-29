import { Router } from "express";
import { signUp, signIn, signOut } from "../controllers/auth.controller.js";
import { validate } from "../validation/validate.js"
import { signupSchema, signinSchema } from "../validation/auth.validation.js"

const authRouter = Router();

authRouter.post("/sign-up", validate(signupSchema), signUp);

authRouter.post("/sign-in", validate(signinSchema), signIn);

authRouter.post("/sign-out", signOut);

export default authRouter;