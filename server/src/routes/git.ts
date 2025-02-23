import express from 'express';
import { getCommitsPerDay, getConfig } from '../controllers/git';

const router = express.Router();

router.get('/config', getConfig);
router.get('/daily', getCommitsPerDay);

export default router;
