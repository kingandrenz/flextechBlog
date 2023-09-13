const express = require('express');
const morgan = require('morgan');
const mongoose = require('mongoose');
const Blog = require('./models/blogs');
const fileUpload = require("express-fileupload");
const { result } = require('lodash');


const app = express();
const Port = 3000;

// connect to mongodb & listen for requests
const dbURI = 'mongodb+srv://Andrenz:Akaka1na5@flextech-blog.m0d8jso.mongodb.net/Flextech-blog?retryWrites=true&w=majority';

mongoose.connect(dbURI, { useNewUrlParser: true, useUnifiedTopology: true, })
  .then(result => app.listen(3000, () => console.log(`listening on ${Port}`)))
  .catch(err => console.log(err));

// register view
app.set('view engine', 'ejs');


// Middleware static files
app.use(fileUpload());
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

app.post('/blogs', (req, res) => {
    // console.log(bodey.req);
    /*
    if we expect one uploaded file with a known field name(e.g, 'image'), we can us
    const { image } = req.files

    If you anticipate multiple uploaded files with various field names or need to handle file
    uploads more generically, you can use
    const { files } = req; 
    to extract all uploaded files and then access them based on their field names.
    */

    const { files } = req; // access uploaded file

    if (!files || Object.keys(files).length === 0) {
        return res.status(400).send('No files were uploaded.');
    }

    const image = files.image; // Access the uploaded image

    // Move the uploaded image to the desired location
    image.mv(path.resolve(__dirname, 'public/uploads', image.name), (error) => {
        if (error) {
            console.error(error);
            return res.status(500).send('File upload failed.');
        }
         // create a new blog entry with the uploaded image path
         const blog = new Blog({
            ...req.body,
            image: `uploads/${image.name}`
        });
        
        blog.save()
        .then(result => {
            res.redirect('/blogs');
        })
        .catch(err => {
            console.log(err);
            res.status(500).send('Blog creation failed.');
        });
    });
});

app.get('/blogs/:id', (req, res) => {
    const id = req.params.id;
    Blog.findById(id)
    .then(result => {
        res.render('details', {blog: result, title: 'Blog Details'});
    })
    .catch(err => {
        console.log(err);
    });
});

app.get('/contact', (req, res) => {
    res.render('contact', { title: 'Contact' });
});

app.get('/blogs/post', (req, res) => {
    res.render('post', { title: 'Post' });
});

app.use((req, res) => {
    res.status(404).render('404', { title: '404' });
});
