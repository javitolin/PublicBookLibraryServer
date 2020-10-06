// FileName: index.js
let express = require('express')
let apiRoutes = require("./api-routes")
let bodyParser = require('body-parser');
let mongoose = require('mongoose');

let app = express();
var port = process.env.PORT || 8080;

app.use(function (req, res, next) {
    res.setHeader('Access-Control-Allow-Origin', 'http://localhost:4200');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');
    res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type');
    res.setHeader('Access-Control-Allow-Credentials', true);
    next();
});

app.use(bodyParser.urlencoded({
    extended: true
}));

app.use(bodyParser.json());
app.get('/', (req, res) => res.send('Hello World with Express'));

app.use('/api', apiRoutes)
// Launch app to listen to specified port
mongoose.connect('mongodb://localhost:27017/public_library', { useNewUrlParser: true})
.then((res) => {
    app.listen(port, function () {
        console.log("Running RestHub on port " + port);
    });
});
