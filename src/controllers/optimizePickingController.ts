import { readFileSync } from "node:fs";
import { calculateDistance } from "../utils/calculateDistanceFormula";
import { Request, Response } from "express";

//Sample local DATA simulate data from Case-Study
export const data = JSON.parse(readFileSync("./src/data/data.json", "utf-8"));

//This function takes a productId and looks up the product's positions from the data.json file,
//returning the corresponding positions.
const getProductPositions = (productId: string) => {
  const position = data.filter((pos: any) => pos.productId === productId);
  return position;
};

// Optimized order picking algorithm
export const optimizePicking = async (
  req: Request,
  res: Response
): Promise<any> => {
  const { products, startingPosition } = req.body;

  //If the request body is missing the products or startingPosition fields,
  //a 400 Bad Request error is returned with the message.
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
