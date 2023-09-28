const express = require('express');
const morgan = require('morgan');
const mongoose = require('mongoose');
const fileUpload = require("express-fileupload");
const path = require('path');
const session = require('express-session');
const blogCreate = require('./middleware/blogCreate');
const MongoDBStore = require('connect-mongodb-session')(session);
const connectFlash = require('connect-flash');
const expressDebug = require('express-debug');
const methodOverride = require('method-override');

const app = express();
const Port = process.env.PORT || 3000;

// connect to mongodb & listen for requests
const dbURI = process.env.MONGODB_URI || 'mongodb+srv://Andrenz:Akaka1na5@flextech-blog.m0d8jso.mongodb.net/Flextech?retryWrites=true&w=majority';

mongoose.connect(dbURI, { useNewUrlParser: true, useUnifiedTopology: true, })
  .then(result => app.listen(Port, () => console.log(`listening on ${Port}`)))
  .catch(err => console.log(err));

// register view
app.set('view engine', 'ejs');

// Create a MongoDBStore instance
const store = new MongoDBStore({
  uri: dbURI,
  collection: 'sessions',
});

// Middleware static files
app.use(
  session({
    secret: '@Akaka1na5', // secret key for session encryption
    resave: false,
    saveUninitialized: true,
    store: store,
    cookie: {
      expires: 60000,
      maxAge: 3600000, // Session duration in milliseconds (1 hour in this example)
      secure: false, // Set to true if running over HTTPS
    },
    // Other session options as needed
  })
);

app.use(connectFlash());
//check if user is logged in
app.use((req, res, next) => {
  const isUserLoggedIn = req.session.user ? true : false;
  res.locals.isUserLoggedIn = isUserLoggedIn;
  next();
});


const blogRoutes = require('./routes/blogRoutes');
const regRoutes = require('./routes/regRoutes');
const loginRoutes = require('./routes/loginRoutes');
app.use(fileUpload());
//app.use('/create', create);
app.use(express.static(path.join(__dirname, 'public/uploads')));
app.use(express.static(path.join(__dirname, 'public')));
app.use(express.urlencoded({ extended: true }));
app.use(morgan('dev'));
// Method-override middleware for HTTP method tunneling
app.use(methodOverride('_method'));

app.use((req, res, next) => {
  if (req.session.user && req.cookies.user_side) {
    res.redirect('/');
  }
  res.locals.path = req.path;
  next();
});
app.use('/store', blogCreate);
expressDebug(app, {/* options */});
app.use('*', (req, res, next) => {
  // Determine whether the user is logged in or not
  const isUserLoggedIn = req.session.userId ? true : false;

  // Pass isUserLoggedIn to all rendered views
  res.locals.isUserLoggedIn = isUserLoggedIn;

  next();
});


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
