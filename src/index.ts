import 'dotenv/config';
import express from 'express';
import routes from './routes';

const app = express();
const port = process.env.PORT || 6969;

// Basic middleware
app.use(express.json());

// Routes
app.use('/', routes);

// Basic error handling
app.use((err: Error, req: express.Request, res: express.Response, next: express.NextFunction) => {
  console.error(err);
  res.status(500).send('Something broke!');
});

// Start server
if (process.env.NODE_ENV !== 'test') {
  app.listen(port, () => {
    console.log(`Server running on port ${port}`);
  });
}

export default app;
