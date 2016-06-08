/**
 * Created by AwH on 08/06/16.
 */

var express = require("express"),
    app = express(),
    bodyParser = require("body-parser"),
    port = process.env.PORT || 3000;


app.use(bodyParser.json({ extends:true }));
app.use(bodyParser.json());
app.use("/", express.static("./public"));


require("./routes")(app);

if(app.listen(port)){
    exports = module.exports = app;
    console.log("Application disponible sur le port " + port);
} else {
    console.log("L'application n'a pas pu etre demaree");
}
