import express from 'express';
const app = express();

app.use(require('./graphql'));
app.use(require('./auth'));

module.exports = app;