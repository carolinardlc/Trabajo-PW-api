import { db } from "../../postgres-config.js";

function findAll(_, res) {
  db.query("SELECT * FROM serie ORDER BY id ASC", (err, result) => {
    if (err) {
      res.status(500).json(err);
    }

    res.status(200).json(result.rows);
  });
}

function findOne(req, res) {
  const id = parseInt(req.params.id);

  db.query("SELECT * FROM serie WHERE id = $1;", [id], (err, result) => {
    if (err) {
      return res.status(500).json(err);
    }

    if (result.rows.length === 0) {
      return res.status(404).json({ error: "Serie no encontrado" });
    }

    res.status(200).json(result.rows[0]);
  });
}

function update(req, res) {
  const id = parseInt(req.params.id);
  const { nombre } = req.body;

  if (!nombre) {
    res
      .status(400)
      .json({ message: "No se mandaron los siguientes campos: nombre" });
  }

  db.query(
    "UPDATE series SET nombre = $1 WHERE id = $1;",
    [nombre, id],
    (err, result) => {
      if (err) {
        res.status(500).json(err);
      }

      if (result.rows.length === 0) {
        return res.status(404).json({ error: "Serie no encontrado" });
      }

      res.status(200).json(result.rows[0]);
    },
  );
}

function create(req, res) {
  const { nombre } = req.body;

  if (!nombre) {
    res
      .status(400)
      .json({ message: "No se mandaron los siguientes campos: nombre" });
  }

  db.query(
    "INSERT INTO serie (nombre) VALUES ($1) RETURNING *;",
    [nombre],
    (err, result) => {
      if (err) {
        res.status(500).json(err);
      }

      res.status(200).json(result.rows[0]);
    },
  );
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
