const oracledb = require("oracledb");
const DBQuery = async function db_query(query) {
  let connection = undefined;
  if (connection == undefined) {
    connection = await oracledb.getConnection({
      user: "meeting_doc",
      password: "Mee123",
      connectString: "192.168.3.8/orclpdb",
    });
  }
  try {
    let result = await connection.execute(query);
    return result.rows;
  } catch (errors) {
    console.log(errors);
    console.log("Query not executed");
  }
};

module.exports = DBQuery;
