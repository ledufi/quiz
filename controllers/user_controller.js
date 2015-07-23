var users = {
	admin: {
		id : 2,
		username:'admin',
		password:'1234'
	},
	eduardo:{
		id: 1,
		username:'eduardo',
		password:'1234'
	}
};

exports.autenticar = function (login, password, callback){
console.log ( 'autenticar=' + users[login]);
	if ( users[login] ){
		console.log ( 'autenticar=' + login);
		if ( password === users[login].password ){
			callback(null,users[login]);
		}
		else{
			callback( new Error('password incorrecto'));
			console.log ( 'autenticar=' + login);
		}
	}
	else {
		console.log("users doesn't exist, callback= " + callback);
		
		callback( new Error('no existe el usuario'));
		
	}
};
