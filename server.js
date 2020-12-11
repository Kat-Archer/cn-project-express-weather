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
        let roundTemp = Math.round(weather.data.main.temp);
        let roundFeels = Math.round(weather.data.main["feels_like"]);
        res.render("index", {
            temp: roundTemp,
            feelsLike: roundFeels,
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
    const forecast = await axios.get(`https://api.openweathermap.org/data/2.5/onecall?lat=52.9548&lon=-1.1581&units=metric&appid=${url}`);
    let mil1 = new Date(forecast.data.daily[0].dt * 1000);
    let date1 = mil1.toLocaleString("en-GB", {dateStyle: "full"});
    let mil2 = new Date(forecast.data.daily[1].dt * 1000);
    let date2 = mil2.toLocaleString("en-GB", {dateStyle: "full"});
    let mil3 = new Date(forecast.data.daily[2].dt * 1000);
    let date3 = mil3.toLocaleString("en-GB", {dateStyle: "full"});
    let mil4 = new Date(forecast.data.daily[3].dt * 1000);
    let date4 = mil4.toLocaleString("en-GB", {dateStyle: "full"});
    let mil5 = new Date(forecast.data.daily[4].dt * 1000);
    let date5 = mil5.toLocaleString("en-GB", {dateStyle: "full"});
    let mil6 = new Date(forecast.data.daily[5].dt * 1000);
    let date6 = mil6.toLocaleString("en-GB", {dateStyle: "full"});
    let mil7 = new Date(forecast.data.daily[6].dt * 1000);
    let date7 = mil7.toLocaleString("en-GB", {dateStyle: "full"});
    let temp1 = Math.round(forecast.data.daily[0].temp.day);
    let temp2 = Math.round(forecast.data.daily[1].temp.day);
    let temp3 = Math.round(forecast.data.daily[2].temp.day);
    let temp4 = Math.round(forecast.data.daily[3].temp.day);
    let temp5 = Math.round(forecast.data.daily[4].temp.day);
    let temp6 = Math.round(forecast.data.daily[5].temp.day);
    let temp7 = Math.round(forecast.data.daily[6].temp.day);
    res.render("nottingham", {
        fDate1: date1,
        fTemp1: temp1,
        fWeatherType1: forecast.data.daily[0].weather[0].main,
        fIcon1: forecast.data.daily[0].weather[0].icon,
        fDate2: date2,
        fTemp2: temp2,
        fWeatherType2: forecast.data.daily[1].weather[0].main,
        fIcon2: forecast.data.daily[1].weather[0].icon,
        fDate3: date3,
        fTemp3: temp3,
        fWeatherType3: forecast.data.daily[2].weather[0].main,
        fIcon3: forecast.data.daily[2].weather[0].icon,
        fDate4: date4,
        fTemp4: temp4,
        fWeatherType4: forecast.data.daily[3].weather[0].main,
        fIcon4: forecast.data.daily[3].weather[0].icon,
        fDate5: date5,
        fTemp5: temp5,
        fWeatherType5: forecast.data.daily[4].weather[0].main,
        fIcon5: forecast.data.daily[4].weather[0].icon,
        fDate6: date6,
        fTemp6: temp6,
        fWeatherType6: forecast.data.daily[5].weather[0].main,
        fIcon6: forecast.data.daily[5].weather[0].icon,
        fDate7: date7,
        fTemp7: temp7,
        fWeatherType7: forecast.data.daily[6].weather[0].main,
        fIcon7: forecast.data.daily[6].weather[0].icon,
    });
})

//error 404 catcher. Must go after all others
app.get("*", (req, res) => {
    res.send("<h1>Sorry that page does not exist</h1>");
})

app.listen(5000, () => {
    console.log("Server is running on port 5000")
})