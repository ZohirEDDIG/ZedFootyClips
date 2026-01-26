import { Router } from 'express';
import { addEmail } from '../controllers/email.controller.js';

const router = Router();

router.post('/add', addEmail);

export default router;