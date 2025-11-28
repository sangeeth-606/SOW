import express from 'express';
const router = express.Router();
import { getTerms } from '../controllers/contentController.js';

router.get('/terms', getTerms);

export default router;
