const express = require("express");
const Search_Route = express.Router();
const path = require("path");
const multer = require("multer");
const DBQuery = require("../Database/Query_Builder");

Search_Route.get("/search/:search", async function (req, res) {
  const s = req.params;
  console.log(s);
  // const query = `SELECT*FROM documents where lower(name) like '%${s.search}%' OR meeting_id like '%${s.search}%' OR lower(datentime) like '%${s.search}%' OR lower(emp_id) like '%${s.search}%' `;
  const query = `SELECT documents.*,view_employees.* from documents join view_employees on documents.emp_id=view_employees.emp_id  where lower(documents.name) like '%${s.search}%' OR documents.meeting_id like '%${s.search}%' OR lower(documents.datentime) like '%${s.search}%' OR lower(documents.meeting_date) like '%${s.search}%'`;
  const result = await DBQuery(query);

  res.status(200).json({
    success: true,
    data: result,
  });
});

Search_Route.get(
  "/individual_documents_search/:search_value/:document_type",
  async function (req, res) {
    const { search_value, document_type } = req.params;
    console.log(document_type);
    const query = `SELECT*from fileupload  where (lower(filename) like '%${search_value}%' OR lower(datentime) like '%${search_value}%') AND  documents_id=${document_type}  `;

    const result = await DBQuery(query);

    res.status(200).json({
      success: true,
      data: result,
    });
  }
);

Search_Route.get("/all_documents_searchh/:search", async function (req, res) {
  const s = req.params;
  console.log("all");
  console.log(s);
  const query = `SELECT fileupload.*,documents.name FROM fileupload inner join documents on fileupload.documents_id=documents.id where lower(fileupload.filename) like '%${s.search}%' OR lower(fileupload.datentime)  like '%${s.search}%'  OR lower(documents.name)  like '%${s.search}%'  `;
  const result = await DBQuery(query);

  res.status(200).json({
    success: true,
    data: result,
  });
});

module.exports = Search_Route;
