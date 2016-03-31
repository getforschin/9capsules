var bodyParser = require('body-parser');
var _ = require('underscore');
var db = require('../db.js');
var bcrypt = require('bcrypt');
var middleware = require('../middleware.js')(db);

/*
var medicine  = {

// add new medicine 
addNewMedicine :function(req,res){

		var body = _.pick(req.body, 'medicine_name', 'medicine_salt','medicine_type','mrp','manufacturer');


    body.storeId = req.user.get('id');

    console.log(body.storeId);

}

}

 module.exports = medicine;

*/