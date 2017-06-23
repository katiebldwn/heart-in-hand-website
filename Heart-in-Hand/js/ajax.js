var token = '3027942827.fe33b91.f2974810b3264a70a06c041c5e75ed0c';
    // userid = 3027942827
    num_photos = 3;

    console.log('test');
 
$.ajax({
	url: 'https://api.instagram.com/v1/users/self/media/recent',
	dataType: 'jsonp',
	type: 'GET',
	data: {access_token: token, count: num_photos},
	success: function(data){
 		console.log(data);
		for( x in data.data ){
			$('.instagram-ul').append('<li><img src="'+data.data[x].images.low_resolution.url+'"></li>');
		}
	},
	error: function(data){
		console.log(data);
	}
});

$('#submit').click(function() {
	var userAnswer = $('input[name="answer"]:checked').val();
	var object = {};
	object.answer = userAnswer;
	$('.survey').html('');

$.ajax({
	url: '/vote',
	type: 'POST',
	data: object,
	success: function(data){
 		console.log(data);
 		$('.survey').html('');
 		$.ajax({
			url: '/vote',
			type: 'GET',
			success: function(data){
		 		console.log(data);
		 		var Pug = 0;
		 		var Lab = 0;
		 		var Yorkie = 0;
		 		for (i = 0; i<data.length; i++) {
		 			console.log(data[i]);
		 			if(data[i].answer==='Pug') {
		 				Pug++;
		 			}
		 			else if(data[i].answer==='Lab') {
		 				Lab++;
		 			}
		 			else if(data[i].answer==='Yorkie') {
		 				Yorkie++;
		 			}
		 		}

		 		$('#surveyResults').removeClass('hidden');
		 		$('.answer1').html('Pug: ' + Pug);
		 		$('.answer2').html('Lab: ' + Lab);
		 		$('.answer3').html('Yorkie: ' + Yorkie);

		 		console.log(Pug);
		 		console.log(Lab);
		 		console.log(Yorkie);
	}
});
	},

	error: function(data){
		console.log(data); // send the error notifications to console
	}
});

})






