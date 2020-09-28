var express = require("express");
var router = express.Router();
var pg = require('pg');
var conString = "postgres://postgres:admin@localhost:5432/todo_project";
var queryID, queryPost;

router.put('/',  async function(req, res, next) {
     const newPost = {
        id_user:req.body.id_user,
        id_post: req.body.id_post,
        task: req.body.task,
        description: req.body.description,
        date: req.body.date,
        time: req.body.time,
        category: req.body.category,
        checked: false
      };
        
        var client = new pg.Client(conString);
        await client.connect();
        /*INSERT INTO posts  VALUES ('7','home', 'do','bzvz', '10:00:00','2020-03-08');*/
        queryPost =  await client.query("INSERT INTO posts (id_post, category, title, description, time, date, checked) VALUES ( '" + newPost.id_post +"','"+
        newPost.category +"','" + newPost.task + "','" + newPost.description + "','" +
        newPost.time + "','" + newPost.date +  "','" + newPost.checked + "')").then( x => 
            { 
               
                return x.rows; 
            });
            queryPostUser =  await client.query("INSERT INTO user_post VALUES ( '" + newPost.id_user +"','"+
            newPost.id_post +"')").then( x => 
                { 
                   
                    return x.rows; 
                });
            res.json(queryPost, queryPostUser); 
            
        })
       
             
              
      
module.exports = router;
                  