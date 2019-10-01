const express = require('express');
const path = require('path');
var bodyParser = require('body-parser');

const morgan = require('morgan');
const mysql = require('mysql');
const myConnection = require('express-myconnection');
const session = require('express-session');
const app = express();

//importing routes
const citaRoutes = require('./routes/routes');



//settings
app.set('port',process.env.PORT || 3001);
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

//midleware
app.use(morgan('dev'));
app.use(myConnection(mysql, {
	host:'localhost',
	user: 'root',
	password: '12345',
	port: 3306,
	database: 'proyecto'
}, 'single'));
app.use(session({
	secret: 'secret',
	resave: false,
	saveUninitialized: true,
	cookie: { maxAge: 60000 }
}));
app.use(bodyParser.urlencoded({extended : true}));
app.use(bodyParser.json());

//routes
app.use('/', citaRoutes);


//static files 
app.use(express.static(path.join(__dirname, 'views')));



app.listen(app.get('port'), ()=>{
	console.log('Server on port 3001');
});

module.exports = app;