var express = require("express");
var router = express.Router();
var pg = require('pg');
var conString = "postgres://postgres:admin@localhost:5432/todo_project";
var newPost = {};
var client;
var query;

    router.put('/',  async function(req, res, next) {
        newPost = {
            id: req.body.id_post,
            id_user: req.body.id_user
          };
          
         client = new pg.Client(conString);
          await client.connect();
          
          query =  await client.query("DELETE FROM posts WHERE id_post = '" + newPost.id + "'").then( x => 
              { 
                 
                  return x.rows; 
              });
              query =  await client.query("DELETE FROM user_post WHERE id_post = '" + newPost.id + "'").then( x => 
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
              res.json(queryPost);
            });
        

module.exports = router;
