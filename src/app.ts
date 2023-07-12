import express, {Express, Request, Response} from "express";
import apiRoutes from "./routes/apiRoutes";
import {errorHandler} from "./utils/errorHandler";
import rateLimit from "express-rate-limit";
import helmet from "helmet";

// Initialize the Express app
const app: Express = express();

//Basic security headers
app.use(helmet());

// Enable JSON body parsing for incoming requests
app.use(express.json());

const rateLimiter = rateLimit({
    windowMs: 60 * 1000, // 1 minute
    max: 100, // Limit each IP to 100 requests per 1 minute
    standardHeaders: true, // Return rate limit info in the `RateLimit-*` headers
})



// Order picking route
app.use("/api", rateLimiter, apiRoutes);

// Error handling middleware
app.use(errorHandler);

export default app;
