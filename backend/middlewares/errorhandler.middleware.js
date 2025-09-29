import { sendResponse } from "../utils/sendResponse.js";

export function errorHandler(err, req, res, next) {
    // Zod Validation
    if (err.name === "ZodError") {
        const formattedErrors = err.errors.map(e => ({
            field: e.path.join("."),
            message: e.message,
        }));
        return sendResponse(res, false, 400, "Validation failed (Zod)", formattedErrors);
    }

    // Mongoose Validation
    if (err.name === "ValidationError") {
        return sendResponse(res, false, 400, "Validation failed (Mongoose)", err.errors);
    }

    // MongoDB Duplicate Key
    if (err.code === 11000) {
        const field = Object.keys(err.keyValue)[0];
        return sendResponse(res, false, 400, `Duplicate value for field ${field}`, err.keyValue);
    }

    // أي خطأ عام
    const status = err.status || 500;
    const message = err.message || "Internal server error";
    return sendResponse(res, false, status, message);
}