module.exports = function(sequelize,DataTypes){
    return sequelize.define('medicine',{
  
        medicine_name:{
            type:DataTypes.STRING,
            allowNull:false
        },
        
        medicine_salt:{
            type:DataTypes.STRING
        },
        
        medicine_type:{
            type:DataTypes.STRING
        },
        
        mrp:{
            type:DataTypes.INTEGER
        },
        
        manufacturer:{
            type:DataTypes.STRING
        }
        
    });
};