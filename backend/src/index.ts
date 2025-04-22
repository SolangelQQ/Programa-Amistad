import 'reflect-metadata';
import 'tsconfig-paths/register'; // Añade esta línea al inicio
import express from 'express';
import cors from 'cors';
import { initializeDatabase } from '@shared/config/database';
import userRoutes from '@interfaces/http/user.routes';
import authRoutes from '@interfaces/http/auth.routes';
import { AppError } from '@shared/errors/AppError';
import roleRoutes from '@interfaces/http/role.routes';

const app = express();
const PORT = process.env.PORT || 8000;

// Middleware
app.use(cors());
app.use(express.json());

// Routes
app.use('/api/users', userRoutes);
app.use('/api/auth', authRoutes);
app.use('/api/roles', roleRoutes); 
app.get('/', (req, res) => {
  res.send('🚀 Best Buddies Backend is up and running!');
});
// Error handling
app.use((err: Error, req: express.Request, res: express.Response, next: express.NextFunction) => {
  if (err instanceof AppError) {
    return res.status(err.statusCode).json({ message: err.message });
  }
  console.error(err);
  res.status(500).json({ message: 'Internal server error' });
});

// Initialize database and start server
initializeDatabase()
  .then(() => {
    app.listen(PORT, () => {
      console.log(`Server running on port ${PORT}`);
    });
  })
  .catch(error => {
    console.error('Failed to initialize database:', error);
    process.exit(1);
  });