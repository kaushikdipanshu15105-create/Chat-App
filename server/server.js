import dns from "node:dns";
dns.setServers(["8.8.8.8", "1.1.1.1"]);

// This is your main server file.
import { app, server } from "./socket/socket.js";
import express from "express";
import { connectDB } from "./db/connection1.db.js";
import cookieParser from "cookie-parser";
import cors from "cors";
import dotenv from "dotenv";

dotenv.config();

// Routes
import userRoute from "./routes/user.route.js";
import messageRoute from "./routes/message.route.js";
// Middleware
import { errorMiddleware } from "./middlewares/error.middlware.js";

// Define a function to start the server
const startServer = async () => {
    try {
        await connectDB();
        
        console.log("Database connected successfully.");

        // Middleware setup
        app.use(
            cors({
                origin: [process.env.CLIENT_URL],
                credentials: true,
                allowedHeaders: ["Content-Type", "Authorization"],
                methods: ["GET", "POST", "PUT", "DELETE"],
            })
        );
        app.use(express.json());
        app.use(cookieParser(process.env.COOKIE_SECRET));

        const PORT = process.env.PORT || 5000;

        // CRITICAL FIX: Mount both routes on the correct API path.
        // All requests to /api/v1/user/... will be handled by userRoute
        // All requests to /api/v1/message/... will be handled by messageRoute
        app.use("/api/v1/user", userRoute);
        app.use("/api/v1/message", messageRoute);
        
        app.use(errorMiddleware);

        server.listen(PORT, () => {
            console.log(`Your server listening at port ${PORT}`);
        });

    } catch (error) {
        console.error("Error connecting to database:", error);
        process.exit(1);
    }
};

startServer();
