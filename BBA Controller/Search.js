const express = require('express');
const Search_Route=express.Router();
const mysql = require('mysql')
const path=require("path")
const multer = require("multer");
const DBQuery=require("../Database/Query_Builder")


  Search_Route.get("/search/:search", async function (req, res) {
    const s = req.params;
    console.log(s);
    const query = `SELECT*FROM documents where lower(name) like '%${s.search}%' or document_id like '%${s.search}%' `;
  const result=await DBQuery(query)
    
        res.status(200).json({
  
          "success": true,
          "data": result
        })
  
   

  })

  

  Search_Route.get("/searchd/:search/:name", async function (req, res) {
    const s = req.params;
    console.log(s);
    const query = `SELECT fileupload1.*,documents.name from fileupload1 join documents on fileupload1.documents_id=documents.id where fileupload1.filename like '%${s.search}%' and documents.name='${s.name}' `;
  
    const result=await DBQuery(query)
    
    res.status(200).json({

      "success": true,
      "data": result
    })

  })



  Search_Route.get("/searchd/:search", async function (req, res) {
    const s = req.params;
    console.log(s);
    const query = `SELECT*FROM fileupload1 where lower(filename) like '%${s.search}%'  `;
    const result=await DBQuery(query)
    
    res.status(200).json({

      "success": true,
      "data": result
    })
  })

  module.exports=Search_Route;