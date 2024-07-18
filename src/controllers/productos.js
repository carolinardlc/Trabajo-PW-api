import { db } from "../../postgres-config.js";

function findAll(_, res) {
  db.query("SELECT * FROM producto ORDER BY id ASC", (err, result) => {
    if (err) {
      return res.status(500).json(err);
    }

    res.status(200).json(result.rows);
  });
}

function findOne(req, res) {
  const id = parseInt(req.params.id);

  db.query("SELECT * FROM producto WHERE id = $1;", [id], (err, result) => {
    if (err) {
      return res.status(500).json(err);
    }

    if (result.rows.length === 0) {
      return res.status(404).json({ error: "Producto no encontrado" });
    }

    res.status(200).json(result.rows[0]);
  });
}

function update(req, res) {
  const id = parseInt(req.params.id);
  const { nombre, precio, marca, descripcion, stock, img, serie_id } = req.body;

  db.query(
    "UPDATE Producto SET nombre = $1, precio = $2, marca = $3, descripcion = $4, stock = $5, img = $6, serie_id = $7 WHERE id = $7 RETURNING *;",
    [nombre, precio, marca, descripcion, stock, img, serie_id, id],
    (err, result) => {
      if (err) {
        return res.status(500).json(err);
      }

      if (result.rows.length === 0) {
        return res.status(404).json({ error: "Producto no encontrado" });
      }

      res.status(200).json(result.rows[0]);
    },
  );
}

function create(req, res) {
  const { serie_id, nombre, precio, marca, descripcion, img } = req.body;

  db.query(
    "INSERT INTO producto (serie_id, nombre, precio, marca, descripcion, img) VALUES ($1, $2, $3, $4, $5, $6) RETURNING *;",
    [serie_id, nombre, precio, marca, descripcion, img],
    (err, result) => {
      if (err) {
        return res.status(500).json(err);
      }

      res.status(200).json(result.rows[0]);
    },
  );
}

function remove(req, res) {
  const id = parseInt(req.params.id);

  db.query(
    "DELETE FROM producto WHERE id = $1 RETURNING *;",
    [id],
    (err, result) => {
      if (err) {
        return res.status(500).json(err);
      }

      res.status(200).json(result.rows[0]);
    },
  );
}

export default {
  findAll,
  findOne,
  update,
  create,
  remove,
};
