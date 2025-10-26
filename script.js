// Variable to hold your unique API key from OpenWeatherMap
const apiKey = "60d7ed83fb7927673002f53b10e0983d";
// The base URL for the OpenWeatherMap API
const apiUrl = "https://api.openweathermap.org/data/2.5/weather?units=metric&q=";

// Selecting DOM elements that we need to interact with
const searchBox = document.querySelector(".search input");
const searchBtn = document.querySelector(".search button");
const weatherIcon = document.querySelector(".weather-icon");
const errorDisplay = document.querySelector(".error");
const weatherDisplay = document.querySelector(".weather");

// An async function to fetch weather data for a given city
async function checkWeather(city) {
    // Making the API call using fetch()
    const response = await fetch(apiUrl + city + `&appid=${apiKey}`);

    // If the city is not found, the API returns a 404 status
    if (response.status == 404) {
        errorDisplay.style.display = "block"; // Show the error message
        weatherDisplay.style.display = "none"; // Hide the weather details
        return; // Stop the function here
    }

    // If the request was successful, parse the JSON response
    var data = await response.json();

    // Update the DOM elements with the fetched data
    document.querySelector(".city").innerHTML = data.name;
    document.querySelector(".temp").innerHTML = Math.round(data.main.temp) + "°c";
    document.querySelector(".humidity").innerHTML = data.main.humidity + "%";
    document.querySelector(".wind").innerHTML = data.wind.speed + " km/h";

    // Update the weather icon based on the weather condition
    const weatherCondition = data.weather[0].main;
    if (weatherCondition == "Clouds") {
        weatherIcon.className = 'fa-solid fa-cloud weather-icon';
    } else if (weatherCondition == "Clear") {
        weatherIcon.className = 'fa-solid fa-sun weather-icon';
    } else if (weatherCondition == "Rain") {
        weatherIcon.className = 'fa-solid fa-cloud-rain weather-icon';
    } else if (weatherCondition == "Drizzle") {
        weatherIcon.className = 'fa-solid fa-cloud-drizzle weather-icon';
    } else if (weatherCondition == "Mist") {
        weatherIcon.className = 'fa-solid fa-smog weather-icon';
    }

    // Display the weather info and hide the error message
    weatherDisplay.style.display = "block";
    errorDisplay.style.display = "none";
}

// Add an event listener to the search button to call checkWeather() on click
searchBtn.addEventListener("click", () => {
    checkWeather(searchBox.value);
});

// Add an event listener to the input field to call checkWeather() on "Enter" key press
searchBox.addEventListener("keyup", (event) => {
    if (event.key == "Enter") {
        checkWeather(searchBox.value);
    }
});