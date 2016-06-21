/**
 * Created by AwH on 08/06/16.
 */

var received_website = [],
    express = require('express'),
    app = express(),
    server = require('http').Server(app),
    io = require('socket.io')(server),
    webshot = require('webshot');



app.get('/', function (req, res) {
    res.sendFile(__dirname + '/public/index.html');
});

app.use("/", express.static("./"));
app.use("/public/img", express.static("./public/img"));

server.listen(8080);

io.on('connection', function (socket) {
    socket.emit('website_list', received_website);
    socket.on('new_website', function (data) {
        data.screenshot = "Empty screenshot";
        var img_name = data.url.substr(7).replace(".", "_");

        webshot(data.url, __dirname+'/public/img/'+img_name+'.png', function(err) {
          // screenshot now saved to google.png
          data.screenshot = '/public/img/'+img_name+'.png';
          received_website.push(data);
          socket.emit('website_list', received_website);
        });
    });
});
