const key = '41027e464b9989a936092c6f0b19cbe3'
var city = "atlanta"
const url = "https://api.openweathermap.org/data/2.5/weather?q=" + city +"&appid=" + key
var currentTemp = ""
var currentWeather = ""
var currentWind = ""
var currentHumidity = ""
var weathericon = "http://openweathermap.org/img/w" + "icon" + ".png"
$.ajax({
    url: url,
    method: "GET"
}).then(function(response) {
    console.log(response)
    currentTemp = response.main.temp_max
    currentWeather = response.weather[0].icon
    currentWind = response.wind.speed
    currentHumidity = response.main.humidity
    // console.log(currentWeather)
})
const url2 = "https://api.openweathermap.org/data/2.5/forecast?q=" + city + "&appid=" + key
$.ajax({
    url : url2,
    method: "GET"
}).then(function(response) {
    console.log(response)
})