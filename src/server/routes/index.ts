import { Express } from 'express';
import authRoutes from './auth.routes';
import usersRoutes from './users.routes';
import formsRoutes from './forms.routes';

export default (app: Express) => {
  app.use('/api/auth', authRoutes);
  app.use('/api/users', usersRoutes);
  app.use('/api/forms', formsRoutes);
};
