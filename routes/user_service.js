var bodyParser = require('body-parser');
var _ = require('underscore');
var db = require('../db.js');
var bcrypt = require('bcrypt');
var middleware = require('../middleware.js')(db);

var user = {
    addUser:function(req, res) {
     var body = _.pick(req.body, 'email', 'password','contact_no','fname','lname','device_id','roleId');
     
    if(!body.hasOwnProperty('gender')){
        body.gender = '';
    }
    if(!body.hasOwnProperty('lname')){
        body.lname ='';
    }
    if(!body.hasOwnProperty('device_id')){
        body.device_id='';
    }
    
    
    db.role.findOne({
       where:{
           
           id:body.roleId  // check for roleid to fetch the role name 
       }
        
    }).then(function(role){ // continous function
      
       if(role.role_name == 'vendor'){  // when  registered profile is admin : change isActive = false and Admin status = false
           body.isActive = false;  // Means Vendor initially not active
                                  
           
       }
       else if(role.role_name == 'admin' || role.role_name =='enduser'){
          
           body.isActive = true; // Here user is already active 
           
       }
       
   }, function(e){ // when  some problem come 
       
       res.status(400).send();
   }).then(function(){
         
    db.user.create(body).then(function (user) {
		res.json(user.toPublicJSON());
	}, function (e) {
		res.status(400).json(e);
	});
   });
       
        
        
    
    
  
    
    },
    
    // Login User 
    
    login:function (req, res) {
	var body = _.pick(req.body, 'email', 'password');
	var userInstance;

	db.user.authenticate(body).then(function (user) {
		var token = user.generateToken('authentication');
		userInstance = user;

		return db.token.create({
			token: token
		});
	}).then(function (tokenInstance) {
		res.header('Auth', tokenInstance.get('token')).json(userInstance.toPublicJSON());
	}).catch(function () {
		res.status(401).send();
	});
 },
 update:function(req,res){
     var body  = _.pick(req.body,'id','email','contact_no','fname','lname','gender','device_id','isActive');
     var attributes = {};


	if (body.hasOwnProperty('email')) {
		attributes.email = body.email;
	}if (body.hasOwnProperty('fname')) {
		attributes.fname = body.fname;
	}if (body.hasOwnProperty('lname')) {
		attributes.lname = body.lname;
	}if (body.hasOwnProperty('gender')) {
		attributes.gender = body.gender;
	}if (body.hasOwnProperty('contact_no')) {
		attributes.contact_no = body.contact_no;
	}if (body.hasOwnProperty('device_id')) {
		attributes.device_id = body.device_id;
	}if (body.hasOwnProperty('isActive')) {
		attributes.isActive = body.isActive;
	}
    
    db.user.findOne({
		where: {
			id: body.id
			
		}
	}).then(function(user) {
		if (user) {
			user.update(attributes).then(function(user) {
				res.json(user.toPublicJSON());
			}, function(e) {
				res.status(400).json(e);
			});
		} else {
			res.status(404).send();
		}
	}, function() {
		res.status(500).send();
	});
 },
 
 logout:function (req, res) {
	req.token.destroy().then(function () {
		res.status(204).send();
	}).catch(function () {
		res.status(500).send();
	});
 } // log out end here
}
 
 module.exports =user;