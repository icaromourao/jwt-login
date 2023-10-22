import express from 'express';
import jwt, { TokenExpiredError, JsonWebTokenError, JwtPayload } from 'jsonwebtoken';
import { PrismaClient } from '@prisma/client';
import fs from 'fs';
import path from 'path';
import AuthHelper from '../helpers/AuthHelper';
import MyError from '../errors/Error';
import { logger } from '../logger';

const prisma = new PrismaClient();
const jwtPublicKey = fs.readFileSync(path.resolve('keys/public.pem'));

export default {
  async authenticate(req: express.Request, res: express.Response, next: express.NextFunction) {
    try {
      const authorization = req.headers.authorization;

      if (authorization) {
        const jwtToken = AuthHelper.parseJwt(authorization);
        const decodedToken = jwt.verify(
          jwtToken, jwtPublicKey, { algorithms: ['ES256'] }
        ) as JwtPayload;
        const storedToken = await prisma.tokens.findUnique({ where: { token: jwtToken } });

        if (!storedToken || !storedToken.is_valid) {
          res.status(401).send({ message: 'Unauthorized' });
        }

        prisma.users.findUnique({ where: { user_id: decodedToken.userId } })
          .then((user) => {
            if (user) {
              next();
            } else {
              res.status(403).send({ message: 'Forbidden' });
            }
          }).catch((error) => {
            MyError.reportError({ message: MyError.getErrorMessage(error) });
            res.status(500).send({ message: 'Server error' });
          });
      } else {
        const message = 'Unauthorized';
        logger.info(message);
        res.status(401).send({ message });
      }
    } catch (error) {
      if (error instanceof TokenExpiredError) {
        const message = 'Jwt expired';
        logger.info(message);
        res.status(401).send({ message });
      } else if (error instanceof TypeError || error instanceof JsonWebTokenError) {
        const message = 'Invalid token';
        logger.info(message);
        res.status(400).send({ message: 'Invalid token' });
      } else {
        MyError.reportError({ message: MyError.getErrorMessage(error) });
        res.status(500).send({ message: 'Server error' });
      }
    }
  }
};
