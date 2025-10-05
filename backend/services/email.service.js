import resend from "../config/resend.js";
import resetPasswordTemplate from "../email templates/resetPassword.template.js";
import welcomeTemplate from "../email templates/welcome.template.js";
import verifyEmailTemplate from "../email templates/verifyEmail.template.js";


export const sendVerifyEmail = async ({ to, subject, verificationCode, verificationLink }) => {
    console.log("Sending verify email to", to);
    await resend.emails.send({
        from: "Verify Email <support@yamanwarda.dev>",
        to: [to],
        subject,
        html: verifyEmailTemplate({ verificationCode, verificationLink }),
    });
}

export const sendResetPasswordEmail = async ({ to, subject, resetPasswordLink }) => {
    console.log("Sending reset password email to", to);
    await resend.emails.send({
        from: "Reset Password <support@yamanwarda.dev>",
        to: [to],
        subject,
        html: resetPasswordTemplate({ resetPasswordLink }),
    });
}

export const sendWelcomeEmail = async ({ to, subject, name, loginLink }) => {
    console.log("Sending welcome email to", to);
    await resend.emails.send({
        from: "Welcome <support@yamanwarda.dev>",
        to: [to],
        subject,
        html: welcomeTemplate({ name, loginLink }),
        text: `Hello ${name}!\nWelcome to Yaman Warda.\nVisit ${loginLink} to log in.`
    });
    console.log(welcomeTemplate({ name, loginLink }));
}   