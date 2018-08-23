const path = require('path');
import { fileLoader, mergeTypes, mergeResolvers } from 'merge-graphql-schemas'
import { makeExecutableSchema } from "graphql-tools";


const typesArray = fileLoader(path.join(__dirname, '**/*.graphql'));

const resolversArray = fileLoader(path.join(__dirname, '**/*Resolver.js'));

let schema = makeExecutableSchema({
    typeDefs: mergeTypes(typesArray, { all: true }),
    resolvers: mergeResolvers(resolversArray)
});


export default schema;