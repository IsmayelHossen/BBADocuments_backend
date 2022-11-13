const express = require("express");
const View_Route = express.Router();
const mysql = require("mysql");
const path = require("path");
const multer = require("multer");
const DBQuery = require("../Database/Query_Builder");

//get method
View_Route.get("/getdata", async function (req, res) {
  const query =
    "SELECT documents.*,view_employees.* from documents join view_employees on documents.emp_id=view_employees.emp_id order  by documents.id";
  const result = await DBQuery(query);

  res.status(200).json({
    success: true,
    data: result,
  });
  // console.log(rows);
});

View_Route.get("/filedata/:id", async function (req, res) {
  const documents_id = req.params.id;
  const query = `SELECT * FROM fileupload where documents_id =${documents_id} order by filename ASC `;
  const result = await DBQuery(query);
  res.status(200).json({
    success: true,
    data: result,
  });
});

View_Route.get("/docslist", async function (req, res) {
  const s = req.params.id;

  const query = `SELECT documents.*,fileupload.*  FROM fileupload inner join documents on documents.id=fileupload.documents_id order by fileupload.id asc `;

  const result = await DBQuery(query);

  res.status(200).json({
    success: true,
    data: result,
  });
});
//category view
View_Route.get("/category/view", async function (req, res) {
  const s = req.params.id;

  const query = `SELECT*from category `;

  const result = await DBQuery(query);

  res.status(200).json({
    success: true,
    data: result,
  });
});
//category list

View_Route.get("/categorylist", async function (req, res) {
  const s = req.params.id;

  const query = `SELECT*from category `;

  const result = await DBQuery(query);

  res.status(200).json({
    success: true,
    data: result,
  });
});
//get document last id
View_Route.get("/getlastId/:docType", async function (req, res) {
  const docTye = req.params.docType;
  console.log(docTye);
  const query = `SELECT max(meeting_id) as id from documents where name='${docTye}' `;

  const result = await DBQuery(query);
  console.log(result);
  res.status(200).json({
    success: true,
    data: result,
  });
});
module.exports = View_Route;
