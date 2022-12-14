const oracledb = require("oracledb");
const DBQuery = async function db_query(query) {
  let connection = undefined;
  if (connection == undefined) {
    connection = await oracledb.getConnection({
      user: "meeting_doc",
      password: "Meeting_doc0001",
      connectString: "192.168.3.8/orclpdb",
      // user: "system",
      // password: "system123",
      // connectString: "localhost/orcl",
    });
  }
  try {
    let result = await connection.execute(query);
    return result.rows;
  } catch (errors) {
    console.log(errors);
    console.log("Query not executed");
  } finally {
    connection.close();
  }
};

module.exports = DBQuery;
