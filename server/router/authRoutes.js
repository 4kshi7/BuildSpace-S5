import express from "express";
import { bulk, logout, signin, signup, update } from "../controllers/authController.js";
import { authMiddleware } from "../middleware/authMiddleware.js";
const router = express.Router();

router.post("/signup", signup);
router.post("/signin", signin);
router.post("/logout", logout);
router.put("/", authMiddleware, update);
router.get("/bulk", authMiddleware, bulk);

export default router;
