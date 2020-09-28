/*select count(id_post) from posts; */
var express = require("express");
var router = express.Router();
var pg = require('pg');
var conString = "postgres://postgres:admin@localhost:5432/todo_project";
router.get('/',  async function(req, res, next) {
    var client = new pg.Client(conString);
    await client.connect();
    var query =  await client.query("SELECT MAX(id_post) FROM posts" ).then( x => 
        { 
            
            return x.rows; 
        });  
    console.log(query[0])
    const post = {
        number: query[0].max
    }
    res.json(post);
        
  });

module.exports = router;  