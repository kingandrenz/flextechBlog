const express = require('express');
const morgan = require('morgan');
const mongoose = require('mongoose');
const fileUpload = require("express-fileupload");
const path = require('path');
const blogCreate = require('./middleware/blogCreate');

const blogRoutes = require('./routes/blogRoutes');

const app = express();
const Port = 3000;

// connect to mongodb & listen for requests
const dbURI = 'mongodb+srv://Andrenz:Akaka1na5@flextech-blog.m0d8jso.mongodb.net/Flextech?retryWrites=true&w=majority';

mongoose.connect(dbURI, { useNewUrlParser: true, useUnifiedTopology: true, })
  .then(result => app.listen(Port, () => console.log(`listening on ${Port}`)))
  .catch(err => console.log(err));

// register view
app.set('view engine', 'ejs');


// Middleware static files
app.use(fileUpload());
app.use(express.static(path.join(__dirname, 'public/uploads')));
app.use(express.static(path.join(__dirname, 'public')));
app.use(express.urlencoded({ extended: true }));
app.use(morgan('dev'));
app.use((req, res, next) => {
  res.locals.path = req.path;
  next();
});
app.use('/store', blogCreate)

// Basic routing
app.get('/', (req, res) => {
    res.redirect('/blogs');
});

app.get('/contact', (req, res) => {
    res.render('contact', { title: 'Contact' });
});
  
app.get('/about', (req, res) => {
    res.render('about', { title: 'About' });
});

// blog routes
app.use('/blogs', blogRoutes);

app.use((req, res) => {
    res.status(404).render('404', { title: '404' });
});
