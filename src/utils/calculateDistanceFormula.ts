/**
 * Calculates the straight-line (Euclidean) distance between two points in 3D space.
 *
 * This function uses the Euclidean distance formula:
 * `distance = sqrt((x2 - x1)² + (y2 - y1)² + (z2 - z1)²)`
 *
 * @param {Object} a - The first point, with `x`, `y`, and `z` coordinates.
 * @param {Object} b - The second point, with `x`, `y`, and `z` coordinates.
 * @returns {number} The Euclidean distance between point `a` and point `b`.
 */
export const calculateDistance = (a: any, b: any): number => {
  return Math.sqrt(
    Math.pow(a.x - b.x, 2) + Math.pow(a.y - b.y, 2) + Math.pow(a.z - b.z, 2)
  );
};
