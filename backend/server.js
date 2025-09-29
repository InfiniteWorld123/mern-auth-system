import express from 'express'
import cors from "cors";
import helmet from "helmet";
import { FRONTEND_URL, NODE_ENV, PORT } from './constants/env.js';
import connectToMongoDB from './config/db.js';
import { errorHandler } from "./middlewares/errorhandler.middleware.js";
import appLimiter from "./utils/AppLimiter.js";
import authRoutes from "./routes/auth.route.js"

const app = express();

app.use(express.json());
app.use(helmet());
app.use(cors({
    origin: NODE_ENV === "production" ? FRONTEND_URL : "http://localhost:5173",
    credentials: true,
}))
app.use("/api/v1/users", appLimiter, authRoutes);

app.get("/", (req, res) => {
    res.json({ message: "welcome to the mern auth system" });
});

const startServer = async () => {
    try {
        await connectToMongoDB();
        app.listen(PORT, () => {
            console.log(`Server running on port ${PORT}`);
        });
    } catch (err) {
        console.error("Startup failed:", err);
        process.exit(1);
    }
};

app.use(errorHandler);
startServer();