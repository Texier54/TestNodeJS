var http = require('http');

var server = http.createServer(function(req, res) {


    res.writeHead(200, {"Content-Type": "text/html"});

    var EventEmitter = require('events').EventEmitter;


    var jeu = new EventEmitter();


    jeu.on('gameover', function(message){

        console.log(message);

    });


    jeu.emit('gameover', 'Vous avez perdu !');

    res.end();

});

server.listen(8080);