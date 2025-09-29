import { sendResponse } from "../utils/sendResponse.js"

export const validate = (schema) => (req, res, next) => {
    try {
        req.body = schema.parse(req.body);
        next();
    } catch (err) {
        return sendResponse({
            res,
            success: false,
            status: 400,
            message: err.message,
            payload: err
        })
    }
};