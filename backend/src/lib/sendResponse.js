export const sendResponse = (
    res,
    success = true,
    statusCode = 200,
    message,
    data,
) => {
    return res.status(statusCode).json({
        success,
        message,
        data,
    });
};
