console.log("GraphQL installation check. ");

const express = require('express');
const { graphqlHTTP } = require('express-graphql');
const graphqlTools = require('graphql-tools');
const oracledb = require("oracledb");
const { ApolloServer, gql } = require('apollo-server');

const app = express();

var port = process.env.PORT || 3000;

const { debug } = require('console');
const { title } = require('process');


// Schema Fields 
const typeDefs = `
type Query  {
   greeting: String
}`;

// Resolver to match the GraphQL query and return data
const  resolvers = {
   Query : {
      greeting: () => 'GraphQL initial setup check completed successfully.  You can now close the browser and JS application. '
   }
};
         
// Build the schema with Type Definitions and Resolvers
const schema = graphqlTools.makeExecutableSchema({typeDefs, resolvers});

  // Start the webserver
async function ws() {
    app.use('/graphql', graphqlHTTP({
      graphiql: true,
      schema
    }));
  
    app.listen(port, function() {
      console.log('Listening on http://localhost:' + port + '/graphql');
      console.log(" ");
      console.log("Use Graphiql to run a test Query ");      
      console.log("Use the following request  :    query   {greeting}      ");
      console.log("");
      console.log(" ");
      console.log("Once the test has been run in Graphiql, press CTRL C to exit the application and shutdown the test listener. ");
      console.log(" ");
    });
  }
 

  // run WS
  async function run() {
    //await startOracle();
    await ws();
  }


  // Run program
  run();
