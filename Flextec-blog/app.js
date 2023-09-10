const express = require('express');
const morgan = require('morgan');
const mongoose = require('mongoose');
const Blog = require('./models/blogs');
const { result } = require('lodash');

const app = express();
const Port = 3000;

// connect to mongodb & listen for requests
const dbURI = 'mongodb+srv://Andrenz:Akaka1na5@flextech-blog.m0d8jso.mongodb.net/Flextech-blog?retryWrites=true&w=majority';

mongoose.connect(dbURI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(result => app.listen(3000, () => console.log(`listening on ${Port}`)))
  .catch(err => console.log(err));

// register view
app.set('view engine', 'ejs');


// Middleware static files
app.use(express.static('public'));
app.use(morgan('dev'));

// Basic routing
app.get('/', (req, res) => {
    res.redirect('/blogs');
});
  
app.get('/about', (req, res) => {
    res.render('about', { title: 'About' });
});

//blog routes
app.get('/blogs/create', (req, res) => {
    res.render('create', { title: 'Create a new blog' });
});

app.get('/blogs', (req, res) => {
    Blog.find().sort({ createdAt: -1})
    .then(result => {
        res.render('index', {blogs: result, title: 'create a new blog'})
    })
    .catch(err => {
        console.log(err);
    });
});

app.get('/contact', (req, res) => {
    res.render('contact', { title: 'Contact' });
});

app.get('/post', (req, res) => {
    res.render('post', { title: 'Post' });
});

app.get('/404', (req, res) => {
    res.render('404', { title: '404' });
});