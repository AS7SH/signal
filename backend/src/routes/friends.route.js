import { Router } from "express";
import {
    acceptRequestController,
    blockUserController,
    cancelRequestController,
    deleteFriendController,
    getAllFriendsController,
    getBlockedUsersController,
    getIncomingRequestsController,
    getOutgoingRequestsController,
    rejectRequestController,
    searchUsersController,
    sendRequestController,
    unblockUserController,
} from "../controllers/friends.controller.js";
import { ProtectRoute } from "../middlewares/ProtectRoute.middleware.js";

const friendsRouter = Router()
    .use(ProtectRoute)

    .get("/", getAllFriendsController)
    .delete("/:friendId", deleteFriendController)

    .get("/requests/incoming", getIncomingRequestsController)
    .get("/requests/outgoing", getOutgoingRequestsController)

    .post("/requests/:userId", sendRequestController)

    .patch("/requests/:requestId/accept", acceptRequestController)
    .patch("/requests/:requestId/reject", rejectRequestController)

    .delete("/requests/:requestId", cancelRequestController)

    .get("/search/:query", searchUsersController)

    .get("/blocked", getBlockedUsersController)
    .post("/block/:friendId", blockUserController)
    .delete("/unblock/:friendId", unblockUserController);

export default friendsRouter;
