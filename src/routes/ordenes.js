import express from "express";
import ordenesController from "../controllers/ordenes.js";

const router = express.Router();

router.get("/", ordenesController.findAll);
router.post("/", ordenesController.create);

export default router;
