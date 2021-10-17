// oradbconfig.js
//  
module.exports = {
  user          : process.env.NODE_ORACLEDB_USER || "HR",


  // External Authentication.
  password      : process.env.NODE_ORACLEDB_PASSWORD || "**************",


  // Host + Service Name
  connectString : process.env.NODE_ORACLEDB_CONNECTIONSTRING || "*********_high", 

  // Setting externalAuth is optional.  It defaults to false.   
  externalAuth  : process.env.NODE_ORACLEDB_EXTERNALAUTH ? true : false
};
