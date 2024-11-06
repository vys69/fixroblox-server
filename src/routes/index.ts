import { Router } from 'express';
import userRoutes from './users';
import groupRoutes from './groups';
import catalogRoutes from './catalog';
import bundleRoutes from './bundles';
import gameRoutes from './games';
// import oembedRoutes from './oembed';

const router = Router();

// Health check
router.get('/ping', (req, res) => {
  res.send('pong');
});

router.get('/', (req, res) => {
  res.send('Hello World');
});

// API routes
router.use('/users', userRoutes);
router.use('/groups', groupRoutes);
router.use('/catalog', catalogRoutes);
router.use('/bundles', bundleRoutes);
router.use('/games', gameRoutes);
// router.use('/oembed', oembedRoutes);

export default router;