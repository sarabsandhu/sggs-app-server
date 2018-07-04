var express = require('express'),
    bodyParser = require('body-parser'),
    searchRouter = require('./Routes/searchRoutes')();

var app = express();
var port = process.env.PORT || 8000;

app.use(bodyParser.urlencoded({extended:true}));
app.use(bodyParser.json());

//specify sggs router
app.use('/api/sggs',searchRouter)

app.get('/',(req,res) => {
    res.send('Welcome to Sggs Search API')
});

app.listen(port, ()=> {
    console.log('Running on PORT: ' + port);
});

process.stdin.resume();//so the program will not close instantly

var exitHandler = (options, err) => {
    
    require('./db').destroy();

    if (options.cleanup) {
        console.log('clean');
    }
    if (err) console.log(err.stack);

    if (options.exit) {
        process.exit();
    }
}

//do something when app is closing
process.on('exit', exitHandler.bind(null,{cleanup:true}));

//catches ctrl+c event
process.on('SIGINT', exitHandler.bind(null, {exit:true}));

// catches "kill pid" (for example: nodemon restart)
process.on('SIGUSR1', exitHandler.bind(null, {exit:true}));
process.on('SIGUSR2', exitHandler.bind(null, {exit:true}));

//catches uncaught exceptions
process.on('uncaughtException', exitHandler.bind(null, {exit:true}));
