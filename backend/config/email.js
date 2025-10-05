import { Resend } from "resend";
import { RESEND } from "../constants/env.js";

const resend = new Resend(RESEND);

const sendEmail = async ({to, subject, html}) => {
  await resend.emails.send({
    from: "Acme <onboarding@resend.dev>",
    to: [to],
    subject,
    html,
  });
}

export default sendEmail;