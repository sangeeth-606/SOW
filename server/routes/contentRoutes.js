import express from 'express';
const router = express.Router();
import { getTerms, getLoginContent } from '../controllers/contentController.js';

router.get('/terms', getTerms);
router.get('/login', getLoginContent);

export default router;
