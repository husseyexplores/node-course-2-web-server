const express = require('express');
const hbs = require('hbs');
const fs = require('fs');

var app = express();

const port = process.env.PORT || 3000;

// Setting Handlebars partials/1 code fits all pages like, footer, header etc.
hbs.registerPartials(__dirname + '/views/partials');

// Setting express view engine to render Handlebards files
app.set('view engine', 'hbs');

// Logger Middleware
app.use((req, res, next) => {
    var now = new Date().toString();
    var log = `${now}: ${req.method} ${req.url}`;
    fs.appendFileSync('server.log', log + '\n', (err) => {
        if (err) {
            console.log('Unable to append to server.log\n', err);
        }
    })
    next();
});

// MAINTAINANCE MODE - APP WILL NOT MOVE FORWARD IF NEXT() IS NOT CALLED
// app.use((req, res, next) => {
//     res.render('maintainance.hbs', {
//         pageTitle: 'Under Maintainance!',
//         message: 'Site is under maintainance. Please come back later.'
//     })
// });

// Static File Middleware
app.use(express.static(__dirname + '/public'));

// Handlebars function register with no args
hbs.registerHelper('getCurrentYear', () => {
    return new Date().getFullYear();
});

// Handlebars function register with args
hbs.registerHelper('screamIt', (text) => {
    return text.toUpperCase();
});

// App Routes
app.get('/', (req, res) => {
    res.header("Cache-Control", "no-cache, no-store, must-revalidate");
    res.render('home.hbs', {
        pageTitle: 'Welcome Page',
        message: 'Welcome to Hussey\'s demo Site'
    })
});

app.get('/about', (req, res) => {
    res.render('about.hbs', {
        pageTitle: 'About Page',
        message: 'Hussey is learning stuff.'
    });
});

app.get('/portfolio', (req, res) => {
    res.render('portfolio.hbs', {
        pageTitle: 'Portfolio Page',
        message: 'Local to Remote feature/update push success using git.<br> Local > Github > Heroku'
    })
});

app.get('/bad', (req, res) => {
    res.json({
        Error: 'Unable to handle request :('
    })
})

// Starting/Listening app
// const port = 3000;
app.listen(port, () => {
    console.log(`Server is up on port ${port}`);
});

