var bodyParser = require('body-parser');
var _ = require('underscore');
var db = require('../db.js');
var bcrypt = require('bcrypt');
var middleware = require('../middleware.js')(db);

var role = {
    
    // add New role 
    addRole: function (req, res) {

    var body = _.pick(req.body, 'role_name');

    db.role.create(body).then(function (role) {
        res.json(role.toJSON());
    }, function (e) {
        res.status(400).json(e);
    });
    return;
    },
    
    // Update Role Name 
    
    updateRole:function(req,res){
   var body = _.pick(req.body,'id','role_name');
   var attributes = {};
   if(!body.hasOwnProperty('role_name')){
       res.json();
   }
   
   attributes.role_name = body.role_name;
   attributes.id = body.id;
   
   db.role.findOne({
      where: {
        
        id:body.id
          }
   }).then(function(role){
     if(role){
         role.update(attributes).then(function(todo) {
				res.json(role.toJSON());
			}, function(e) {
				res.status(400).json(e);
			});
		} else {
            
			res.status(400).send();
		}
	}, function() {
		res.status(500).send();
	});
  }// update role end here
} // var role eng here
// Role Service end here

module.exports = role;
    // Thanks @getforsachin
