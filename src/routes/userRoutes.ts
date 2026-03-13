import { Router } from "express";
import { authenticateUser, createNewUser, getUser, getUserId, getUsers, getCurrentUser, loginUser, logoutUser, patchUser } from "../controllers/userController.ts";
import { requireAuthentication } from "../services/userService.ts";

const router = Router();

router.get("/id/:id", getUserId);
router.get("/username/:username", getUser);
router.get("/all/", getUsers);
router.get("/auth", authenticateUser);
router.get("/current", getCurrentUser);

router.post("/register", createNewUser);
router.post("/login", loginUser);
router.post("/logout", logoutUser);

router.patch("/user", requireAuthentication, patchUser);

export default router;
