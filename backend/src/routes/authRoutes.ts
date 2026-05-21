import { Router } from 'express';
import { register, login } from '../controllers/authController';

const router = Router();

// Endpoints: /api/auth/register और /api/auth/login
router.post('/register', register);
router.post('/login', login);

export default router;