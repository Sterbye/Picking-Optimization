//This function calculates the straight-line distance between two points a and b in 3D space
//using the Euclidean distance formula
export const calculateDistance = (a: any, b: any): number => {
  return Math.sqrt(
    Math.pow(a.x - b.x, 2) + Math.pow(a.y - b.y, 2) + Math.pow(a.z - b.z, 2)
  );
};
