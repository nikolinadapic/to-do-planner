var express = require("express");
var router = express.Router();
var pg = require('pg');
var conString = "postgres://postgres:admin@localhost:5432/todo_project";
var client;
var query;
var newPost = {};

router.put('/',  async function(req, res, next) {
     newPost = {
        id_post: req.body.id_post,
        checked: req.body.checked,
        id_user: req.body.id_user 
      };
        
        client = new pg.Client(conString);
        await client.connect();
        console.log("ID USERA U CHECK API JE " + newPost.id_user)
        query =  await client.query("UPDATE posts SET checked = '"+  newPost.checked + "'" +
        "WHERE id_post = ' "+  newPost.id_post + "'").then( x => 
            { 
                
                return x.rows; 
            });
            res.json("");
            
    });
router.get("/",  async function(req, res, next) {
        
    query =  await client.query("SELECT * FROM posts JOIN user_post ON posts.id_post=user_post.id_post WHERE user_post.id_user = '" + newPost.id_user + "'").then( x => 
        { 
        
            return x.rows; 
        });
        var queryPost = {
        arrayOfObj: query
    } 
    console.log("u check api je query" + query);
        res.json(queryPost);
    });

module.exports = router;
