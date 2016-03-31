module.exports = function(sequelize,DataTypes){
    return sequelize.define('address',{
       
        street:{
            type:DataTypes.STRING,
            
        },
        landmark:{
            type:DataTypes.STRING
           
        },
        name_address:{
            type:DataTypes.STRING
        },
        address:{
            type:DataTypes.STRING,
            allowNull : false
        },
        city:{
            type:DataTypes.STRING,
            allowNull:false
        },
        state:{
            type:DataTypes.STRING,
            allowNull:false
        },
        district:{
            type:DataTypes.STRING
        },
        country:{
            
            type:DataTypes.STRING,
            allowNull:false
        },
        pin:{
            type:DataTypes.STRING,
            allowNull:false

        },

        contact_mobileNo:{
            type:DataTypes.STRING,
            allowNull:false

        }


        
    
});
};