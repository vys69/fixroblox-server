import { Router } from 'express';
import userRoutes from './users';
import groupRoutes from './groups';
import catalogRoutes from './catalog';
import bundleRoutes from './bundles';
import gameRoutes from './games';

const router = Router();

// Health check
router.get('/ping', (req, res) => {
  res.send('pong');
});

// API routes
router.use('/users', userRoutes);
router.use('/groups', groupRoutes);
router.use('/catalog', catalogRoutes);
router.use('/bundles', bundleRoutes);
router.use('/games', gameRoutes);

export default router;