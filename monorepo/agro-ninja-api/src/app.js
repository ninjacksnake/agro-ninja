const express = require('express');
const app = express();
const cors = require('cors');
const port = 3004;
const router = require('./routers/appRouter.js');

require('dotenv').config();
app.use(express.json());
app.use(cors());
app.use(router);

const server = require('http').createServer(app);

server.listen(port, () => console.log('Server listening port', port)); 