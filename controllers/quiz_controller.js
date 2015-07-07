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
	res.render('quizes/show',{ quiz: req.quiz});
};

exports.answer = function (req,res){	
	if ( req.query.respuesta ===  req.quiz.respuesta){
		res.render('quizes/answer',{  quiz: req.quiz, respuesta: 'correcto'} );		
	}
	else{
		res.render('quizes/answer',{ quiz: req.quiz, respuesta : 'incorrecto'} );	
	}
};

exports.index = function (req,res){	
	models.Quiz.findAll().then (function(quiz){
		res.render('quizes/index', { quizes: quiz });
	});
};



