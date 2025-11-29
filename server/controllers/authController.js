import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';
import { query as dbQuery } from '../config/db.js';

export const login = async (req, res) => {
    const { username, password } = req.body;

    try {
        const { rows } = await dbQuery('SELECT * FROM users WHERE username = $1', [username]);

        if (rows.length === 0) {
            return res.status(401).json({ message: 'Invalid Credentials' });
        }

        const user = rows[0];
        const isMatch = await bcrypt.compare(password, user.password_hash);

        if (!isMatch) {
            return res.status(401).json({ message: 'Invalid Credentials' });
        }

        const token = jwt.sign({ username: user.username, id: user.id }, process.env.JWT_SECRET, { expiresIn: '1h' });
        return res.json({ token });
    } catch (error) {
        console.error('Login error:', error);
        res.status(500).json({ message: 'Server error' });
    }
};
