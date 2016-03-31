module.exports = function(sequelize,DataTypes){
    return sequelize.define('role',{
       
        role_name:{
            
            type:DataTypes.ENUM('enduser','vendor','admin'),
            allowNull:false
        }
        
    
});
};