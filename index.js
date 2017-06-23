const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const nodemailer = require('nodemailer');

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


var emailSchema = new Schema({
  email: String
});

var Email = mongoose.model('email', emailSchema);


mongoose.connect('mongodb://user1:user1@ds157987.mlab.com:57987/final-capstone');

var MyModel = mongoose.model('Survey', BlogPost);

MyModel.find({}, function (err, data) {
  console.log('mongoose', data);
});



var transporter = nodemailer.createTransport({
        service: 'Gmail',
        auth: {
            user: 'heartinhandltd@gmail.com',
            pass: 'heartinhandltd%7&4'
        }
});



app.use('/', express.static('Heart-in-Hand'));

app.get("/vote", function(req, res) {
	Vote.find(function(err, users){
		console.log(users);
		if(err)
			res.send(err);
		res.json(users);
	})
})


app.post('/vote', function(req, res){
	console.log(req.body);
	console.log(req.query);

	newVote = new Vote({
        answer: req.body.answer
    });

    newVote.save(function(err) {
        if (err)
            res.send(err);
        res.redirect('/');
    });
});

app.post('/addEmail', function(req, res){
	console.log(req.body.email);
	newEmail = new Email({
		email: req.body.email
	});

	newEmail.save(function(err) {
		if (err)
			res.send(err);
	});
	// setup e-mail data with unicode symbols
    var mailOptions = {
// sender address
        from: 'Heart in Hand Ltd ✔ <katiebldwn@gmail.com>', 
// list of receivers
        to: req.body.email,  
// Subject line
        subject: 'Thank you for signing up!', 
// plaintext body
        text: 'It works! ✔',
// rich text html body
        html: "<p>Enjoy your free printable download!</p><a href='#'>Click Here to Download!</a>",
    };

// send mail with defined transport object
transporter.sendMail(mailOptions, function(error, info){
    if(error){
        console.log(error);
    }else{
        console.log('Message sent: ' + info.response);
    }
});

});




app.listen(8080, function() {
	console.log('App running on port 8080');
})