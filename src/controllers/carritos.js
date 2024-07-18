import { db } from "../../postgres-config.js";

async function findOne(req, res) {
  const id = parseInt(req.params.id);

  try {
    const carritoResult = await db.query(
      "SELECT * FROM carrito WHERE id = $1",
      [id],
    );

    if (carritoResult.rows.length === 0) {
      return res.status(404).json({ message: "Cart not found" });
    }

    const carritoId = carritoResult.rows[0].id;

    const carritoItemsResult = await db.query(
      `SELECT ci.*, p.*
       FROM carrito_items ci
       JOIN producto p ON ci.producto_id = p.id
       WHERE ci.carrito_id = $1`,
      [carritoId],
    );

    res.json({ ...carritoResult.rows[0], items: carritoItemsResult.rows });
  } catch (err) {
    res.status(500).json({ error: "Error retrieving cart", err });
  }
}

async function addProductToCart(req, res) {
  const { carrito_id, producto_id, cantidad, estado } = req.body;
  try {
    await db.query(
      "INSERT INTO carrito_items (carrito_id, producto_id, cantidad, estado) VALUES ($1, $2, $3, $4)",
      [carrito_id, producto_id, cantidad, estado],
    );
    res.status(201).json({ message: "Product added to cart" });
  } catch (err) {
    res.status(500).json({ error: "Error adding product to cart" });
  }
}

async function updateProductItem(req, res) {
  const { productoId } = req.params;
  const { cantidad, estado } = req.body;

  try {
    const result = await db.query(
      `UPDATE carrito_items
         SET cantidad = $2, estado = $3
         WHERE producto_id = $1`,
      [productoId, cantidad, estado],
    );
    if (result.rowCount === 0) {
      return res.status(404).json({ message: "Product not found in in-cart items" });
    } else {
      const updatedItemResult = await db.query(
        `SELECT ci.*, p.*
         FROM carrito_items ci
         JOIN producto p ON ci.producto_id = p.id
         WHERE ci.producto_id = $1`,
        [productoId],
      );

      if (updatedItemResult.rows.length === 0) {
        return res.status(404).json({ message: "Updated product item not found" });
      }

      res.status(200).json(updatedItemResult.rows[0]);
    }
  } catch (err) {
    res.status(500).json({ error: "Error updating product item", err });
  }
}


async function removeProductFromCart(req, res) {
  const { carritoId, productoId } = req.params;
  try {
    const result = await db.query(
      "DELETE FROM carrito_items WHERE carrito_id = $1 AND producto_id = $2",
      [carritoId, productoId],
    );
    if (result.rowCount === 0) {
      res.status(404).json({ message: "Product not found in cart" });
    } else {
      res.json({ message: "Product removed from cart" });
    }
  } catch (err) {
    res.status(500).json({ error: "Error removing product from cart" });
  }
}

async function remove(req, res) {
  const { carritoId } = req.params;
  const client = await db.connect();
  try {
    await client.query("BEGIN");
    await client.query("DELETE FROM cart_items WHERE carrito_id = $1", [
      carritoId,
    ]);
    await client.query("DELETE FROM carts WHERE carrito_id = $1", [carritoId]);
    await client.query("COMMIT");
    res.json({ message: "Cart deleted" });
  } catch (err) {
    await client.query("ROLLBACK");
    res.status(500).json({ error: "Error deleting cart" });
  } finally {
    client.release();
  }
}

export default {
  findOne,
  addProductToCart,
  updateProductItem,
  removeProductFromCart,
  remove,
};
