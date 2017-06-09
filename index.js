const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const mongoose = require('mongoose');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));


var Schema = mongoose.Schema;

var BlogPost = new Schema({
    name: String
});

var voteSchema = new Schema({
  answer: String
});

var Vote = mongoose.model('vote', voteSchema);

mongoose.connect('mongodb://user1:user1@ds157987.mlab.com:57987/final-capstone');

var MyModel = mongoose.model('Survey', BlogPost);

MyModel.find({}, function (err, data) {
  console.log('mongoose', data);
});

app.use('/', express.static('Synthetica'));

app.get("/vote", function(req, res) {
	Vote.find(function(err, users){
		console.log(users);
		if(err)
			res.send(err);
		res.json(users);
	})
})


app.post('/vote', function(req, res){
	// const requiredFields = ['', 'lastName'];
	// for (var i=0; i<requiredFields.length; i++) {
	// 	const field = requiredFields[i];
	// 	if (!(field in req.body)) {
	// 		const message = 'Missing \`${field}\` in request body'
	// 		return res.status(400).send(message);
	// 	}
	// }

	console.log(req.body);
	console.log(req.query);

	// console.log(req);

	newVote = new Vote({
        answer: req.body.answer,
    });

    newVote.save(function(err) {
        if (err)
            res.send(err);
        res.redirect('/');
    });
});


app.listen(8080, function() {
	console.log('App running on port 8080');
})