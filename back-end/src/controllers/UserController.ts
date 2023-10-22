import express from 'express';
import { PrismaClient } from '@prisma/client';
import { logger } from '../logger';
import MyError from '../errors/Error';
import AuthHelper from '../helpers/AuthHelper';

const prisma = new PrismaClient();

export default {
  async getUserById(req: express.Request, res: express.Response) {
    try {
      const userId: number = Number.parseInt(req.params.userId, 10);
      const user = await prisma.users.findUnique({
        where: { user_id: userId  },
        select: {
          user_id: true,
          username: true,
          email: true,
          name: true,
          display_name: true,
        }
      });

      if (user) {
        res.json({
          userId: user.user_id,
          username: user.username,
          email: user.email,
          name: user.name,
          diplayName: user.display_name
        });
      } else {
        logger.info('User not found');
        res.status(404).send({ message: 'User not found'});
      }
    } catch (error) {
      MyError.reportError({message: MyError.getErrorMessage(error)});
      res.status(500).end();
    }
  },
  async getUserByToken(req: express.Request, res: express.Response) {
    try {
      const authorization = req.headers.authorization as string;
      const jwtToken = AuthHelper.parseJwt(authorization);
      const userId: number = AuthHelper.getUserIdByAccessToken(jwtToken);
      const user = await prisma.users.findUnique({
        where: { user_id: userId  },
        select: {
          user_id: true,
          username: true,
          email: true,
          name: true,
          display_name: true,
        }
      });

      if (user) {
        res.json({
          userId: user.user_id,
          username: user.username,
          email: user.email,
          name: user.name,
          diplayName: user.display_name
        });
      } else {
        logger.info('User not found');
        res.status(404).send({ message: 'User not found'});
      }
    } catch (error) {
      MyError.reportError({message: MyError.getErrorMessage(error)});
      res.status(500).end();
    }
  }
};
