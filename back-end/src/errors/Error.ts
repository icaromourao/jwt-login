import { logger } from '../logger';

export default {
  getErrorMessage(error: unknown) {
    if (error instanceof Error) return error.message;
    return String(error);
  },
  reportError({ message }: { message: string }) {
    logger.error(message);
  }
};
