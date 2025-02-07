import express, { Application, Request, Response } from "express";
import helmet from "helmet";
import cors from "cors";
import { data } from "./controllers/optimizePickingController";
const optimizePicking = require("./routes/optimizePickingRoute");

const app: Application = express();

//Middleware
app.use(express.json()); //Middleware to parse incoming JSON requests.
app.use(cors()); //Allows cross-origin requests.
app.use(helmet()); //Sets security-related HTTP headers to protect the app.

//Route
app.get("/api/products", (req: Request, res: Response) => {
  res.json(data);
});
app.use("/api/optimize-picking", optimizePicking);

//Default endpoint
app.get("/", (req, res) => {
  res.json(
    `Server starter endpoint, if you want to optimize picking, please visit http://localhost:3000/api/optimize-picking`
  );
});

//Server listen
app.listen(3000, () => {
  console.log(`Server is running on http://localhost:3000`);
});
