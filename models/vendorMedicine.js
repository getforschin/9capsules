module.exports = function(sequelize,DataTypes){
    return sequelize.define('vendormedicine',{
        quantity :{
            type:DataTypes.INTEGER
        },
        sellingPrice:{
            type:DataTypes.INTEGER
        }
        
    });
}