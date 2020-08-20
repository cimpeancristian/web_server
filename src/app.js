const path = require('path');
const express = require('express');
const hbs = require('hbs');
const fetch = require('node-fetch');

const app = express();

// console.log(__dirname, path.join(__dirname,"../public"));
// define paths for express config
const publicDirectoryPath = path.join(__dirname,"../public")
const viewsPath = path.join(__dirname,"../templates/views");
const partialsPath = path.join(__dirname,"../templates/partials");

//setup handlebar engine and views
app.set('view engine', 'hbs');
app.set('views', viewsPath);
hbs.registerPartials(partialsPath);

//Setup static directory to serve
app.use(express.static(publicDirectoryPath));

app.get('', (req, res) => {
    res.render('index', {title:'Render App', name: 'Cristi'});
})

app.get('/about', (req, res) => {
    res.render('about', {title:'About', message:'The about message needs to be render', name: 'Cristi'});
})

app.get('/weather', (req, res) => {
    res.send({title: 'Weather', location: "Romania", forecast: "Sunny"});
})

app.get('/products', (req, res) => {
    if(!req.query.search) {
       return res.send({error: 'You must provide a search term'})

    }
    console.log(req.query);
    res.send({products: []});
})

app.get('*', (req, res) => {
    res.send("My 404 page");
})

app.listen(7000, () => console.log("Server is up on port 7000"));

fetch('http://puzzle.mead.io/puzzle').then(res => res.json()).then(data => console.log(data));