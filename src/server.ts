/**
 * Main Express application for handling product data and optimized order picking.
 *
 * This app sets up the necessary middleware, routes, and server configurations for the application.
 * It allows clients to request product data, optimize the picking order, and access a default server endpoint.
 */
import express, { Application } from "express";
import helmet from "helmet";
import cors from "cors";
import optimizePicking from "./routes/optimizePickingRoute";

const app: Application = express();

//Middleware
/**
 * Middleware setup:
 * - Parses incoming JSON requests using `express.json()`
 * - Allows cross-origin requests using `cors()`
 * - Enhances security by setting HTTP headers with `helmet()`
 */
app.use(express.json()); //Middleware to parse incoming JSON requests.
app.use(cors()); //Allows cross-origin requests.
app.use(helmet()); //Sets security-related HTTP headers to protect the app.

/**
 * Route to handle optimized picking logic.
 *
 * The route is accessible at `/api/optimize-picking` and delegates the logic to the
 * `optimizePicking` route handler.
 *
 * @route POST /api/optimize-picking
 * @param {Object} req - The Express request object, containing `products` and `startingPosition`.
 * @param {Object} res - The Express response object, returning the optimized picking order and total distance.
 * @returns {Object} A JSON object containing:
 *   - `pickingOrder` (Array<{ productId: string, positionId: string }>): The optimal order for picking products.
 *   - `distance` (number): The total distance traveled to pick all products.
 */
app.use("/api/optimize-picking", optimizePicking);

/**
 * Default route to confirm the server is running and provide instructions for using the API.
 *
 * Accessible at `/` and responds with a message explaining how to access the optimize-picking route.
 *
 * @route GET /
 * @returns {string} A message with instructions on how to use the API.
 */
app.get("/", (req, res) => {
  res.json(
    `Server starter endpoint, if you want to optimize picking, please visit http://localhost:3000/api/optimize-picking`
  );
});

/**
 * Starts the server on port 3000.
 *
 * This function listens for incoming requests and logs the server URL in the console.
 *
 * @function
 * @listens 3000
 */
app.listen(3000, () => {
  console.log(`Server is running on http://localhost:3000`);
});
