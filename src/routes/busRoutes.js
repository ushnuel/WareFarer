import express from 'express';
import busController from '../controllers/busController';

const router = express.Router();

router.post('/bus', busController.create);

export default router;
