const express = require('express');
const app = express();
const path = require('path');
const hbs = require('hbs');
const axios = require('axios');
const { waitForDebugger } = require('inspector');
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

app.get("/", (req, res) => {
    res.render("index");
})

app.get("/displayWeather", async (req, res) => {
    const cityName = req.query.city;
    const countryCode = req.query.country;
    const url = process.env.APPID;
    try {
        const weather = await axios.get(`http://api.openweathermap.org/data/2.5/weather?q=${cityName},${countryCode}&units=metric&appid=${url}`);
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

app.get("/nottingham", async (req, res) => {
    const url = process.env.APPID;
    console.log(url);
    const forecast = await axios.get(`https://api.openweathermap.org/data/2.5/onecall?lat=52.9548&lon=-1.1581&units=metric&appid=${url}`);
    console.log(forecast)
    res.render("nottingham", {
        fDate1: forecast.data.daily[1].dt,
        fTemp1: forecast.data.daily[1].temp.day,
        fWeatherType1: forecast.data.daily[1].weather[0].main,
        fIcon1: forecast.data.daily[1].weather[0].icon,
        fDate2: forecast.data.daily[2].dt,
        fTemp2: forecast.data.daily[2].temp.day,
        fWeatherType2: forecast.data.daily[2].weather[0].main,
        fIcon2: forecast.data.daily[2].weather[0].icon,
        fDate3: forecast.data.daily[3].dt,
        fTemp3: forecast.data.daily[3].temp.day,
        fWeatherType3: forecast.data.daily[3].weather[0].main,
        fIcon3: forecast.data.daily[3].weather[0].icon,
        fDate4: forecast.data.daily[4].dt,
        fTemp4: forecast.data.daily[4].temp.day,
        fWeatherType4: forecast.data.daily[4].weather[0].main,
        fIcon4: forecast.data.daily[4].weather[0].icon,
        fDate5: forecast.data.daily[5].dt,
        fTemp5: forecast.data.daily[5].temp.day,
        fWeatherType5: forecast.data.daily[5].weather[0].main,
        fIcon5: forecast.data.daily[5].weather[0].icon,
        fDate6: forecast.data.daily[6].dt,
        fTemp6: forecast.data.daily[6].temp.day,
        fWeatherType6: forecast.data.daily[6].weather[0].main,
        fIcon6: forecast.data.daily[6].weather[0].icon,
        fDate7: forecast.data.daily[7].dt,
        fTemp7: forecast.data.daily[7].temp.day,
        fWeatherType7: forecast.data.daily[7].weather[0].main,
        fIcon7: forecast.data.daily[7].weather[0].icon,
    });
})

//error 404 catcher. Must go after all others
app.get("*", (req, res) => {
    res.send("<h1>Sorry that page does not exist</h1>");
})

app.listen(5000, () => {
    console.log("Server is running on port 5000")
})