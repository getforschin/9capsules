module.exports = function(sequelize, DataTypes) {
	return sequelize.define('store', {
		store_name: {
			type: DataTypes.STRING,
			allowNull: false,
			
		},
		store_image: {
			type: DataTypes.STRING
        },
        store_licence_copy:{
            type: DataTypes.STRING
        },
        store_tinno:{
           type: DataTypes.STRING 
        },
        vendor_dp:{
            type: DataTypes.STRING
        },
        vendor_degree_image:{
            type:DataTypes.STRING
        },
        store_address:{
            type: DataTypes.STRING
        },
        vendor_address:{
            type: DataTypes.STRING
        }
        
	});
};