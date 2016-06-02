var cryptojs = require('crypto-js');

module.exports = function (db) {

	return {
        // check for the authentication of the authorization key
		requireAuthentication: function (req, res, next) {
			var token = req.get('Auth') || '';

			db.token.findOne({
				where: {
					tokenHash: cryptojs.MD5(token).toString()
				}
			}).then(function (tokenInstance) {
				if (!tokenInstance) {
					throw new Error();
				}

				req.token = tokenInstance;
				return db.user.findByToken(token);
			}).then(function (user) {
				req.user = user;
				next();
			}).catch(function () {
				res.status(401).send();
			});
		},
        
        // check for the account to which you are logged in is admin
        checkAdmin:function(req,res,next){
            var token = req.get('Auth')||'';
            
            db.token.findOne({
                where:{
                    tokenHash: cryptojs.MD5(token).toString()
                    
                }
            }).then(function(tokenInstance){
                if(!tokenInstance){
                    throw new Error();
                }
                
                req.token = tokenInstance;
                return db.user.findByToken(token);
                
            }).then(function(user){
                db.role.findOne({
                    where:{
                        id:user.roleId
                    }
                }).then(function(role){
                    
                    console.log('role name is '+ role.role_name);
                    if(role.role_name == 'admin'){
                        
                        next();
                    }
                }).catch(function(error){
                    console.log('error is '+ error);
                    console.log('u r at error part');
                    res.status(402).send();
                });
                
            });
            
            
        }
	};

};