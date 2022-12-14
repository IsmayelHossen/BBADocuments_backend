const express = require("express");
const Search_Route = express.Router();
const path = require("path");
const multer = require("multer");
const DBQuery = require("../Database/Query_Builder");

Search_Route.get("/search/:search", async function (req, res) {
  const s = req.params;
  console.log(s);
  // const query = `SELECT*FROM documents where lower(name) like '%${s.search}%' OR meeting_id like '%${s.search}%' OR lower(datentime) like '%${s.search}%' OR lower(emp_id) like '%${s.search}%' `;
  const query = `SELECT documents.*,view_employees.* from documents join view_employees on documents.emp_id=view_employees.emp_id  where lower(documents.name) like '%${s.search}%' OR documents.meeting_id like '%${s.search}%' OR lower(documents.meeting_date) like '%${s.search}%' OR lower(documents.document_tag) like '%${s.search}%' order by documents.meeting_id`;
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
//search without filter

Search_Route.get(
  "/all_documents_search_withoutFilter/:search",
  async function (req, res) {
    const s = req.params;
    console.log(s);
    const query = `SELECT fileupload.*,documents.name,documents.meeting_date,documents.meeting_id FROM fileupload inner join documents on fileupload.documents_id=documents.id where (lower(fileupload.filename) like '%${s.search}%' OR lower(documents.name)  like '%${s.search}%' OR documents.meeting_date  like '%${s.search}%' OR documents.meeting_id  like '%${s.search}%')  `;
    const result = await DBQuery(query);

    res.status(200).json({
      success: true,
      data: result,
    });
  }
);
Search_Route.get(
  "/all_documents_search/:search/:filter",
  async function (req, res) {
    const s = req.params;
    console.log(s);
    const query = `SELECT fileupload.*,documents.name,documents.meeting_date,documents.meeting_id FROM fileupload inner join documents on fileupload.documents_id=documents.id where (lower(fileupload.filename) like '%${s.search}%' OR lower(documents.name)  like '%${s.search}%' OR documents.meeting_date  like '%${s.search}%' OR documents.meeting_id  like '%${s.search}%') AND documents.name='${s.filter}'  `;
    const result = await DBQuery(query);

    res.status(200).json({
      success: true,
      data: result,
    });
  }
);
Search_Route.get("/all_documents_filter/:filter", async function (req, res) {
  const filter = req.params.filter;
  console.log(filter);
  const query = `SELECT fileupload.*,documents.name,documents.meeting_date,documents.meeting_id FROM fileupload inner join documents on fileupload.documents_id=documents.id where documents.name='${filter}'     `;
  const result = await DBQuery(query);
  console.log(result);
  res.status(200).json({
    success: true,
    data: result,
  });
});

//category search

Search_Route.get("/category/search/:search", async function (req, res) {
  const s = req.params;
  console.log(s);
  // const query = `SELECT*FROM documents where lower(name) like '%${s.search}%' OR meeting_id like '%${s.search}%' OR lower(datentime) like '%${s.search}%' OR lower(emp_id) like '%${s.search}%' `;
  const query = `SELECT*from category where lower(category_name) like '%${s.search}%'`;
  const result = await DBQuery(query);

  res.status(200).json({
    success: true,
    data: result,
  });
});

module.exports = Search_Route;
