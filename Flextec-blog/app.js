const express = require('express');
const morgan = require('morgan');
const mongoose = require('mongoose');
const fileUpload = require("express-fileupload");
const path = require('path');
const session = require('express-session');
const blogCreate = require('./middleware/blogCreate');

const blogRoutes = require('./routes/blogRoutes');
const regRoutes = require('./routes/regRoutes');
const loginRoutes = require('./routes/loginRoutes');

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
// Configure express-session
app.use(
  session({
    secret: '@Akaka1na5', //  secret key for session encryption
    resave: false,
    saveUninitialized: false,
    cookie: {
      maxAge: 3600000, // Session duration in milliseconds (1 hour in this example)
      secure: false, // Set to true if running over HTTPS
    },
    // Other session options as needed
  })
);
app.use(fileUpload());
//app.use('/create', create);
app.use(express.static(path.join(__dirname, 'public/uploads')));
app.use(express.static(path.join(__dirname, 'public')));
app.use(express.urlencoded({ extended: true }));
app.use(morgan('dev'));
app.use((req, res, next) => {
  res.locals.path = req.path;
  next();
});
app.use('/store', blogCreate);

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

// registration routes
app.use('/users/register', regRoutes);

// login routes
app.use('/users/login', loginRoutes);

app.use((req, res) => {
    res.status(404).render('404', { title: '404' });
});
