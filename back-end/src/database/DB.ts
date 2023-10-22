import pgpromise from 'pg-promise';

const connection = { connectionString: process.env.DATABASE_URL, max: 30, allowExitOnIdle: true };
const pgp = pgpromise({  });
const db = pgp(connection);

export default {
  async procExec(procName: string, params: Array<unknown>) {
    return await db.proc(procName, params);
  },
  async funcExec(funcName: string, params: Array<unknown>) {
    return await db.func(funcName, params);
  }
};
