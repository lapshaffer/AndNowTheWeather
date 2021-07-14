// TO-DO:
// Write weather data to designated containers on the screen
    // Pull specific data: the date (may need Moment), an icon representation of weather conditions(fontawesome), the temperature, the humidity, the wind speed, and the UV index
    // When pulling today's date, also pull data for the next 5 days
    // UV Index coloration

var searchBar = document.querySelector('#input-group');
var citySearch = document.querySelector('#form1')
var cityDate = document.querySelector('#cityDate');
var currentTemp = document.querySelector('#temp');
var currentWind = document.querySelector('#wind');
var currenthumidity = document.querySelector('#humidity');
var currentUV = document.querySelector('#uv');
var recentSearches = document.querySelector('#recent');

var saveBtn = document.querySelector('#save-btn');

var apiKey = "9c1c9bc50fd04a36296ec59a79ae6f60";

// Local storage
    // Cities that have been searched for this session are stored in the sidebar and can be clicked to search for them again
    // Buttons for recently searched cities
function writeRecentSearches() {

};

// Search bar functionality
    // When a city is entered, the weather data for that city is pulled and displayed on the screen
    // Event listener for button
    // Fetch requests to OpenWeather API
function handleSearchFormSubmit(event) {
    event.preventDefault();
  
    citySearch = document.querySelector('#form1').value;

    queryUrl = "https://api.openweathermap.org/data/2.5/forecast?q=" + citySearch + "&appid=" + apiKey;
  searchApi(citySearch, apiKey);

};

searchBar.addEventListener('submit', handleSearchFormSubmit);

function searchApi(query, format) {
    var queryUrl = 'https://api.openweathermap.org/data/2.5/forecast';
};