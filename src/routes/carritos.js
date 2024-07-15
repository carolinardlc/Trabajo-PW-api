import express from "express";
import carritosController from "../controllers/carritos.js";

const router = express.Router();

router.get("/:id", carritosController.findOne);
router.post("/items", carritosController.addProductToCart);
router.put("/items/:productoId", carritosController.updateProductItem);
router.delete(
  "/:carritoId/items/:productoId",
  carritosController.removeProductFromCart,
);
router.delete("/:carritoId", carritosController.remove);

export default router;
