import { Resend } from "resend";
import { RESEND } from "../constants/env.js";

const resend = new Resend(RESEND);

export default resend;