import { Request, Response } from "express";
/**
 * Loads and parses local JSON data from a file.
 * This constant reads the `data.json` file located in the `./src/data/` directory
 * and parses it into a JavaScript object. It is used to simulate data from a case study.
 * @constant {Object} data - The parsed JSON content from `data.json`.
 */
export declare const data: any;
/**
 * Optimized order picking algorithm.
 *
 * This function processes a list of requested products and determines the optimal picking order
 * based on their positions relative to a given starting position. The goal is to minimize the total
 * distance traveled when picking up the products.
 *
 * @async
 * @param {Request} req - The Express request object containing:
 *   - `products` (Array<string>): List of product IDs to pick.
 *   - `startingPosition` (Object): Coordinates `{ x, y, z }` representing the starting point.
 * @param {Response} res - The Express response object used to return the optimized picking order.
 * @returns {Promise<Response>} A JSON response with:
 *   - `pickingOrder` (Array<{ productId: string, positionId: string }>): The optimal order of product collection.
 *   - `distance` (number): The total distance traveled to pick all products.
 *
 * @throws {400 Bad Request} If `products` or `startingPosition` are missing in the request body.
 */
export declare const optimizePicking: (req: Request, res: Response) => Promise<any>;
//# sourceMappingURL=optimizePickingController.d.ts.map