import { query as dbQuery } from "../config/db.js";

export const getProducts = async (req, res) => {
  try {
    const { rows } = await dbQuery(
      "SELECT id, article_no, name, in_price, price, unit, in_stock, description FROM products ORDER BY id ASC",
    );
    res.json(rows);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
};

export const updateProduct = async (req, res) => {
  const { id } = req.params;
  const { article_no, name, in_price, price, unit, in_stock, description } =
    req.body;
  try {
    const { rows } = await dbQuery(
      `UPDATE products
             SET article_no = $1, name = $2, in_price = $3, price = $4, unit = $5, in_stock = $6, description = $7
             WHERE id = $8
             RETURNING *`,
      [article_no, name, in_price, price, unit, in_stock, description, id],
    );

    if (rows.length === 0) {
      return res.status(404).json({ message: "Product not found" });
    }

    res.json({ message: "Product updated", product: rows[0] });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
};
