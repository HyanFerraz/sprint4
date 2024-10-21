export default () => ({
  app: {
    port: process.env['GATEWAY_PORT'],
  },
  jwt: {
    secret: process.env['JWT_SECRET'],
  },
});
