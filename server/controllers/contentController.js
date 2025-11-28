import { query as dbQuery } from '../config/db.js';

export const getTerms = async (req, res) => {
    try {
        // For the time being , update it with db query
        //  fetch from db
        res.json({
            en: "Terms and Conditions (English placeholder)",
            se: "Villkor (Swedish placeholder)"
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server error' });
    }
};
