import { query as dbQuery } from '../config/db.js';

export const getTerms = async (req, res) => {
    try {
        const { rows } = await dbQuery('SELECT * FROM content WHERE key = $1', ['terms']);

        if (rows.length > 0) {
            res.json({
                en: rows[0].text_en,
                se: rows[0].text_se
            });
        } else {
            res.status(404).json({ message: 'Terms not found' });
        }
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server error' });
    }
};
