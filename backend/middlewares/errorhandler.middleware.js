import { sendResponse } from "../utils/sendResponse.js";

export function errorHandler(err, req, res, next) {
    // Zod Validation
    if (err.name === "ZodError") {
        const errorsToFormat = err.issues || [];

        const formattedErrors = errorsToFormat.map(e => ({
            field: e.path.join(".") || "unknown",
            message: e.message,
            expected: e.expected,
            received: e.received
        }));

        sendResponse({
            res,
            success: false,
            status: 400,
            message: "Validation failed (Zod)",
            payload: formattedErrors
        });
    }

    // Mongoose Validation
    if (err.name === "ValidationError") {
        sendResponse({ res, 
            success: false, 
            status: 400, 
            message: "Validation failed (Mongoose)", 
            payload: err.errors 
        })
    }

    // MongoDB Duplicate Key
    if (err.code === 11000) {
        const field = Object.keys(err.keyValue)[0];
        sendResponse({ res, success: false, status: 400, message: `Duplicate value for field ${field}`, payload: err.keyValue })
    }

    // أي خطأ عام
    const status = err.status || 500;
    const message = err.message || "Internal server error";
    sendResponse({ res, success: false, status, message });
}