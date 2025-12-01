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

export const getLoginContent = async (req, res) => {
    try {
        const keys = [
            'nav_home', 'nav_order', 'nav_customers', 'nav_about', 'nav_contact',
            'login_title', 'email_label', 'email_placeholder', 'password_label',
            'password_placeholder', 'login_button', 'signup_link', 'forgot_password_link',
            'footer_copyright', 'footer_123invoice'
        ];

        const { rows } = await dbQuery('SELECT * FROM content WHERE key = ANY($1)', [keys]);

        const content = {};
        rows.forEach(row => {
            content[row.key] = {
                en: row.text_en,
                se: row.text_se
            };
        });

        res.json(content);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server error' });
    }
};
