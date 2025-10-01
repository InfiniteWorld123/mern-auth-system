import crypto from "crypto";

function generateSixDigitCode() {
    const n = crypto.randomInt(0, 1_000_000);
    return String(n).padStart(6, "0");
}

export function createVerificationCode(ttlMinutes = 15) {
    const code = generateSixDigitCode();
    const expiresAt = Date.now() + ttlMinutes * 1000 * 60;
    return { code, expiresAt }; // save both in DB or memory
}


function generateSecureToken() {
    return crypto.randomBytes(32).toString('hex');
}

export function createResetToken(ttlMinutes = 60) {
    const token = generateSecureToken();
    const expiresAt = Date.now() + ttlMinutes * 1000 * 60;
    return { 
        token, 
        expiresAt: new Date(expiresAt) 
    };
}
