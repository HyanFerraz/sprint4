export default () => ({
  app: {
    port: process.env['CACHE_PORT'],
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
