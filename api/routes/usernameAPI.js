var express = require("express");
var router = express.Router();
var pg = require('pg');
var conString = "postgres://postgres:admin@localhost:5432/todo_project";
router.get('/',  async function(req, res, next) {
  var client = new pg.Client(conString);
  await client.connect();
  
    res.json("");
      
});

module.exports = router;  