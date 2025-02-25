import express from "express";
import { updateUser } from "../controllers/userClerk.controller.ts";

const router = express.Router();

router.put("/:userId", updateUser);

export default router;
