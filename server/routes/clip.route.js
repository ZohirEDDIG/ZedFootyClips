import { Router } from 'express';
import { getClips, updateClip, downloadClip } from '../controllers/clip.controller.js'

const router = Router();

router.get('/', getClips);
router.patch('/:clipId/update', updateClip);
router.get('/:clipId/download', downloadClip);

export default router; 