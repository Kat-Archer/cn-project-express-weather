const express = require('express');
const app = express();
const path = require('path');
const hbs = require('hbs');
const axios = require('axios');
const dotenv = require('dotenv').config();

//Finding the views folder directory
const viewsPath = path.join(__dirname, '/views');

//Setting Nodejs View Engine to use Handlebars(HBS) files
app.set('view engine', 'hbs');

//Setting the Views from HBS to come from our views path variable
app.set('views', viewsPath);

//Finding the public folder directory
const publicDirectory = path.join(__dirname, '/public');

//Setting express to use the static files from public Directory, files like CSS or JS
app.use(express.static(publicDirectory));

//Parse URL-encoded bodies (as sent by HTML forms)
app.use(express.urlencoded({extended: false}));

//Parse JSON bodies (as sent by API clients)
app.use(express.json());

app.get("/", async (req, res) => {
    console.log(req.query.city);
    console.log(req.query.country);
    const cityName = req.query.city;
    const countryCode = req.query.country;
    const url = process.env.APPID;
    try {
        const weather = await axios.get(`http://api.openweathermap.org/data/2.5/weather?q=${cityName},${countryCode}&units=metric&appid=${url}`);
        console.log(weather.data);
        res.render("index", {
            temp: weather.data.main.temp,
            feelsLike: weather.data.main["feels_like"],
            weatherType: weather.data.weather[0].main,
            place: weather.data.name,
            icon: weather.data.weather[0].icon
        });
    } catch (error) {
        res.render("error");
    }
});

app.get("/nottingham", (req, res) => {
    res.render("nottingham");
});

//error 404 catcher. Must go after all others
app.get("*", (req, res) => {
    res.send("<h1>Sorry that page does not exist</h1>");
})

app.listen(5000, () => {
    console.log("Server is running on port 5000")
})