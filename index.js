const express = require('express');
const mongoose = require('mongoose');
const app = express();
const bodyParser = require('body-parser');

const ejs = require('ejs');
const path = require('path');

const route = require('./routes/route');
app.use(bodyParser.urlencoded({ extended: false }));
app.use(route);

app.set('view engine', 'ejs');
app.set('views', 'views');

app.use(express.static(path.join(__dirname, 'public')));

mongoose
	.connect('mongodb://localhost:3000') //or we can enter an online mongodb database URL
	.then((result) => {
		console.log('database connceted');
		app.listen(process.env.PORT);
	})
	.catch((err) => {
		console.log(err);
	});
