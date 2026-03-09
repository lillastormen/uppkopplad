import { Router } from "express";
import { authenticateUser, createNewUser, getUser, getUserId, getUsers, getCurrentUser, loginUser, logoutUser } from "../controllers/userController.ts";

const router = Router();

router.get("/id/:id", getUserId);
router.get("/username/:username", getUser);
router.get("/all/", getUsers);
router.get("/auth", authenticateUser);
router.get("/current", getCurrentUser);

router.post("/registration", createNewUser);
router.post("/login", loginUser);
router.post("/logout", logoutUser);

export default router;
