import { readFileSync } from "node:fs";
import { calculateDistance } from "../utils/calculateDistanceFormula";
import { Request, Response } from "express";

/**
 * Loads and parses local JSON data from a file.
 * This constant reads the `data.json` file located in the `./src/data/` directory
 * and parses it into a JavaScript object. It is used to simulate data from a case study.
 * @constant {Object} data - The parsed JSON content from `data.json`.
 */
export const data = JSON.parse(readFileSync("./src/data/data.json", "utf-8"));

/**
 * Retrieves the positions of a product from the loaded dataset.
 * This function searches the parsed `data.json` file for entries that match the given `productId`
 * and returns an array of corresponding positions.
 * @param {string} productId - The unique identifier of the product.
 * @returns {Array} An array of position objects associated with the specified product.
 */
const getProductPositions = (productId: string) => {
  const position = data.filter((pos: any) => pos.productId === productId);
  return position;
};

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
export const optimizePicking = async (
  req: Request,
  res: Response
): Promise<any> => {
  const { products, startingPosition } = req.body;

  //Validate request body
  if (!products || !startingPosition) {
    return res.status(400).json({ error: "Invalid request payload" });
  }

  let positions: any[] = []; // Initialize an empty array to store product positions
  for (const product of products) {
    // Loop through each requested product
    const productPositions = getProductPositions(product); // Fetch positions for the current product
    if (productPositions.length > 0) {
      // If the product has valid positions
      positions.push(
        ...productPositions.map((pos: any) => ({
          // Add each position to the positions array
          ...pos, // Keep all original position properties (x, y, z, positionId)
          productId: product, // Attach the productId to the position object
        }))
      );
    }
  }

  //The positions are sorted based on the distance to the starting position.
  positions.sort(
    (a, b) =>
      calculateDistance(startingPosition, a) -
      calculateDistance(startingPosition, b)
  );
  let totalDistance = 0;
  let currentPosition = startingPosition;

  //The products are then picked in the order that minimizes the total distance traveled.
  const pickingOrder = positions.map((pos) => {
    totalDistance += calculateDistance(currentPosition, pos);
    currentPosition = pos;
    return { productId: pos.productId, positionId: pos.positionId };
  });

  res.json({ pickingOrder, distance: totalDistance });
};
