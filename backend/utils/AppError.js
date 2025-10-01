export class AppError extends Error {
    constructor(message, status = 400, details = null) {
        super(message);
        this.status = status;
        this.details = details;
        this.name = "AppError";
        Error.captureStackTrace(this, this.constructor);
    }
}