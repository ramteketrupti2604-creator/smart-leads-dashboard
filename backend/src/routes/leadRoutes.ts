import { Router } from 'express';
import { getLeads, exportLeadsCSV } from '../controllers/leadController';
import { protect } from '../middlewares/authMiddleware';

const router = Router();

// Protect all routes with auth middleware
router.use(protect);

// 1. Route to fetch all leads (with filters/pagination)
router.get('/', getLeads);

// 2. Route to export leads to CSV (Must be above any dynamic /:id route)
router.get('/export/csv', exportLeadsCSV);

export default router;