var models = require ('../models/models.js');

exports.load = function (req, res, next, quizId){
	models.Quiz.findById(quizId).then (function(quiz){
		if ( quiz){
			req.quiz = quiz;
			next();
		}
		else {
			next( new Error ('No existe quizId=' + quizId));
		}		
	});
};

exports.show = function (req,res){	
	res.render('quizes/show',{ quiz: req.quiz, errors:[] });
};

exports.answer = function (req,res){	
	if ( req.query.respuesta ===  req.quiz.respuesta){
		res.render('quizes/answer',{  quiz: req.quiz, respuesta: 'correcto', errors:[]} );		
	}
	else{
		res.render('quizes/answer',{ quiz: req.quiz, respuesta : 'incorrecto', errors:[] } );	
	}
};

exports.index = function (req,res){	
	if (req.query.search){
		console.log ('entre a searchi');
		var search = '%' + req.query.search + '%';
		search = search.replace(/[ ]/g, "%");
		models.Quiz.findAll({where: ["pregunta like ?", search],order: [['pregunta', 'DESC']]}).then (function(quiz){
			res.render('quizes/index', { quizes: quiz, errors:[] });
		});
	}
	else {
		models.Quiz.findAll().then (function(quiz){
			res.render('quizes/index', { quizes: quiz, errors:[] });
		});
	}
};

exports.new = function (req,res){	
	var quiz = models.Quiz.build ({pregunta: "Pregunta", respuesta: "respuesta" });
	res.render('quizes/new',{quiz : quiz, errors:[]});
};

exports.create = function (req, res){
	console.log ( req.body.quiz);
	var quiz = models.Quiz.build ( req.body.quiz );
	quiz.validate()
	.then (
		function (err){
			if (err){
				res.render('quizes/new',{quiz:quiz, errors:err.errors});
				console.log ('hay error:' + JSON.stringify(err) );
			}
			else {				
					quiz.save({fields:["pregunta","respuesta"]})
					.then (
						function (){
							res.redirect('/quizes');
						});		
			}
		});
}

exports.edit = function(req, res){
	var quiz = req.quiz;
	res.render('quizes/edit',{quiz: quiz, errors : [] });
}
exports.update = function (req,res){
	req.quiz.pregunta = req.body.quiz.pregunta;
	req.quiz.respuesta = req.body.quiz.respuesta;
	console.log ('update');
	req.quiz.validate()
	.then ( 
		function (error){
			if ( error ){
				res.render('quizes/edit', { quiz: req.quiz, errors : error.errors });
			}
			else{
				req.quiz
				.save( {fields: ["pregunta", "respuesta"]}) 
				.then( function (){
					res.redirect('/quizes');
				});
			}
		}
		);
}

exports.destroy = function(req, res, next){
	console.log( 'delete' + req.quiz);
	req.quiz.destroy()
	.then( function(){
		res.redirect('/quizes');


	}).catch(function (error){ next(error)});
}
