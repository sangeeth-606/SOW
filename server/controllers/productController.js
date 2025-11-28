import { query as dbQuery } from '../config/db.js';

export const getProducts = async (req, res) => {
    try {
        //  Fetch from DB
        // need to update it with db query
        res.json([
            { id: 1, name: 'Product 1', in_price: 100, price: 150, description: 'Test Product' },
            { id: 2, name: 'Product 2', in_price: 200, price: 250, description: 'Test Product 2' }
        ]);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server error' });
    }
};

export const updateProduct = async (req, res) => {
    const { id } = req.params;
    const { name, in_price, price, description } = req.body;
    try {
        // need to update it with db query
        res.json({ message: 'Product updated', product: { id, name, in_price, price, description } });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server error' });
    }
};
