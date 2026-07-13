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
    sendRequestController,
    unblockUserController,
} from "../controllers/friends.controller";
import { ProtectRoute } from "../middlewares/ProtectRoute.middleware";

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

    .get("/blocked", getBlockedUsersController)
    .post("/block/:friendId", blockUserController)
    .delete("/block/:friendId", unblockUserController);

export default friendsRouter;
