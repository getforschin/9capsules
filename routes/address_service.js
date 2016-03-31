var bodyParser = require('body-parser');
var _ = require('underscore');
var db = require('../db.js');
var bcrypt = require('bcrypt');
var middleware = require('../middleware.js')(db);

var address = {
    add:function(req,res){
       var body = _.pick(req.body,'street','address','name_address','landmark','city','state','district','country','pin','contact_mobileNo');
       if(!body.hasOwnProperty('street')){
        body.street = '';
    }
    if(!body.hasOwnProperty('landmark')){
        body.landmark ='';
    }
    if(!body.hasOwnProperty('district')){
        body.district='';
    } 
    body.userId = req.user.get('id');
    db.address.create(body).then(function(address){
       res.json(address.toJSON()); 
    },function(e){
        res.json(e);
    });
    
    }, // add ends here
    allAddress:function(req,res){
        
	var where = {
		userId: req.user.get('id')
	};
    db.address.findAll({
		where: where
	}).then(function(addresses) {
		res.json(addresses);
	}, function(e) {
		res.status(500).send();
	});

    }, // all Address ends here 
    
    getAddress:function(req,res){
        var body = _.pick(req.body,'id');
        db.address.findOne({
            where: {
			id: body.id,
			userId: req.user.get('id')
		}
        }).then(function(address){
            if(!!address){
                res.json(address.toJSON());
            }
            else{
                res.status(404).send();
            }
        },function(e){
           res.status(500).send();
            
        });
    },

    updateAddress:function(req,res){
        
         var body = _.pick(req.body,'id','street','address','name_address','landmark','city','state','district','country','pin','contact_mobileNo');
          var attributes = {};


	if (body.hasOwnProperty('street')) {
		attributes.street = body.street;
	}if (body.hasOwnProperty('address')) {
		attributes.address= body.address;
	}if (body.hasOwnProperty('name_address')) {
		attributes.name_address = body.name_address;
	}if (body.hasOwnProperty('landmark')) {
		attributes.landmark = body.landmark;
	}if (body.hasOwnProperty('city')) {
		attributes.city = body.city;
	}if (body.hasOwnProperty('state')) {
		attributes.state = body.state;
	}if (body.hasOwnProperty('district')) {
		attributes.district = body.district;
	}if (body.hasOwnProperty('country')) {
		attributes.country = body.country;
	}if (body.hasOwnProperty('pin')) {
		attributes.pin = body.pin;
	}if (body.hasOwnProperty('contact_mobileNo')) {
		attributes.contact_mobileNo = body.contact_mobileNo;
	}
    
    db.address.findOne({
		where: {
			id: body.id,
            userId: req.user.get('id')
			}
       
	}).then(function(address) {
		if (address) {
			address.update(attributes).then(function(address) {
                console.log(address);
				res.json(address.toJSON());
			}, function(e) {
				res.status(400).json(e);
			});
		} else {
			res.status(404).send();
		}
	}, function() {
		res.status(500).send();
	});
 }
    

    
    
    
} // address ends here

module.exports = address;