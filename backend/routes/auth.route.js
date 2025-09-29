import { Router } from "express";

const authRouter = Router();

// تسجيل حساب جديد
authRouter.post("/sign-up", (req, res) => {
    // logic: create user, hash password, save in DB
    res.json({ message: "User signed up successfully" });
});

// تسجيل الدخول
authRouter.post("/sign-in", (req, res) => {
    // logic: verify user, issue JWT, set cookie
    res.json({ message: "User signed in successfully" });
});

// تسجيل الخروج
authRouter.post("/sign-out", (req, res) => {
    // logic: clear JWT cookie
    res.json({ message: "User signed out successfully" });
});

// تحديث أو إعادة إصدار Access Token باستخدام Refresh Token
authRouter.post("/refresh-token", (req, res) => {
    // logic: verify refresh token, issue new access token
    res.json({ message: "Access token refreshed" });
});

// تأكيد البريد الإلكتروني بعد التسجيل
authRouter.get("/verify-email/:token", (req, res) => {
    // logic: verify email token
    res.json({ message: "Email verified successfully" });
});

// إعادة إرسال رابط تأكيد البريد
authRouter.post("/resend-verification", (req, res) => {
    // logic: resend email verification link
    res.json({ message: "Verification email resent" });
});

// طلب إعادة تعيين كلمة المرور
authRouter.post("/forgot-password", (req, res) => {
    // logic: send reset link to email
    res.json({ message: "Password reset link sent" });
});

// إعادة تعيين كلمة المرور
authRouter.post("/reset-password/:token", (req, res) => {
    // logic: verify reset token, update password
    res.json({ message: "Password has been reset" });
});

// تغيير كلمة المرور (بعد تسجيل الدخول)
authRouter.post("/change-password", (req, res) => {
    // logic: check old password, update with new one
    res.json({ message: "Password changed successfully" });
});

// جلب بيانات المستخدم الحالي (محمي بـ JWT Middleware)
authRouter.get("/me", (req, res) => {
    // logic: return user data from JWT payload
    res.json({ message: "User profile data" });
});

export default authRouter;