import { PrismaClient } from '@prisma/client';
import express from 'express';
import jwt from 'jsonwebtoken';
import fs from 'fs';
import path from 'path';
import randtoken from 'rand-token';
import { Token } from '../interfaces/TokenInterface';
import DB from '../database/DB';
import MyError from '../errors/Error';
import { logger } from '../logger';
import moment from 'moment';

const prisma = new PrismaClient();
const jwtPrivateKey = fs.readFileSync(path.resolve('keys/private.pem'));

export default {
  login(req: express.Request, res: express.Response) {
    const username: string = req.query.username as string;
    const password: string = req.query.password as string;
    let refreshTokenValidity = Number(req.query.refreshTokenValidity);

    if (refreshTokenValidity !== 1 && refreshTokenValidity !== 7) {
      refreshTokenValidity = 1;
    }

    prisma.users.findUnique({
      select: { user_id: true, username: true, password: true },
      where: { username }
    }).then(async (user) => {
      if (!user) {
        const message = 'Invalid username or password';
        logger.info(message);
        return res.status(400).send({ message });
      }

      const verifyPasswordResult = await DB.funcExec('verify_password', [password, username]);
      const password_matched = verifyPasswordResult[0].verify_password;

      if (password_matched) {
        const expiresIn = 60 * 60;
        const token = jwt.sign(
          { userId: user.user_id }, jwtPrivateKey, { expiresIn, algorithm: 'ES256' }
        );
        const refreshToken = randtoken.generate(256);

        await prisma.tokens.createMany({
          data: [
            { token, type: 'Access Token', user_id: user.user_id },
            { token: refreshToken, type: 'Refresh Token',
              user_id: user.user_id, expires_in: refreshTokenValidity }
          ],
        });

        await prisma.users.update({
          data: { last_login: new Date(), updated_at: new Date() },
          where: { username: user.username }
        });

        const message = 'User authenticaded';
        logger.info(message);
        return res.json(
          { message , accessToken: token, expiresIn, refreshToken, userId: user.user_id }
        );
      } else {
        const message = 'Invalid username or password';
        logger.info(message);
        return res.status(400).send({ message });
      }
    }).catch((error) => {
      MyError.reportError({message: MyError.getErrorMessage(error)});
      res.status(500).end();
    });
  },

  async refreshToken(req: express.Request, res: express.Response) {
    try {
      const userId: number = Number.parseInt(req.query.userId as string, 10);
      const refreshToken: string = req.query.refreshToken as string;
      const token: Token | null = await prisma.tokens.findUnique({ where: { token: refreshToken }});

      if (token) {
        const today = moment();
        const isTokenExpired = moment(token.issued_at).add(token.expires_in, 'd').isBefore(today);

        if (token.is_valid && token.user_id === userId && !isTokenExpired) {
          const expiresIn = 60 * 60;
          const token = jwt.sign({ userId }, jwtPrivateKey, { expiresIn, algorithm: 'ES256' });

          await prisma.tokens.create({ data: { token, type: 'Access Token', user_id: userId }});

          res.json({ accessToken: token, expiresIn });
        } else {
          const message = 'Unauthorized';
          logger.info(message);
          res.status(401).send({ message });
        }
      }
    } catch (error) {
      MyError.reportError({message: MyError.getErrorMessage(error)});
      res.status(500).end();
    }
  },
};
