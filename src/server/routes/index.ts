import { Express } from 'express';
import authRoutes from './auth';
import usersRoutes from './users';
import formsRoutes from './forms';

export default (app: Express) => {
  app.use('/api/auth', authRoutes);
  app.use('/api/users', usersRoutes);
  app.use('/api/forms', formsRoutes);
};
