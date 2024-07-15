import express from "express";
import productosController from "../controllers/productos.js";

const router = express.Router();

router.get("/", productosController.findAll);
router.get("/:id", productosController.findOne);
router.post("/", productosController.create);
router.put("/", productosController.update);
router.delete("/:id", productosController.remove);

export default router;
