import jwt, { JwtPayload } from 'jsonwebtoken';

export default {
  parseJwt(bearerToken: string): string {
    if (bearerToken.includes('Bearer ')) {
      return bearerToken.replace('Bearer ', '');
    }
    return bearerToken;
  },
  getUserIdByAccessToken(bearerToken: string): number {
    if (bearerToken) {
      const decodedToken = jwt.decode(bearerToken) as JwtPayload;
      return Number.parseInt(decodedToken.userId, 10);
    }

    return -1;
  }
};
