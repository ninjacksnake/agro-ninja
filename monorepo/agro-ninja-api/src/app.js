const express = require('express');
const app = express();
const cors = require('cors');
const port = 3004;
const router = require('./routers/appRouter.js');
const bodyParser = require('body-parser');

require('dotenv').config();
app.use(bodyParser.json({limit: '10mb'}));
app.use(cors());
app.use(router);

const server = require('http').createServer(app);

server.listen(port, () => console.log('Server listening port', port)); 