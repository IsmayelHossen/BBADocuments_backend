const express = require("express");
const Update_Route = express.Router();
const mysql = require("mysql");
const path = require("path");
const multer = require("multer");
const DBQuery = require("../Database/Query_Builder");
//database

//update method
Update_Route.put("/update/:id", async function (req, res) {
  console.log(req.body);

  const query = `update documents set  name='${req.body.name}',MEETING_ID='${req.body.document_id}' where id=${req.body.id}`;
  const result = await DBQuery(query);

  res.status(200).json({
    success: true,
    data: result,
  });
});

module.exports = Update_Route;
