var apiKey = "63ed04ca2d2173c7403b06e7b2642ec3";
var response;

function search() {
    var city = document.getElementById('city-search').value;

    if(city == "" || city == null) {
        console.log("Enter city value!");
        return;
    }

    // API CALL
    // api.openweathermap.org/data/2.5/weather?q={city name}&appid={API key}

    const response = makeApiCall(city);
}

async function makeApiCall(city) {
    const url = "https://api.openweathermap.org/data/2.5/weather?q="+city+"&appid="+apiKey+"&units=imperial";


    response = await fetch(url)
        .then(response => {
            if(!response.ok) {
                throw console.error("City not Found!");
            }
            return response.json()
        })
        .then(response => showCityWeather(response))
        .catch(error => {
            displayErrorToUser();
        });
}

function displayErrorToUser() {
    document.getElementById("not-found-text").setAttribute("style", "display:block");
    document.getElementById("card-container").setAttribute("style", "display:none");
}

function showCityWeather(weatherObj) {
    console.log(weatherObj);
    var cityName = weatherObj.name;
    var weatherIcon = weatherObj.weather[0].icon;
    var temp = weatherObj.main.temp;
    var temp_min = weatherObj.main.temp_min;
    var temp_max = weatherObj.main.temp_max;

    document.getElementById("not-found-text").setAttribute("style", "display:none");

    document.getElementById("card-container").setAttribute("style", "display:block");
    document.getElementById("city-name-text").innerHTML = cityName;
    document.getElementById("weather-icon").src = "http://openweathermap.org/img/w/" + weatherIcon + ".png";
    document.getElementById("temp-text").innerHTML = temp + '\u00B0 Fahrenheit';
    document.getElementById('temp-range-text').innerHTML = 'L:' + temp_min + '\u00B0F | H:' + temp_max + '\u00B0F';

}