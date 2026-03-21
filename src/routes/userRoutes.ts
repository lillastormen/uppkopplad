import { Router } from "express";
import { authenticateUser, createNewUser, getUser, getUserId, getUsers, getCurrentUser, loginUser, logoutUser, patchUser, deleteUser } from "../controllers/userController.ts";
import { requireAuthentication } from "../services/userService.ts";
import { getAccuracy } from "../controllers/chartController.ts";


const router = Router();

router.get("/id/:id", getUserId);
router.get("/username/:username", getUser);
router.get("/all/", getUsers);
router.get("/auth", authenticateUser);
router.get("/current", getCurrentUser);
router.get("/statistics/accuracy", requireAuthentication, getAccuracy)

router.post("/registration", createNewUser);
router.post("/login", loginUser);
router.post("/logout", logoutUser);

router.patch("/user", requireAuthentication, patchUser);

router.delete("/user", requireAuthentication, deleteUser);

export default router;
