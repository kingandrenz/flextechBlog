const express = require('express');
const morgan = require('morgan');
const mongoose = require('mongoose');
const Blog = require('./models/blog');

//epress app 
const app = express();


// connect to mongodb
const dbUri = 'mongodb+srv://Andrenz:Akaka1na5@flextech-blog.m0d8jso.mongodb.net/Flextech-blog?retryWrites=true&w=majority';
mongoose.connect(dbUri)
.then((result) => app.listen(port, () => console.log(`server is running on ${port}`)))
.catch((err) => console.log(err))
const port = 3000;

// register a view engine
app.set('view engine', 'ejs');

/* app.listen(port, () => {
        console.log(`server is running on ${port}`);
}); */

// middleware static files (css, images e.t.c)
app.use(express.static('public'));
app.use(morgan('dev'));


  // basic routes
app.get('/', (req, res) => {
  res.redirect('/blogs');
});

app.get('/about', (req, res) => {
        res.render('about', {title: 'about'});
});

// blog routes
app.get('/blogs', (req, res) => {
  Blog.find().sort({ createdAt: -1 })
  .then((result) => {
    res.render('index', {title: 'All Blogs', blogs: result})
  })
  .catch((err) => {
    console.log(err);
    });

})
app.get('/blogs/create', (req, res) => {
	res.render('create', {title: 'create'});
});

app.use((req, res) => {
	res.status(404).render('404'), {title: '404'};
});
