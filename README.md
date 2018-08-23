# Starter project graphql
**Live Demo**: https://starter-project-graphql.herokuapp.com/graphql

## About the project
Starter Project with [graphql](https://graphql.org/learn/), [express](http://expressjs.com/),  [Mongodb](https://www.mongodb.com/), and [jwt](https://jwt.io/).
Modular structure of graphql thanks to [merge-graphql-schemas](https://github.com/okgrow/merge-graphql-schemas)


## Getting Started

```bash
$ git clone git@github.com:drog/starter-project-graphql.git starter-project-graphql
$ cd starter-project-graphql

# Install NPM dependencies
$ npm install 

# Start the server in Development
$ npm run dev

```

## Project Structure
```
./src
├── config
│   └── config.js
├── data
│   ├── indexSchemas.js
│   └── user
│       ├── user.graphql
│       ├── userModel.js
│       └── userResolver.js
├── index.js
├── middlewares
│   └── auth.js
└── routes
    ├── auth.js
    ├── graphql.js
    └── index.js
```

## Create more entities
Create new folder in `src/data` with the name of the entitie and the next files:
- entityModel.js taht store the scheme from your favourite ORM
- entity.graphql with the definition of graphql
- entityResolver.js thaht contains the queries and mutations of the graphql definition


All the entities will be concatenated in `indexSchemas.js` and exposed in `routes/graphql.js`
```js
const typesArray = fileLoader(path.join(__dirname, '**/*.graphql'));

const resolversArray = fileLoader(path.join(__dirname, '**/*Resolver.js'));

let schema = makeExecutableSchema({
    typeDefs: mergeTypes(typesArray, { all: true }),
    resolvers: mergeResolvers(resolversArray)
});
```


## Enable jwt

To enable jwt modify `src/routes/graphql.js` and change the next line `app.use('/graphql', graphqlHTTP({` for `app.use('/graphql', verifyToken, graphqlHTTP({`.