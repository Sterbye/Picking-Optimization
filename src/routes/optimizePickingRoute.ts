import express from "express";
import { optimizePicking } from "../controllers/optimizePickingController";

const router = express.Router();

router.post("/", optimizePicking);

module.exports = router;
