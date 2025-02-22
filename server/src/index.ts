import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import bodyParser from "body-parser";
import helmet from "helmet";
import morgan from "morgan";
import { connectToDatabase } from "./database/connect.database";
import {
  clerkMiddleware,
  createClerkClient,
  requireAuth,
} from "@clerk/express";

// Route imports
import courseRoutes from "./routes/course.route.ts";
import userClerkRoutes from "./routes/userClerk.route.ts";

// Configurations
dotenv.config();

const isProduction = process.env.NODE_ENV === "production";
const MONGODB_URI = process.env.MONGODB_URI;

if (!isProduction) {
  console.log("Development environment");
}

export const clerkClient = createClerkClient({
  secretKey: process.env.CLERK_SECRET_KEY!,
});

const app = express();
app.use(express.json());
app.use(helmet());
app.use(helmet.crossOriginResourcePolicy({ policy: "cross-origin" }));
app.use(morgan("common"));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cors());
app.use(clerkMiddleware());

// Routes
app.use("/api/courses", courseRoutes);
app.use("/api/users/clerk", requireAuth(), userClerkRoutes);

// Start server
const PORT = process.env.PORT || 5000;
if (!isProduction) {
  app.listen(PORT, () => {
    connectToDatabase(MONGODB_URI!);
    console.log(`Server running on port ${PORT}`);
  });
}
