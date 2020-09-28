var express = require("express");
var router = express.Router();
var pg = require('pg');
var conString = "postgres://postgres:admin@localhost:5432/todo_project";
let queryPost = {};
var  query;
router.put('/',  async function(req, res, next) {
        const data ={ id: req.body.id}
        console.log("U POSTS APIJU JE ID ", data.id)
        var client = new pg.Client(conString);
        await client.connect();
     query =  await client.query("SELECT posts.id_post, posts.category, posts.description, posts.title, posts.date, posts.time, posts.checked FROM posts JOIN user_post ON posts.id_post=user_post.id_post WHERE user_post.id_user ='" + data.id + "'" ).then( x => 
    { 
        
        return x.rows; 
    });  

    res.json("")  
    });
    
router.get("/",  async function(req, res, next) {
    queryPost = {
        arrayOfObj: query
    }  
        res.json(queryPost);
        
        
    });    

module.exports = router;
            