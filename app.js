const express = require('express');
const cors = require('cors');
const path = require('path');



const icardRoute = require('./src/routes/icard.route');
const errorHandler = require('./src/middlewares/error-handler');

const app = express();
const PREFIX = '/api/v1';


// ------ COMMON MIDDLEWARES ------
app.use(cors());
app.use(express.json());

app.get("/health", (req, res) => {
    res.json({ ok: true });
  });

// send static files from src/public folder  
// app.use(express.static(path.join(__dirname, 'public'), { redirect: false }));


app.use(PREFIX + '/icard', icardRoute);

app.use(errorHandler);

// anything else should be routed to angular
// app.get('*', (req, res) => {
//     res.sendFile(path.join(__dirname, '/public/index.html'));
// })

module.exports = app; 