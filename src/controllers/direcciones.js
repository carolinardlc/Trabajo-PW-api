import { db } from "../../postgres-config.js";

function update(req, res) {
  const id = parseInt(req.params.id);
  const { linea1, linea2, distrito, provincia, pais } = req.body;

  db.query(
    "UPDATE direccion SET linea1 = $2, linea2 = $3, distrito = $4, provincia = $5, pais = $6  WHERE id = $1 RETURNING *;",
    [id, linea1, linea2, distrito, provincia, pais],
    (err, result) => {
      if (err) {
        res.status(500).json(err);
      }

      if (result.rows.length === 0) {
        return res.status(404).json({ error: "Direccion no encontrado" });
      }

      res.status(200).json(result.rows[0]);
    },
  );
}

function findOne(req, res) {
  const id = parseInt(req.params.id);

  db.query("SELECT * FROM direccion WHERE id = $1;", [id], (err, result) => {
    if (err) {
      return res.status(500).json(err);
    }

    if (result.rows.length === 0) {
      return res.status(404).json({ error: "Direccion no encontrado" });
    }

    res.status(200).json(result.rows[0]);
  });
}

export default {
  update,
  findOne,
};
