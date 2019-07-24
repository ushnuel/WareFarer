import express from 'express';
import tripController from '../controllers/tripController';
import { Validation } from '../middleware';

const router = express.Router();

router.post('/', Validation.tripValidator('create'), tripController.create);
router.get('/', tripController.getAll);
router.patch('/:tripId', tripController.cancel);
export default router;
