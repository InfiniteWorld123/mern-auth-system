export function sendResponse({res, success, status, message, payload = null}) {
    return res.status(status).json({
        success,
        message,
        ...(payload && { data: payload }),
    });
}