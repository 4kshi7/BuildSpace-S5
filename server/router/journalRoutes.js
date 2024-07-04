import express from "express";
import { authMiddleware } from "../middleware/authMiddleware.js";
import {
  createJournal,
  getJournals,
  getJournal,
  updateJournal,
  deleteJournal,
} from "../controllers/journalControllers.js";

const router = express.Router();

router.use(authMiddleware);

router.post("/", createJournal);
router.get("/bulk", getJournals);
router.get("/:id", getJournal);
router.put("/:id", updateJournal);
router.delete("/:id", deleteJournal);

export default router;