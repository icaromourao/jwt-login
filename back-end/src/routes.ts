import express from 'express';
import AuthController from './controllers/AuthController';
import UserController from './controllers/UserController';
import AuthMiddleware from './middlewares/AuthMiddleware';
import SwaggerUi from 'swagger-ui-express';
import SwaggerDocument from './docs/swagger-specs.json';
import SwaggerOptions from './docs/swagger-options.json';

const router = express.Router();

router.get('/auth/login', AuthController.login);
router.get('/auth/token/refresh', AuthController.refreshToken);

router.get('/users/bytoken', AuthMiddleware.authenticate, UserController.getUserByToken);
router.get('/users/:userId', AuthMiddleware.authenticate, UserController.getUserById);

if (process.env.ENVIRONMENT === 'development') {
  router.use('/api-docs', SwaggerUi.serve);
  router.get('/api-docs', SwaggerUi.setup(SwaggerDocument, SwaggerOptions));
}

export default router;
