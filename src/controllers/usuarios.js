import { db } from "../../postgres-config.js";

function findAll(_, res) {
  db.query("SELECT * FROM usuario ORDER BY id ASC", (err, result) => {
    if (err) {
      res.status(500).json(err);
    }

    res.status(200).json(result.rows);
  });
}

function findOne(req, res) {
  const id = parseInt(req.params.id);

  db.query("SELECT * FROM usuario WHERE id = $1;", [id], (err, result) => {
    if (err) {
      return res.status(500).json(err);
    }

    if (result.rows.length === 0) {
      return res.status(404).json({ error: "Usuario no encontrado" });
    }

    res.status(200).json(result.rows[0]);
  });
}

function update(req, res) {
  const id = parseInt(req.params.id);
  const { usuario, password, rol } = req.body;
  const missing = [];

  if (!usuario) missing.push("usuario");
  if (!password) missing.push("password");
  if (!rol) missing.push("rol");

  if (missing.length !== 0) {
    res.status(400).json({
      message: `No se mandaron los siguientes campos: ${missing.join(", ")}`,
    });
  }

  db.query(
    "UPDATE usario SET usuario = $1, password = $2, rol = $3 WHERE id = $4;",
    [usuario, password, rol, id],
    (err, result) => {
      if (err) {
        res.status(500).json(err);
      }

      if (result.rows.length === 0) {
        return res.status(404).json({ error: "Usuario no encontrado" });
      }

      res.status(200).json(result.rows[0]);
    },
  );
}

async function create(req, res) {
  const { usuario, password, rol } = req.body;
  const client = await db.connect();
  try {
    await client.query("BEGIN");

    const direccionResult = await client.query(
      "INSERT INTO direccion DEFAULT VALUES RETURNING *",
    );

    const carritoResult = await client.query(
      "INSERT INTO carrito DEFAULT VALUES RETURNING *",
    );

    const direccionId = direccionResult.rows[0].id;
    const carritoId = carritoResult.rows[0].id;

    const usuarioResult = await client.query(
      "INSERT INTO usuario (carrito_id, direccion_id, usuario, password, rol) VALUES ($1, $2, $3, $4, $5) RETURNING *",
      [carritoId, direccionId, usuario, password, rol],
    );

    await client.query("COMMIT");
    res.status(200).json(usuarioResult.rows[0]);
  } catch (err) {
    await client.query("ROLLBACK");
    res.status(500).json({ message: "Error creating user", error: err });
  } finally {
    client.release();
  }
}

function remove(req, res) {
  const id = parseInt(req.params.id);

  db.query("DELETE FROM serie WHERE id = $1", [id], (err, result) => {
    if (err) {
      res.status(500).json(err);
    }

    res.status(200).json(result.rows);
  });
}

export default {
  findAll,
  findOne,
  update,
  create,
  remove,
};
