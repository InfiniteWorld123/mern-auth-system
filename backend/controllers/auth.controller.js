import { catchError, catchTransactionError } from "../utils/catchError.js";
import { sendResponse } from "../utils/sendResponse.js"; // This utility is defined below
import { JWT_SECRET, NODE_ENV } from "../constants/env.js"
import { createResetToken, createVerificationCode } from "../utils/generate.js";
import { AppError } from "../utils/AppError.js";
import jwt from "jsonwebtoken";
import User from "../models/auth.model.js"
import bcrypt from "bcrypt"


export const signUp = catchTransactionError(async (req, res, next, session) => {
    const { name, email, password } = req.body;

    const doesUserExist = await User.findOne({ email }, null, { session });
    if (doesUserExist) throw new AppError("Email address is already in use by another account.", 409);

    const hashedPassword = await bcrypt.hash(password, 12);
    const { code, expiresAt } = createVerificationCode(15);

    const newUser = new User({
        name,
        email,
        password: hashedPassword,
        verificationCode: code,
        verificationCodeExpiresAt: expiresAt
    });

    await newUser.save({ session });

    const userPayload = {
        ...newUser.toObject(),
        password: undefined
    };

    const jwtToken = jwt.sign({ id: newUser._id }, JWT_SECRET, { expiresIn: "7d" });

    res.cookie("token", jwtToken, {
        httpOnly: true,
        secure: NODE_ENV === "production",
        sameSite: NODE_ENV === "production" ? "None" : "strict",
        maxAge: 7 * 24 * 60 * 60 * 1000,
        path: "/"
    });

    sendResponse({
        res,
        status: 201,
        success: true,
        message: "Account created successfully. Verification email sent.",
        payload: {
            user: userPayload // payload منظم
        }
    });
});

export const signIn = catchError(async (req, res) => {
    const { email, password } = req.body;

    const user = await User.findOne({ email });
    if (!user) throw new AppError("Invalid credentials (email or password is wrong)", 401);

    const comparePassword = await bcrypt.compare(password, user.password);
    if (!comparePassword) throw new AppError("Invalid credentials (email or password is wrong)", 401);

    if (!user.isVerified) throw new AppError("Account is not verified. Please check your email for the verification link", 403);

    const userPayload = {
        ...user.toObject(),
        password: undefined
    };

    const jwtToken = jwt.sign({ id: user._id }, JWT_SECRET, { expiresIn: "7d" });

    res.cookie("token", jwtToken, {
        httpOnly: true,
        secure: NODE_ENV === "production",
        sameSite: NODE_ENV === "production" ? "None" : "strict",
        maxAge: 7 * 24 * 60 * 60 * 1000,
        path: "/"
    });

    sendResponse({
        res,
        status: 200,
        success: true,
        message: "Signed in successfully.",
        payload: {
            user: userPayload
        }
    });
})

export const signOut = catchError(async (req, res) => {
    res.clearCookie("token");
    sendResponse({
        res,
        status: 204,
        success: true,
        message: "Signed out successfully.",
    });
})

export const verifyEmail = catchTransactionError(async (req, res, next, session) => {
    const { code } = req.body;

    const user = await User.findOne({
        verificationCode: code,
        verificationCodeExpiresAt: { $gt: Date.now() }
    }, null, { session });

    if (!user) throw new AppError("Invalid or expired verification code", 401);

    user.isVerified = true;
    user.verificationCode = null;
    user.verificationCodeExpiresAt = null;

    await user.save({ session });

    // إرسال إيميل الترحيب
    // ... some logic

    sendResponse({
        res,
        success: true,
        status: 200,
        message: "Email is successfully verified",
        payload: {
            user: {
                ...user.toObject(),
                password: undefined
            }
        }
    });
});

export const forgotPassword = catchError(async (req, res) => {
    const email = req.body.email.toLowerCase();
    const user = await User.findOne({ email });

    // it is send it as not an error, for not letting the attacker know's if the email exist
    if (!user) {
        return sendResponse({
            res,
            status: 200,
            success: true,
            message: "Password reset link sent successfully (if the user exists).",
        });
    }

    const { token, expiresAt } = createResetToken(30);

    user.resetPasswordToken = token;
    user.resetPasswordTokenExpiresAt = expiresAt;
    await user.save();

    // 4. إرسال الرابط/الـ Token في بريد إلكتروني
    // ... logic to send email with the token ...

    sendResponse({
        res,
        status: 200,
        success: true,
        message: "Password reset link sent successfully (if the user exists).",
    });
});

export const resetPassword = catchTransactionError(async (req, res, next, session) => {
    const { password } = req.body;
    const { token } = req.params;

    const userWithToken = await User.findOne({ resetPasswordToken: token }, null, { session });

    if (!userWithToken) throw new AppError("Invalid reset password token", 401);
    if (userWithToken.resetPasswordExpiresAt.getTime() <= Date.now()) throw new AppError("Token is expired", 401);

    const hashedPassword = await bcrypt.hash(password, 12);

    userWithToken.password = hashedPassword;
    userWithToken.resetPasswordToken = null;
    userWithToken.resetPasswordExpiresAt = null;

    await userWithToken.save({ session });

    sendResponse({ res, success: true, status: 200, message: "Password is reset successfully" })
})

export const checkAuth = catchError(async (req, res) => {
    const { userId } = req;
    const user = await User.findById(userId);
    if (!user) throw new AppError("User not found or session expired", 404);

    const userPayload = {
        ...user.toObject(),
        password: undefined
    };

    sendResponse({
        res,
        status: 200,
        success: true,
        message: "User is authenticated and session is active.",
        payload: {
            user: userPayload
        }
    });
});


import sendEmail from "../config/email.js";

export const sendsend = catchError(async (req, res) => {
    await sendEmail({ to: "wardayaman47@gmail.com", subject: "test email", html: "<div>test send email</div>" })
    res.json({ success: true, message: "email sent successfully" })
})