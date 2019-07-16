import express from 'express';
import tripController from '../controllers/tripController';
import jwtGenerator from '../middleware/jwtGenerator';

const router = express.Router();

router.post('', jwtGenerator.authorizeAdmin, tripController.create);
router.get('', tripController.getAll);
router.patch(
  '/:tripId',
  jwtGenerator.authorize,
  jwtGenerator.authorizeAdmin,
  tripController.cancel,
);
export default router;
