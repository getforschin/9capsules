/* global foreach */
var bodyParser = require('body-parser');
var _ = require('underscore');
var db = require('../db.js');
var bcrypt = require('bcrypt');
var middleware = require('../middleware.js')(db);

var admin = {
    showNewVendor:function(req,res){
       
       db.user.findAll({
           include:[{
               model:db.role,
               where:{
                   role_name :"vendor"
               }
           }]
           
       }).then(function(user){
           console.log(user.isActive);
           console.log(user.admin_status);
           
          if(user.isActive == false && user.admin_status == false){
 
              res.json(user.toPublicJSON());
              
          }
          else
          {
              console.log(user);   
              res.status(400).send();
          }
          
           
       },function(e){
           res.status(500).send();
           
       });
        
    
    
    
    } // showNewVendor Ends here
} // Admin ends here

module.exports = admin;