export default () => ({
  mongo: {
    uri: process.env['MONGO_URI'],
    db_name: process.env['MONGO_DB_NAME']
  },
});