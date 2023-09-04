const express = require('express');
const morgan = require('morgan');
const mongoose = require('mongoose');
const app = express();

// connect to mongodb
const dbUri = 'mongodb+srv://Flextech:@Akaka1na5@flextech-blog.m0d8jso.mongodb.net/Flextec-blog?retryWrites=true&w=majority'
mongoose.connect(dbUri);
const port = 3000;

// register a view engine
app.set('view engine', 'ejs');

app.listen(port, () => {
        console.log(`server is running on ${port}`);
});

// middleware static files (css, imafes e.t.c)
app.use(express.static('public'));
app.use(morgan('dev'));


app.get('/', (req, res) => {
	const  blogs = [
  {
    title: "How to Choose the Best Solar Panel Wattage for Your Situation",
    snippet: "Learn how to estimate your energy needs, solar potential, and solar fraction, and how to choose the type, efficiency, and number of solar panels that suit your preferences and budget."
  },
  {
    title: "The Benefits of Meditation for Stress Relief and Mental Health",
    snippet: "Discover how meditation can help you cope with stress, anxiety, and depression, and how to practice different types of meditation techniques for optimal results."
  },
  {
    title: "The Ultimate Guide to Traveling Around the World on a Budget",
    snippet: "Find out how to plan your trip, save money on flights, accommodation, and transportation, and explore the best destinations and attractions in each continent."
  },
  {
    title: "How to Start a Successful Blog in 2023: A Step-by-Step Guide",
    snippet: "Learn how to choose a niche, domain name, and hosting service, how to design your blog, create content, and monetize your traffic, and how to grow your audience and brand."
  },
  {
    title: "The Top 10 Programming Languages to Learn in 2023",
    snippet: "Find out which programming languages are in high demand, easy to learn, and versatile, and how to choose the best one for your career goals and personal projects."
  } 
];

	res.render('index', {title: 'Home', blogs});
});


app.get('/about', (req, res) => {
        res.render('about', {title: 'about'});
});

app.get('/blogs/create', (req, res) => {
	res.render('create', {title: 'create'});
});

app.use((req, res) => {
	res.status(404).render('404'), {title: '404'};
});
