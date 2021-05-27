import 'dotenv/config';
export const appConfigs = {
    port: parseInt(process.env[`SERVICE_PORT`]) || 4000,
    database: {
        type: process.env[`DB_TYPE`] || 'mongo',
        host: process.env[`DB_HOST`],
        port: parseInt(process.env[`DB_PORT`]) || 27017,
        username: process.env[`DB_USER`] || 'postgres',
        password: process.env[`DB_PASS`] || 'devpgsql',
        dbName: process.env[`DB_DBNAME`] || 'chat_bot_builder',
    },
    loggingMode: process.env[`LOGGING_MODE`] || 'error',
    sync: process.env[`DB_SYNC`] == 'true' ? true : false,
  }
  
  export default appConfigs;
  