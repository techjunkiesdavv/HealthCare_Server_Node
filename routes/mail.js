import express from "express";
import { sendOtp } from "../controllers/mail.js";
const router =express.Router();

router.post('/mail',sendOtp);






export default router;