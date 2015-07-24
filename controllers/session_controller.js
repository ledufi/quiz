var models = require ('../models/models.js');

exports.new = function (req,res){
	var errors = req.session.errors || {};
	req.session.errors = {};
	res.render('sessions/new',{ errors: errors});
};

exports.create = function (req, res, next){
	
	var login = req.body.login;
	var password = req.body.password;
	console.log('login:' + login);
	console.log('password:' + password);
	var userController = require('./user_controller');	

	userController.autenticar( login, password, function (error,user){
		console.log('funcion validacion' + error + user);		
		if (error){
			console.log('funcion error' + error + user);
				
			req.session.errors = [{"message":'se ha producido un error'}];

			res.redirect('/login');
			
		}else {
		console.log('session var = ' + JSON.stringify(req.session));
			req.session.user = {id : user.id, username:user.username};
			res.redirect( req.session.redir.toString());		
		}
	});
}

exports.destroy = function (req,res){	
	delete req.session.user;
	res.redirect ( req.session.redir.toString() );
};

exports.loginRequired = function (req, res, next){
	if ( req.session.user){
		next();
	}
	else {
		res.redirect('/login');
	}
}

exports.autoLogOut = function ( req, res, next ) {
	var currentTime = new Date ();
	var timeAllowed =  new Date(req.session.lastUpdate.getTime() + 2*60000 );
	if ( timeAllowed >= currentTime){
		req.session.lastUpdate = currentTime;
	}
	else {
			delete req.session.user;
			res.redirect ( '/login' );
	}	
}