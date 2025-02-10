import { calculateDistance } from "../utils/calculateDistanceFormula";
import { Request, Response } from "express";
import axios from "axios";

const api_url = process.env.API_URL;
const api_key = process.env.API_KEY;

/**
 * Fetches product positions from an external API.
 *
 * This function makes a GET request to an external API to retrieve position data
 * for a given product. It includes an API key in the request headers for authentication.
 *
 * @async
 * @function getProductPositions
 * @param {string} productId - The ID of the product whose positions need to be fetched.
 * @returns {Promise<any[]>} - A promise resolving to an array of position objects.
 *                             If the request fails, an empty array is returned.
 *
 * @throws {Error} - Logs an error message if the API request fails.
 */
export const getProductPositions = async (
  productId: string
): Promise<any[]> => {
  try {
    const response = await axios.get(`${api_url}/${productId}/positions`, {
      headers: { "x-api-key": api_key },
    });
    return response.data;
  } catch (error) {
    console.error(`Error fetching positions from ${productId}: `, error);
    return []; //if fething fails then it return empty array.
  }
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
    const productPositions = await getProductPositions(product); // Fetch positions for the current product
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

  res.json({ distance: totalDistance, pickingOrder });
};
