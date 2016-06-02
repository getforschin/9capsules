var bodyParser = require('body-parser');
var _ = require('underscore');
var db = require('../db.js');
var bcrypt = require('bcrypt');
var middleware = require('../middleware.js')(db);

var store  = {

// add new medicine 
addNewStore :function(req,res){

	var body = _.pick(req.body, 'store_name', 'store_licence_copy','store_tinno','vendor_dp','vendor_degree_image','store_address','vendor_address');

    body.storeId = req.user.get('id');

    console.log(body.storeId);

},

editStoreDetails:function (req,res) {
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
    
    
    
},

// just a sample to check adminservice middleware is working or not
checkadminservice:function(req,res){

	console.log('admin is here');
}





}

 module.exports = store;