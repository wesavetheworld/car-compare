
var chalk = require('chalk');
var startDb = require('./db');
var server = require('http').createServer();

var createApplication = function () {
    var app = require('./app');
    server.on('request', app); // Attach the Express application.
}
var startServer = function () {

    var PORT = process.env.PORT || 1337;

    server.listen(PORT, () => {
        console.log(chalk.blue('Server started on port', chalk.magenta(PORT)));
    });

}

createApplication();
startServer();
