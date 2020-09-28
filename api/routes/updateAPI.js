var express = require("express");
var router = express.Router();
var pg = require('pg');
var conString = "postgres://postgres:admin@localhost:5432/todo_project";
var client;
var query;

router.put('/',  async function(req, res, next) {
    const newPost = {
        id_post: req.body.id_post,
        task: req.body.task,
        description: req.body.description,
        date: req.body.date,
        time: req.body.time,
      };
        
        client = new pg.Client(conString);
        await client.connect();
        
        query =  await client.query("UPDATE posts SET title = '" +  newPost.task + "', description = '" + newPost.description 
        + "', date = '" + newPost.date + "', time = '" + newPost.time
        + " ' WHERE id_post = ' "+  newPost.id_post + "'").then( x => 
            { 
                
                return x.rows; 
            });
            res.json("");
            
    });

module.exports = router;
