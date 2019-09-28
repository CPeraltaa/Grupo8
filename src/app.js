const mysql = require('mysql');
const express = require('express'),
app = express(),
port = process.env.PORT || 3001;
const session = require('express-session');
const path = require('path');
const bodyparser = require('body-parser');

app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));
app.use(express.static(path.join(__dirname, 'views')));

app.use(session({
	secret: 'secret',
	resave: true,
	saveUninitialized: true
}));


app.use(bodyparser.json());

var mysqlConnection = mysql.createConnection({
    host: 'localhost', //route
    user: 'root', //
    password: '1234',
    database: 'proyecto',
    multipleStatements: true
});


mysqlConnection.connect((err) => {
    if (!err)
        console.log('DB connection succeded.');
    else
        console.log('DB connection failed \n Error : ' + JSON.stringify(err, undefined, 2));
});


app.listen(app.get('port'), ()=>{
	console.log('Server on port 3000');
});

module.exports = app;