export default () => ({
  mongo: {
    uri: process.env['MONGO_URI'],
    db_name: process.env['MONGO_DB_NAME'],
  },
  app: {
    port: process.env['USER_PORT'],
  },
  redis: {
    connection: {
      host: process.env['REDIS_HOST'],
      port: process.env['REDIS_PORT'],
      password: process.env['REDIS_PASS'],
    },
  },
});

export interface RedisConnectionOptions {
  host: string;
  port: number;
  password?: string;
}
