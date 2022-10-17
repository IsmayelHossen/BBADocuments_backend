const express = require("express");
const Search_Route = express.Router();
const mysql = require("mysql");
const path = require("path");
const multer = require("multer");
const DBQuery = require("../Database/Query_Builder");

Search_Route.get("/search/:search", async function (req, res) {
  const s = req.params;
  console.log(s);
  const query = `SELECT*FROM documents where lower(name) like '%${s.search}%' or document_id like '%${s.search}%' or lower(datentime) like '%${s.search}%' `;
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
    const query = `SELECT*from fileupload1  where (lower(filename) like '%${search_value}%' OR lower(datentime) like '%${search_value}%') AND  documents_id=${document_type}  `;

    const result = await DBQuery(query);

    res.status(200).json({
      success: true,
      data: result,
    });
  }
);

Search_Route.get("/all_documents_searchh/:search", async function (req, res) {
  const s = req.params;
  console.log(s);
  const query = `SELECT fileupload1.*,documents.name FROM fileupload1 join documents on fileupload1.documents_id=documents.id where lower(fileupload1.filename) like '%${s.search}%' OR lower(fileupload1.datentime) like '%${s.search}%'  OR lower(documents.name) like '%${s.search}%'  `;
  const result = await DBQuery(query);

  res.status(200).json({
    success: true,
    data: result,
  });
});

module.exports = Search_Route;
