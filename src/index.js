const PORT = 8080;

import express from "express";
import bodyParser from "body-parser";
import cors from "cors";

import seriesRouter from "./routes/series.js";
import productosRouter from "./routes/productos.js";
import usuariosRouter from "./routes/usuarios.js";
import carritosRouter from "./routes/carritos.js";
import direccionesRouter from "./routes/direcciones.js";
import ordenesRouter from "./routes/ordenes.js";

const app = express();
app.use(cors());
app.use(bodyParser.json());

app.use("/series", seriesRouter);
app.use("/productos", productosRouter);
app.use("/usuarios", usuariosRouter);
app.use("/carritos", carritosRouter);
app.use("/direcciones", direccionesRouter);
app.use("/ordenes", ordenesRouter);

app.listen(PORT, () => {
  console.log(`Listening on port ${PORT}`);
});
