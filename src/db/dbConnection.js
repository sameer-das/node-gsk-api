const sql = require('mssql');
const process = require('process');
const { options } = require('../routes/icard.route');
// Server=181.214.10.5;User Id=sa;Password=Xhok32AA34;Database=gesiltech_digital
config = {
    user: 'sa',
    password: 'Xhok32AA34',
    server: '181.214.10.5',
    database: 'gesiltech_digital',
    pool: {
        max: 10,
        min: 0,
        idleTimeoutMillis: 30000
    },
    options: {
        trustServerCertificate: true,
    }
}

const createGlobalDatabasePool = async (app) => {
    try {
        const appPool = new sql.ConnectionPool(config);
        const pool = await appPool.connect();
        console.log('DB Connection successful');
        app.locals.db = pool;
    } catch(err) {
        console.log(err);
        process.exit();
    }
} 


module.exports = {
    createGlobalDatabasePool
}