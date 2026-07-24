import z from "zod";

export const errorHandler = (err, req, res, next) => {
    console.log(`[Error] occured: ${req.path}`, err);

    if (err instanceof z.ZodError) {
        const validationIssues = err.issues || err.errors || [];
        const firstErrorMessage =
            validationIssues[0]?.message || "Validation failed";
        console.log(firstErrorMessage);

        return res.status(300).json({
            success: false,
            message: firstErrorMessage,
            errors:
                typeof err.flatten === "function"
                    ? z.treeifyError(err)
                    : validationIssues,
        });
    }

    const statusCode = err.statusCode || 500;

    const message = statusCode === 500 ? "Internal server error" : err.message;

    return res.status(statusCode).json({
        success: false,
        message: message,
        error: err?.message || "Something went wrong",
    });
};
