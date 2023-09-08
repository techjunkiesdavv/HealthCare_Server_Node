import express from "express";
import { addHealth } from "../controllers/health.js";
const router =express.Router();

router.post('/health',addHealth);






export default router;