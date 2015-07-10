var models = require ('../models/models.js');

exports.new = function (req,res){
	res.render('comments/new',{quizid : req.params.quizId, errors:[]});
};

exports.create = function (req, res, next){
	var Comment  = models.Comment.build ( { texto: req.body.comment.texto , QuizId: req.params.quizId} );
	Comment.validate()
	.then (
		function (err){
			if (err){
				res.render('comment/new',{comment : Comment, quizid: req.params.quizId, errors:err.errors});
				console.log ('hay error:' + JSON.stringify(err) );
			}
			else {				
					
					Comment.save()
					.then (
						function (){
							console.log('SAVED COMMENT');
							res.redirect('/quizes/' + req.params.quizId);
						});		
			}
		}).catch(function (error){ next(error)});
};