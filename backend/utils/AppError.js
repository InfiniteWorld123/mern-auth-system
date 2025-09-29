export class AppError extends Error {
    /**
     * @param {string} message - رسالة الخطأ
     * @param {number} status - HTTP status code (default 400)
     * @param {object|array} details - تفاصيل إضافية عن الخطأ (مثل errors من Zod أو Mongoose)
     */
    constructor(message, status = 400, details = null) {
        super(message);
        this.status = status;
        this.details = details;
        this.name = "AppError";
        Error.captureStackTrace(this, this.constructor);
    }
}