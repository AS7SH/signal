import {
    deleteUserService,
    getUserService,
    updateUserService,
} from "../services/user.service.js";
import { asyncHandler } from "../middlewares/AsyncHandler.middleware.js";
import { sendResponse } from "../lib/sendResponse.js";
import { updateUserValidator } from "../validators/user.validator.js";

export const getUserController = asyncHandler(async (req, res) => {
    const { username } = req.params;
    const response = await getUserService(username);
    return sendResponse(
        res,
        true,
        200,
        "retrieved user successfully",
        response,
    );
});

export const updateUserController = asyncHandler(async (req, res) => {
    const { _id } = req.user;
    const body = updateUserValidator.parse(req.body);

    const response = await updateUserService(body, _id);
    return sendResponse(res, true, 200, "updated user successfully", response);
});

export const deleteUserController = asyncHandler(async (req, res) => {
    const { _id } = req.user;
    const response = await deleteUserService(_id);
    return sendResponse(res, true, 200, "user deleted successfully", response);
});
