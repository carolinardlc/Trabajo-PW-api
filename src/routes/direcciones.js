import express from "express";
import direcconesController from "../controllers/direcciones.js";

const router = express.Router();

router.get("/:id", direcconesController.findOne);
router.put("/:id", direcconesController.update);

export default router;
