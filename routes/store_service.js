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

}

}

 module.exports = store;