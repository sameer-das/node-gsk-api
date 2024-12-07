const http = require('http');
const https = require('https');
const path = require('path');
const fs = require('fs');

const app = require('./app');
const { createGlobalDatabasePool } = require('./src/db/dbConnection');

const PORT = 4000;

// *************** For HTTP ***************
// const server = http.createServer(app);

// server.listen(PORT, () => {
//     console.log('Server started on ' + PORT);
// })


// *************** For HTTPS ***************
const options = {
    key: fs.readFileSync(path.join(__dirname, 'cert', 'gsk.esebakendra.in_key.txt')),
    cert: fs.readFileSync(path.join(__dirname, 'cert', 'gsk_esebakendra_in.crt')),
};

const server = https.createServer(options, app);

 
// *************** Connect to DB and Listen on Port ***************
createGlobalDatabasePool(app)
    .then(() => {
        server.listen(PORT, () => {
            console.log('HTTPS Server started on port : ' + PORT);
        })
    }).catch((err) => {
        console.log(err)
    })
