--------------------------------------------------------
--------------------------------------------------------
--------------------------------------------------------
--  DDL for Package XXGQL_SYS_UTIL_PKG
--------------------------------------------------------

  CREATE OR REPLACE EDITIONABLE PACKAGE "HR"."XXGQL_SYS_UTIL_PKG" 
as


type list_recinfo is varray(10000) of VARCHAR2(4000);


function callbackMsg RETURN  VARCHAR2; 

end xxgql_sys_util_pkg;

/
