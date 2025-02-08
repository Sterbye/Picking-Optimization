import express from "express";
import { optimizePicking } from "../controllers/optimizePickingController";

/**
 * Router for handling optimized order picking requests.
 *
 * This route accepts POST requests to optimize the picking order of products based on their positions
 * and a given starting point. It delegates the logic to the `optimizePicking` controller.
 * The response will contain the optimal picking order and the total distance traveled.
 *
 * @route POST /optimize-picking
 * @param {Object} req - The Express request object, which should include the following body:
 *   - `products` (Array<string>): A list of product IDs to pick.
 *   - `startingPosition` (Object): The starting position in 3D space, with `x`, `y`, and `z` coordinates.
 * @param {Object} res - The Express response object that will return the optimized picking order.
 * @returns {Object} A JSON response with:
 *   - `pickingOrder` (Array<{ productId: string, positionId: string }>): The optimal order of product collection.
 *   - `distance` (number): The total distance traveled to pick all products.
 *
 * @throws {400 Bad Request} If `products` or `startingPosition` are missing in the request body.
 */
const router = express.Router();

// Define the route that will handle POST requests to optimize picking
router.post("/", optimizePicking);

export default router;
