import z from "zod";

export const errorHandler = (err, req, res, next) => {
    console.error(`[Error] occurred: ${req.method} ${req.path}`, err);

    if (err instanceof z.ZodError) {
        const formattedErrors = err.errors.map((issue) => ({
            field: issue.path.join("."),
            message: issue.message,
        }));

        return res.status(400).json({
            success: false,
            message: "Validation failed",
            errors: formattedErrors,
        });
    }

    const statusCode = err.statusCode || 500;

    const message = statusCode === 500 ? "Internal server error" : err.message;

    return res.status(statusCode).json({
        success: false,
        message: message || "Something went wrong",
    });
};
