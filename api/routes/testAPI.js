var express = require("express");
var router = express.Router();
var pg = require('pg');
var conString = "postgres://postgres:admin@localhost:5432/todo_project";
var newUSer = {};
global.username = newUSer.username
var query;

    router.put('/',  async function(req, res, next) {
        newUSer = {
            username: req.body.username,
            password: req.body.password
          };
          
          var client = new pg.Client(conString);
          await client.connect();
          
          query =  await client.query("SELECT password, id_user FROM users WHERE username = '" + newUSer.username + "'").then( x => 
              { 
                 
                  return x.rows; 
              });
              res.json("");
              
        });
        router.get("/",  async function(req, res, next) {
           
            if(query[0].password == newUSer.password){
              const response = {
                id: query[0].id_user,
                equivalence:true
              }
                res.json(response);
               
              }
              else{
                const response = {
                  id: query[0].id_user,
                  equivalence: false
                }
                res.json(response);
                
              }
            });
        

module.exports = router;
