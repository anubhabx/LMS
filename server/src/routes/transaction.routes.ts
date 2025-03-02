import express from "express";
import {
  createStripePaymentIntent,
  createTransaction,
} from "../controllers/transaction.controller.ts";

const router = express.Router();

router.post("/", createTransaction);
router.post("/stripe/payment-intent", createStripePaymentIntent);

export default router;
