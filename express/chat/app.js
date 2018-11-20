var http = require('http');

var fs = require('fs');


// Chargement du fichier index.html affich� au client

var server = http.createServer(function(req, res) {

    fs.readFile('./index.html', 'utf-8', function(error, content) {

        res.writeHead(200, {"Content-Type": "text/html"});

        res.end(content);

    });

});


// Chargement de socket.io

var io = require('socket.io').listen(server);


// Quand un client se connecte, on le note dans la console

io.sockets.on('connection', function (socket) {

    console.log('Un client est connect� !');

});

io.sockets.on('connection', function (socket) {

    socket.on('petit_nouveau', function(pseudo) {

        socket.pseudo = pseudo;

        socket.broadcast.emit('nouveau_client', socket.pseudo);
    });

    // Quand le serveur re�oit un signal de type "message" du client
    socket.on('message', function (message) {
        console.log(socket.pseudo + ' me parle ! Il me dit : ' + message);

        socket.broadcast.emit('message', {pseudo: socket.pseudo, message: message});
    });

    socket.on('disconnect', function() {
        socket.broadcast.emit('deco_client', socket.client);
    });

});


server.listen(8080);