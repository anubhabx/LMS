import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import bodyParser from "body-parser";
import helmet from "helmet";
import morgan from "morgan";

// Route imports
import courseRoutes from "./routes/course.route.ts";

// Configurations
dotenv.config();

const isProduction = process.env.NODE_ENV === "production";

if (!isProduction) {
  console.log("Development environment");
}

const app = express();
app.use(express.json());
app.use(helmet());
app.use(helmet.crossOriginResourcePolicy({ policy: "cross-origin" }));
app.use(morgan("common"));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cors());

// Routes
app.use("/api/courses", courseRoutes);

// Start server
const PORT = process.env.PORT || 5000;
if (!isProduction) {
  app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
  });
}
