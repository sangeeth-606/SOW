import { query as dbQuery } from '../config/db.js';

export const getProducts = async (req, res) => {
    try {
        const { rows } = await dbQuery('SELECT * FROM products ORDER BY id ASC');
        res.json(rows);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server error' });
    }
};

export const updateProduct = async (req, res) => {
    const { id } = req.params;
    const { name, in_price, price, description } = req.body;
    try {
        const { rows } = await dbQuery(
            'UPDATE products SET name = $1, in_price = $2, price = $3, description = $4 WHERE id = $5 RETURNING *',
            [name, in_price, price, description, id]
        );

        if (rows.length === 0) {
            return res.status(404).json({ message: 'Product not found' });
        }

        res.json({ message: 'Product updated', product: rows[0] });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server error' });
    }
};
