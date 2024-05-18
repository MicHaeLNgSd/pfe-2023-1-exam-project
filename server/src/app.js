const express = require('express');
const app = express();
const cors = require('cors');
const rootRouter = require('./routers');
const handlerError = require('./handlerError/handler');

app.use(cors());
app.use(express.json());
app.use('/public', express.static('public'));
app.use(rootRouter);
app.use(handlerError);

module.exports = app;
