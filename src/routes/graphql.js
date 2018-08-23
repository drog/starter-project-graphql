import express from 'express';
import graphqlHTTP from 'express-graphql';
import schema from '../data/indexSchemas';
import { verifyToken } from '../middlewares/auth';

const app = express();

//to enable jwt  ===>>>   app.use('/graphql', verifyToken, graphqlHTTP({
app.use('/graphql', graphqlHTTP({
    schema,
    graphiql: (process.env.NODE_ENV === 'development')
}));

module.exports = app;