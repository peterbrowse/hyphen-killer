//Console Colours
var	blue  	= '\033[34m',
	green 	= '\033[32m',
	red   	= '\033[31m',
	yellow 	= '\033[33m',
	reset 	= '\033[0m';
	
//Static Variables
	
//Dependencies
var express		= require('express')
,	http 		= require('http')
,	app 		= express()
,	server 		= http.createServer(app)
,	fs			= require('fs');

//Express Environment Configuration
app.configure('development', function(){
  app.use(express.static(__dirname + '/public'));
  app.use(express.errorHandler({ dumpExceptions: true, showStack: true })); 
  app.use(express.logger());
});

app.configure('production', function(){
  app.use(express.static(__dirname + '/public'));
  app.use(express.errorHandler());
});

//Server Listen Declaration
server.listen(process.env.PORT || 8080, function (err) {
	if (err) {
  		console.log(red+'errr: '+reset+err);
  	} else {
  		console.log(green+'info: '+reset+'Express server started on '+yellow+'%s:'+yellow+'%s'+reset+'.', server.address().address, server.address().port);
  		console.log(green+'info: '+reset+'App running in '+yellow+process.env.NODE_ENV+reset+' mode.');
  	}
});

//Express - On Get get_collection request
app.get('/get_word', function(req, res) {
	fs.readFile('./public/json/words.json', 'utf-8', function (err, words) {
		if (err) {
  			console.log(red+'errr: '+reset+err);
  		} else {
  			res.send(words);
  		}
	});
});