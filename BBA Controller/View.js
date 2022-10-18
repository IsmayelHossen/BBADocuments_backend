const express = require("express");
const View_Route = express.Router();
const mysql = require("mysql");
const path = require("path");
const multer = require("multer");
const DBQuery = require("../Database/Query_Builder");

//get method
View_Route.get("/getdata", async function (req, res) {
  const query = "SELECT* from documents order  by id";
  const result = await DBQuery(query);

  res.status(200).json({
    success: true,
    data: result,
  });
  // console.log(rows);
});

View_Route.get("/filedata/:id", async function (req, res) {
  const s = req.params.id;
  const query = `SELECT * FROM fileupload where documents_id =${s} `;
  const result = await DBQuery(query);
  res.status(200).json({
    success: true,
    data: result,
  });
});

View_Route.get("/docslist", async function (req, res) {
  const s = req.params.id;

  const query = `SELECT documents.*,fileupload.*  FROM fileupload inner join documents on documents.id=fileupload.documents_id `;

  const result = await DBQuery(query);

  res.status(200).json({
    success: true,
    data: result,
  });
});

module.exports = View_Route;
