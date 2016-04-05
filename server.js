var express = require('express');
var path = require('path');

var app = express();
app.use(express.static(path.join(__dirname, "./static")));
app.set('views', path.join(__dirname, "./views"));
app.set('view engine', 'ejs');

app.get('/', function(request, response){
	response.render('index');
})

var server = app.listen(8000, function() {
 console.log("listening on port 8000");
});

var io = require('socket.io').listen(server);
var count = 0;
io.sockets.on('connection', function(socket) {
	
	socket.on("inc_count", function (data) {
	    //EMIT
	    //socket.emit('server_response', {response: "sockets are the best!"});
    	//  FULL BROADCAST:
    	//count = (typeof count == 'undefined'? 1: ++count);
    	count++;
    	console.log('Someone clicked epic button!  Reason: ' + data.click + ".");
    	io.emit("inc_broadcast_all", {response: count});
	});

	socket.on("reset_count", function (data){
	    console.log('Someone clicked reset button!  Reason: ' + data.click);
	    //EMIT
	    //socket.emit('server_response', {response: "sockets are the best!"});
    	//  FULL BROADCAST:
    	count = 0;
    	io.emit("reset_broadcast_all", {response: 0});
	})
})