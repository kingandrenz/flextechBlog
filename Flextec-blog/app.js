const express = require('express');
const morgan = require('morgan');
const mongoose = require('mongoose');
const Blog = require('./models/blogs');


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
app.use(express.urlencoded({ extended: true }));
app.use(morgan('dev'));
app.use((req, res, next) => {
  res.locals.path = req.path;
  next();
});

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

app.get('/blogs/contact', (req, res) => {
    res.render('contact', { title: 'Contact' });
});

app.get('/blogs/post', (req, res) => {
    res.render('post', { title: 'Post' });
});

app.use((req, res) => {
    res.status(404).render('404', { title: '404' });
});
