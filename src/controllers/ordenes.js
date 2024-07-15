import { db } from "../../postgres-config.js";

function findAll(_, res) {
  db.query("SELECT * FROM orden ORDER BY id ASC", (err, result) => {
    if (err) {
      res.status(500).json(err);
    }

    res.status(200).json(result.rows);
  });
}

function create(req, res) {
  const { usuario_id, tipo_envio, subtotal, impuestos, total } = req.body;

  db.query(
    "INSERT INTO orden (usuario_id, tipo_envio, subtotal, impuestos, total) VALUES ($1, $2, $3, $4, $5) RETURNING *;",
    [usuario_id, tipo_envio, subtotal, impuestos, total],
    (err, result) => {
      if (err) {
        res.status(500).json(err);
      }

      if (result.rows.length === 0) {
      }

      res.status(200).json(result.rows[0]);
    },
  );
}

export default {
  create,
  findAll,
};
