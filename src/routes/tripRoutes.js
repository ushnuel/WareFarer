import express from 'express';
import tripController from '../controllers/tripController';

const router = express.Router();

router.post('/trips', tripController.create);
router.get('/trips', tripController.getAll);

export default router;
