import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';
import { query as dbQuery } from '../config/db.js';

export const login = async (req, res) => {
    const { username, password } = req.body;

    // For the time being , update it with db query
    if (username === 'admin' && password === 'password') {
        const token = jwt.sign({ username }, process.env.JWT_SECRET, { expiresIn: '1h' });
        return res.json({ token });
    }

    res.status(401).json({ message: 'Invalid credentials' });
};
