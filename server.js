/**
 * Created by AwH on 08/06/16.
 */

var received_website = [],
    app = require('http').createServer(handler),
    io = require('socket.io')(app),
    fs = require('fs');

app.listen(8080);

function handler (req, res) {
    fs.readFile(__dirname + '/public/index.html',
        function (err, data) {
            if (err) {
                res.writeHead(500);
                return res.end('Error loading index.html');
            }

            res.writeHead(200);
            res.end(data);
        });
}

io.on('connection', function (socket) {
    socket.emit('news', { hello: 'world' }); // Envoi un objet nomme
    socket.on('new website', function (data) {
        received_website.push(data);
        console.log(received_website);
    });
});