

console.log("General GraphQL Oracle installation check. ");

console.log("GraphQL installation check. ");

const express = require('express');
const { graphqlHTTP } = require('express-graphql');
const graphqlTools = require('graphql-tools');
const oracledb = require("oracledb");
const { ApolloServer, gql } = require('apollo-server');

var dbConfig = require('./config/oradbconfig.js');


oracledb.initOracleClient({ libDir: 'C:\\oracle\\instanctclient\\instantclient_19_12' });

const app = express();

var port = process.env.PORT || 3000;
const { debug } = require('console');
const { title } = require('process');


 


// Schema Fields used for API calls
const typeDefs = `
type dbMessage {
status       : String                   
}
 
type Query {
  dbMessage : [dbMessage] 
}

`;


async function dbTest() {
 let sql = 'SELECT  xxgql_sys_util_pkg.callbackMsg()  FROM DUAL ';



console.log("Attempt to get a connection.");

let conn = await oracledb.getConnection();

  console.log("Statement to be run:", sql);
  let result = await conn.execute(sql);

  console.log("Result :", result);

  await conn.close();
  let j = [];
  for (let r of result.rows)  {
    j.push(JSON.parse(r));
    console.log("Parse Result :", j);
  }
  return j;
}

 
// Resolver to match the GraphQL query and return data
const resolvers = {
  Query: {
           // AllPeople: ()=>
            //  return allPeople,
            dbMessage(root, args, context, info) {
            return dbTest();
            }
        }
  

}

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
      console.log("Use the following request  :    query  { getDbMsg {status}   }  ");
      console.log("");
      console.log(" ");
      console.log("Once the test has been run in Graphiql, press CTRL C to exit the application and shutdown the test listener. ");
      console.log(" ");


    });
  }
 


// Create a DB connection pool
async function startOracle() {
  console.log('Start Oracle ...') 
  try {
    await oracledb.createPool(dbConfig);
    console.log("Connection Pool created");
  } catch (err) {
    console.error(err);
  }

}


  // Run ORacle and Wserver
  async function run() {
    await startOracle();
    await ws();
  }

  async function closePoolAndExit() {
    console.log("\nTerminating");
    try {
      await oracledb.getPool().close(0);
      console.log("Pool closed");
      process.exit(0);
    } catch(err) {
      console.error(err.message);
      process.exit(1);
    }
  }
  
  process
    .once('SIGTERM', closePoolAndExit)
    .once('SIGINT',  closePoolAndExit);
  

  // Run the program
  run();
  
 
