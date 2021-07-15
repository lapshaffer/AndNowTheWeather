// TO-DO:
// Write weather data to designated containers on the screen
    // Pull specific data: the date (may need Moment), an icon representation of weather conditions(fontawesome), the temperature, the humidity, the wind speed, and the UV index
    // When pulling today's date, also pull data for the next 5 days
    // UV Index coloration

// current
    // current.dt
    // current.temp
    // current.humidity
    // current.wind_speed
    // current.uvi
    // current.weather.id
        // https://openweathermap.org/weather-conditions#Weather-Condition-Codes-2

var searchBar = document.querySelector('#input-group');
var citySearch = document.querySelector('#form1')
var cityName = document.querySelector('#city');
var currentEmoji = document.querySelector('#currentEmoji');
var currentTemp = document.querySelector('#temp');
var currentWind = document.querySelector('#wind');
var currentHumidity = document.querySelector('#humidity');
var currentUV = document.querySelector('#uv');
var recentSearches = document.querySelector('#recent');

var saveBtn = document.querySelector('#save-btn');

var apiKey = "9c1c9bc50fd04a36296ec59a79ae6f60";

// Local storage
    // Cities that have been searched for this session are stored in the sidebar and can be clicked to search for them again
    // Buttons for recently searched cities
function writeRecentSearches() {
    var lastCity = localStorage.getItem("lastCity");
    recentSearches.innerHTML = lastCity;
};

var recentCities = [];

saveBtn.addEventListener("click", function(event) {
    event.preventDefault();
    var city = document.querySelector("#form1").value;
    recentCities.push(city);
    localStorage.setItem("lastCity", recentCities);
    writeRecentSearches();
});

// Search bar functionality
    // When a city is entered, the weather data for that city is pulled and displayed on the screen
    // Event listener for button
    // Fetch requests to OpenWeather API

// retrieves current weather data
function handleSearchFormSubmit(event) {
    event.preventDefault();
    citySearch = document.querySelector('#form1').value;

    queryUrl = "https://api.openweathermap.org/data/2.5/weather?q=" + citySearch + "&appid=" + apiKey; 

    fetch(queryUrl).then(function (response) {
        return response.json();
    })
    .then(function (data) {
        console.log(data);
        getUVI(data.coord.lat, data.coord.lon);
        getForecast(citySearch);

        cityName.innerHTML = data.name;
        currentTemp.innerHTML = data.main.temp;
        currentWind.innerHTML = data.wind.speed;
        currentHumidity.innerHTML = data.main.humidity;

        var emoji = document.createElement('img');
        emoji.src = "http://openweathermap.org/img/wn/" + data.weather[0].icon + "@2x.png"
        document.getElementById('currentEmoji').appendChild(emoji); 
    });
};

// retrieve UVI data
function getUVI(lat, lon) {
    console.log(lat, lon);
    uviURL = "https://api.openweathermap.org/data/2.5/onecall?lat=" + lat + "&lon=" + lon + "&appid=" + apiKey;
    fetch(uviURL).then(function (response) {
        return response.json();
    })
    .then(function (data) {
        console.log(data);
        currentUV.innerHTML = data.current.uvi;
    });
};

// retrieve forecast data
function getForecast(city) {
    console.log(city);
    forecastURL = "https://api.openweathermap.org/data/2.5/forecast?q=" + citySearch + "&appid=" + apiKey;
    fetch(forecastURL).then(function (response) {
        return response.json();
    })
    .then(function (data) {
        console.log(data);
    });
};

saveBtn.addEventListener('click', handleSearchFormSubmit);
