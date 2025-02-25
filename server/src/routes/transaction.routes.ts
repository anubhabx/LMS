import express from "express";
import { createStripePaymentIntent } from "../controllers/transaction.controller.ts";

const router = express.Router();

router.post("/stripe/payment-intent", createStripePaymentIntent);

export default router;
