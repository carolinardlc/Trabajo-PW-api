import express from "express";
import seriesController from "../controllers/series.js";

const router = express.Router();

router.get("/", seriesController.findAll);
router.get("/:id", seriesController.findOne);
router.post("/", seriesController.create);
router.put("/", seriesController.update);
router.delete("/:id", seriesController.remove);

export default router;
