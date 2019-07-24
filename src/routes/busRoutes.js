import express from 'express';
import busController from '../controllers/busController';
import { Validation } from '../middleware';

const router = express.Router();

router.post('/', Validation.busValidator('create'), busController.create);

export default router;
