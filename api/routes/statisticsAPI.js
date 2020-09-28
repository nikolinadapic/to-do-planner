/*select count(id_post) from posts; */
var express = require("express");
var router = express.Router();
var pg = require('pg');
var arrayStat = [];
var conString = "postgres://postgres:admin@localhost:5432/todo_project";

router.put('/',  async function(req, res, next) {
    const data ={ id: req.body.id}
    var client = new pg.Client(conString);
    await client.connect();
    //dodat join and  where id_user = uneseni ...
    var query0 =  await client.query("SELECT COUNT(posts.id_post) FROM posts JOIN user_post ON posts.id_post=user_post.id_post WHERE user_post.id_user = '" + data.id + "' AND category = 'home' AND checked=TRUE" ).then( x => 
        { 

            return x.rows; 
        }); 
    var query1 =  await client.query("SELECT COUNT(posts.id_post) FROM posts JOIN user_post ON posts.id_post=user_post.id_post WHERE user_post.id_user = '" + data.id + "' AND category = 'home' " ).then( x => 
        { 

            return x.rows; 
        }); 
    var query2 =  await client.query("SELECT COUNT(posts.id_post) FROM posts JOIN user_post ON posts.id_post=user_post.id_post WHERE user_post.id_user = '" + data.id + "' AND category = 'work' AND checked=TRUE" ).then( x => 
        { 

            return x.rows; 
        }); 
    var query3 =  await client.query("SELECT COUNT(posts.id_post) FROM posts JOIN user_post ON posts.id_post=user_post.id_post WHERE user_post.id_user = '" + data.id + "' AND category = 'work' " ).then( x => 
        { 

            return x.rows; 
        }); 
    var query4 =  await client.query("SELECT COUNT(posts.id_post) FROM posts JOIN user_post ON posts.id_post=user_post.id_post WHERE user_post.id_user = '" + data.id + "'  AND category = 'freetime' AND checked=TRUE" ).then( x => 
        { 

            return x.rows; 
        }); 
    var query5 =  await client.query("SELECT COUNT(posts.id_post) FROM posts JOIN user_post ON posts.id_post=user_post.id_post WHERE user_post.id_user = '" + data.id + "' AND category = 'freetime' " ).then( x => 
        { 

            return x.rows; 
        });
    arrayStat = [query0[0].count, query1[0].count, query2[0].count, query3[0].count, query4[0].count, query5[0].count];
    console.log("U StatisticsAPIu je ", query1[0].count)
    res.json("") 
        
  });
  router.get("/",  async function(req, res, next) {
    const post = {
        arrayOfStatistics: arrayStat
    }
    res.json(post);
        
    });

module.exports = router;  