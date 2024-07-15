import express from "express";
import usuariosController from "../controllers/usuarios.js";

const router = express.Router();

router.get("/", usuariosController.findAll);
router.get("/:id", usuariosController.findOne);
router.post("/", usuariosController.create);
router.put("/", usuariosController.update);
router.delete("/:id", usuariosController.remove);

export default router;
