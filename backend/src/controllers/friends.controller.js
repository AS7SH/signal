import { sendResponse } from "../lib/sendResponse.js";
import { asyncHandler } from "../middlewares/AsyncHandler.middleware.js";
import {
    acceptRequestService,
    blockUserService,
    cancelRequestService,
    deleteFriendService,
    getAllFriendsService,
    getBlockedUsersService,
    rejectRequestService,
    sendRequestService,
    unblockUserService,
} from "../services/friends.service.js";

export const getAllFriendsController = asyncHandler(async (req, res) => {
    const { _id } = req.user;
    const response = await getAllFriendsService(_id);

    return sendResponse(res, true, 200, "retrieved all friends", response);
});

export const deleteFriendController = asyncHandler(async (req, res) => {
    const { friendId } = req.params;
    const { _id } = req.user;
    await deleteFriendService(_id, friendId);

    return sendResponse(res, true, 200, "deleted the friend");
});

export const getIncomingRequestsController = asyncHandler(async (req, res) => {
    const { _id } = req.user;

    const response = await getIncomingRequestsService(_id);
    return sendResponse(
        res,
        true,
        200,
        "retrieved all the incoming requests",
        response,
    );
});

export const getOutgoingRequestsController = asyncHandler(async (req, res) => {
    const { _id } = req.user;

    const response = await getOutgoingRequestsService(_id);
    return sendResponse(
        res,
        true,
        200,
        "retrieved all the outgoing requests",
        response,
    );
});

export const sendRequestController = asyncHandler(async (req, res) => {
    const { _id } = req.user;
    const { userId } = req.params;

    const response = await sendRequestService(_id, userId);
    return sendResponse(res, true, 200, "sent the frined request", response);
});

export const acceptRequestController = asyncHandler(async (req, res) => {
    const { requestId } = req.params;
    const { _id } = req.user;

    const response = await acceptRequestService(_id, requestId);

    return sendResponse(res, true, 200, "accept friend request", response);
});

export const rejectRequestController = asyncHandler(async (req, res) => {
    const { requestId } = req.params;
    const { _id } = req.user;

    const response = await rejectRequestService(_id, requestId);

    return sendResponse(res, true, 200, "rejected the request", response);
});

export const cancelRequestController = asyncHandler(async (req, res) => {
    const { requestId } = req.params;
    const { _id } = req.user;

    const response = await cancelRequestService(_id, requestId);

    return sendResponse(res, true, 200, "canceled the request", response);
});

export const getBlockedUsersController = asyncHandler(async (req, res) => {
    const { _id } = req.user;

    const response = await getBlockedUsersService(_id);

    return sendResponse(
        res,
        true,
        200,
        "retrieved all blocked users",
        response,
    );
});

export const blockUserController = asyncHandler(async (req, res) => {
    const { _id } = req.user;
    const { friendId } = req.params;

    const response = await blockUserService(_id, friendId);

    return sendResponse(res, true, 200, "blocked the user", response);
});

export const unblockUserController = asyncHandler(async (req, res) => {
    const { _id } = req.user;
    const { friendId } = req.params;

    const response = await unblockUserService(_id, friendId);

    return sendResponse(res, true, 200, "unblocked the user", response);
});
