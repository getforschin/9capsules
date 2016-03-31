var Sequelize = require('sequelize');
var env = process.env.NODE_ENV || 'development';
var sequelize;

if (env === 'production') {
	sequelize = new Sequelize(process.env.DATABASE_URL, {
		dialect: 'postgres'
	});
} else {
	sequelize = new Sequelize(undefined, undefined, undefined, {
		'dialect': 'sqlite',
		'storage': __dirname + '/data/dev-todo-api.sqlite'
	});
}

var db = {};

db.todo = sequelize.import(__dirname + '/models/todo.js');
db.user = sequelize.import(__dirname + '/models/user.js');
db.token = sequelize.import(__dirname + '/models/token.js');
db.role = sequelize.import(__dirname + '/models/role.js');
db.address = sequelize.import(__dirname + '/models/address.js');
db.store = sequelize.import(__dirname + '/models/store.js');
db.medicine = sequelize.import(__dirname + '/models/medicine.js');
db.vendorMedicine = sequelize.import(__dirname + '/models/vendorMedicine');
db.sequelize = sequelize;
db.Sequelize = Sequelize;

// One todo belongs to many user
db.todo.belongsTo(db.user);
db.user.hasMany(db.todo);

// A role can have many user 
db.user.belongsTo(db.role);
db.role.hasMany(db.user);

// A user can have multiple address
db.address.belongsTo(db.user);
db.user.hasMany(db.address);

// A store can add many medicine 
db.medicine.belongsTo(db.store);
db.store.hasMany(db.medicine);

// A store assign with each vendor 
db.store.belongsTo(db.user);



db.medicine.belongsToMany(db.store,{through:db.vendorMedicine});
db.store.belongsToMany(db.medicine,{through:db.vendorMedicine});

module.exports = db;