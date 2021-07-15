// Current fixes needed! -
    // Local storage only being stored per session
    // Upon second button click, new city is added to string rather than on its own line

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

    queryUrl = "https://api.openweathermap.org/data/2.5/weather?q=" + citySearch + "&units=imperial&appid=" + apiKey; 

    fetch(queryUrl).then(function (response) {
        return response.json();
    })
    .then(function (data) {
        console.log(data);
        getUVI(data.coord.lat, data.coord.lon);
        getForecast(citySearch);

        cityName.innerHTML = data.name + " on " + moment.unix(data.dt).format("dddd, MMMM Do YYYY");
        currentTemp.innerHTML = data.main.temp + " °F";
        currentWind.innerHTML = data.wind.speed + " mph";
        currentHumidity.innerHTML = data.main.humidity + " %";

        var emoji = document.createElement('img');
        emoji.src = "http://openweathermap.org/img/wn/" + data.weather[0].icon + "@2x.png"
        document.getElementById('currentEmoji').innerHTML = " ";
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

        if (data.current.uvi < 3) {
            currentUV.classList.add("badge-success");
            currentUV.classList.remove("badge-warning");
            currentUV.classList.remove("badge-danger");
        } else if (3 < data.current.uvi < 8) {
            currentUV.classList.add("badge-warning");
            currentUV.classList.remove("badge-success");
            currentUV.classList.remove("badge-danger");
        } else {
            currentUV.classList.add("badge-warning");
            currentUV.classList.remove("badge-success");
            currentUV.classList.remove("badge-warning");
        };
    });
};

// retrieve forecast data
function getForecast(city) {
    console.log(city);
    forecastURL = "https://api.openweathermap.org/data/2.5/forecast?q=" + citySearch + "&units=imperial&appid=" + apiKey;
    fetch(forecastURL).then(function (response) {
        return response.json();
    })
    .then(function (data) {
        console.log(data);

        var forecastDate1 = document.querySelector("#date1");
        var forecastTemp1 = document.querySelector("#temp1");
        var forecastWind1 = document.querySelector("#wind1");
        var forecastHumidity1 = document.querySelector("#humidity1");

        var forecastEmoji1 = document.createElement('img');
        forecastEmoji1.src = "http://openweathermap.org/img/wn/" + data.list[5].weather[0].icon + "@2x.png";
        document.getElementById('emoji1').innerHTML = " ";
        document.getElementById('emoji1').appendChild(forecastEmoji1);

        forecastDate1.innerHTML = moment.unix(data.list[5].dt).format("dddd, MMMM Do YYYY");
        forecastTemp1.innerHTML = data.list[5].main.temp + " °F";
        forecastWind1.innerHTML = data.list[5].wind.speed + " mph";
        forecastHumidity1.innerHTML = data.list[5].main.humidity + " %";

        var forecastDate2 = document.querySelector("#date2");
        var forecastTemp2 = document.querySelector("#temp2");
        var forecastWind2 = document.querySelector("#wind2");
        var forecastHumidity2 = document.querySelector("#humidity2");

        var forecastEmoji2 = document.createElement('img');
        forecastEmoji2.src = "http://openweathermap.org/img/wn/" + data.list[13].weather[0].icon + "@2x.png";
        document.getElementById('emoji2').innerHTML = " ";
        document.getElementById('emoji2').appendChild(forecastEmoji2);

        forecastDate2.innerHTML = moment.unix(data.list[13].dt).format("dddd, MMMM Do YYYY");
        forecastTemp2.innerHTML = data.list[13].main.temp + " °F";
        forecastWind2.innerHTML = data.list[13].wind.speed + " mph";
        forecastHumidity2.innerHTML = data.list[13].main.humidity + " %";

        var forecastDate3 = document.querySelector("#date3");
        var forecastTemp3 = document.querySelector("#temp3");
        var forecastWind3 = document.querySelector("#wind3");
        var forecastHumidity3 = document.querySelector("#humidity3");

        var forecastEmoji3 = document.createElement('img');
        forecastEmoji3.src = "http://openweathermap.org/img/wn/" + data.list[21].weather[0].icon + "@2x.png";
        document.getElementById('emoji3').innerHTML = " ";
        document.getElementById('emoji3').appendChild(forecastEmoji3);

        forecastDate3.innerHTML = moment.unix(data.list[21].dt).format("dddd, MMMM Do YYYY");
        forecastTemp3.innerHTML = data.list[21].main.temp + " °F";
        forecastWind3.innerHTML = data.list[21].wind.speed + " mph";
        forecastHumidity3.innerHTML = data.list[21].main.humidity + " %";

        var forecastDate4 = document.querySelector("#date4");
        var forecastTemp4 = document.querySelector("#temp4");
        var forecastWind4 = document.querySelector("#wind4");
        var forecastHumidity4 = document.querySelector("#humidity4");

        var forecastEmoji4 = document.createElement('img');
        forecastEmoji4.src = "http://openweathermap.org/img/wn/" + data.list[29].weather[0].icon + "@2x.png";
        document.getElementById('emoji4').innerHTML = " ";
        document.getElementById('emoji4').appendChild(forecastEmoji4);

        forecastDate4.innerHTML = moment.unix(data.list[29].dt).format("dddd, MMMM Do YYYY");
        forecastTemp4.innerHTML = data.list[29].main.temp + " °F";
        forecastWind4.innerHTML = data.list[29].wind.speed + " mph";
        forecastHumidity4.innerHTML = data.list[29].main.humidity + " %";

        var forecastDate5 = document.querySelector("#date5");
        var forecastTemp5 = document.querySelector("#temp5");
        var forecastWind5 = document.querySelector("#wind5");
        var forecastHumidity5 = document.querySelector("#humidity5");

        var forecastEmoji5 = document.createElement('img');
        forecastEmoji5.src = "http://openweathermap.org/img/wn/" + data.list[37].weather[0].icon + "@2x.png";
        document.getElementById('emoji5').innerHTML = " ";
        document.getElementById('emoji5').appendChild(forecastEmoji5);

        forecastDate5.innerHTML = moment.unix(data.list[37].dt).format("dddd, MMMM Do YYYY");
        forecastTemp5.innerHTML = data.list[37].main.temp + " °F";
        forecastWind5.innerHTML = data.list[37].wind.speed + " mph";
        forecastHumidity5.innerHTML = data.list[37].main.humidity + " %";

    });
};

// Runs all functions on save button click
saveBtn.addEventListener('click', handleSearchFormSubmit);
