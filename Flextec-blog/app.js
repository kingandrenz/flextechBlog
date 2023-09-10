const express = require('express');
const morgan = require('morgan');

const app = express();
const Port = 3000;

// register view
app.set('view engine', 'ejs');

// listen to request
app.listen(Port, () => {
    console.log(`listening on port ${Port}`);
});

// Middleware static files
app.use(express.static('public'));
app.use(morgan('dev'));

// Basic routing
app.get('/', (req, res) => {
    res.render('index');
});

app.get('/about', (req, res) => {
    res.render('about');
});

app.get('/404', (req, res) => {
    res.render('404');
});