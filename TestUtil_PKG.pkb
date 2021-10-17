-------------------------------------------------------- 
--------------------------------------------------------
--------------------------------------------------------
--  DDL for Package Body XXGQL_SYS_UTIL_PKG
--------------------------------------------------------

  CREATE OR REPLACE EDITIONABLE PACKAGE BODY "HR"."XXGQL_SYS_UTIL_PKG" as



function callbackMsg RETURN  VARCHAR2
IS

  l_db  VARCHAR2(15);
  l_msg VARCHAR2(100);

begin

SELECT
JSON_OBJECT('status' VALUE 'Successful call to the test Oracle Db package ')  as x
INTO l_msg
FROM DUAL;


   RETURN(l_msg);

end   callbackMsg; 

end xxgql_sys_util_pkg;

/
