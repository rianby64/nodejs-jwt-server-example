
import express from 'express';
import { Request, Response, NextFunction } from 'express';

import cookieParser from 'cookie-parser';
import { expressjwt } from 'express-jwt';
import { handlerLogin, secretKey } from '@server/handlers/login/login';
import { handlerPrivateEndpoint } from '@server/handlers/private-endpoint/private-endpoint';
import { handlerHealth } from '@server/handlers/health/health';

function checkCSRF(req:Request, res:Response, next:NextFunction) {
  const csrfToken = req.cookies['xsrf-token'];
  const csrfHeader = req.header('x-xsrf-token');

  if (!csrfToken || !csrfHeader || csrfToken !== csrfHeader) {
    return res.status(403).json({ error: 'Invalid CSRF token' });
  }

  return next();
}

const createServer = (): express.Application => {
  const app = express();

  // Secret key for JWT

  const authenticate = expressjwt({
    secret: secretKey,
    algorithms: ['HS256'],
    getToken: function fromCookie(req) {
      // look for the token in cookies
      if (req.cookies && req.cookies.token) {
        return req.cookies.token;
      }
      // fallback to default behavior
      return null;
    }
  });

  app.use(cookieParser()); // Add this line

  // Middleware for checking CSRF token
  app.use(express.json());
  app.use(express.urlencoded({ extended: true }));

  app.disable('x-powered-by');

  app.post('/api/v1/health', handlerHealth);
  app.post('/api/v1/login', handlerLogin);
  app.post('/api/v1/private-endpoint', checkCSRF, authenticate, handlerPrivateEndpoint);

  return app;
};

export { createServer };
