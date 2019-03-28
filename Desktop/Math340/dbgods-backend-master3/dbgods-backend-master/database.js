const pg = require('pg');
let pool;
const config = {
    user: 'dbgods@dbgods-azure',
    host: 'dbgods-azure.postgres.database.azure.com',
    database: 'postgres',
    password: 'cpsc304!',
    port: 5432
}

// Singleton
module.exports = {
    getPool: function () {
      if (pool) return pool;
      pool = new pg.Pool(config);
      return pool;
    }
}