const API_KEY = "a8e71c9932b20c4ceb0aed183e6a83bb";

const getWeatherData = (city) => {
    const URL = "https://api.openweathermap.org/data/2.5/weather";
    const FULL_URL = `${URL}?q=${encodeURIComponent(city)}&appid=${API_KEY}&units=metric`;

    return fetch(FULL_URL)
        .then((res) => {
            if (!res.ok) {
                throw new Error("City not found. Please enter a valid city name.");
            }

            return res.json();
        });
};

const searchCity = () => {
    const city = document.getElementById("city-input").value.trim();

    if (city === "") {
        alert("Please enter a city name.");
        return;
    }

    getWeatherData(city)
        .then((res) => {
            showWeatherData(res);
        })
        .catch((error) => {
            alert(error.message);
            console.log(error);
        });
};

const showWeatherData = (weatherData) => {
    document.getElementById("city-name").innerText =
        weatherData.name + ", " + weatherData.sys.country;

    document.getElementById("weather-type").innerText =
        weatherData.weather[0].main;

    document.getElementById("temp").innerText =
        Math.round(weatherData.main.temp);

    document.getElementById("min-temp").innerText =
        Math.round(weatherData.main.temp_min);

    document.getElementById("max-temp").innerText =
        Math.round(weatherData.main.temp_max);
};

// Search weather when Enter is pressed
document.getElementById("city-input").addEventListener("keydown", (event) => {
    if (event.key === "Enter") {
        searchCity();
    }
});
