const key = '41027e464b9989a936092c6f0b19cbe3'
var city = "atlanta"
city  = city.charAt(0).toUpperCase() + city.slice(1);
const url = "https://api.openweathermap.org/data/2.5/weather?q=" + city +"&appid=" + key
var currentDay = []

var icon = "http://openweathermap.org/img/wn/" + "03n" + ".png"

var  latLon = $.ajax({
    url: url,
    method: "GET"
}).then(function(response) {
    console.log(response)
    return response.coord
})
console.log(currentDay)
const url2 = "http://api.openweathermap.org/data/2.5/onecall?lat=" +latLon[0]+ "&lon=" +latLon[1]+ "&appid=" + key
$.ajax({
    url : url2,
    method: "GET"
}).then(function(response) {
    console.log(response)
    var fiveDayForecast = []
    for (i= 1; i < 6; i++) {
        var datObj = {day: i, icon: response.daily[i].weather[0].icon, temp: response.daily[i].temp}
    }
})





function displayCurrent(city, currentWeather, time) {
    var cityName = $("#city-name")
    $("#city-name").text(city);
    $("#current-date").text(" " + time + " ");
    $("#current-weather-icon").attr("src", icon)
    $("#current-temp").text("Temperature: " + currentDay[0])
    $("#current-humidity").text("Humidity: " + currentDay[3])
    $("#wind-speed").text("Wind Speed: " + currentDay[2])
    $("#uv-index").text()
}

function getDate(timezone) {
var offset = (timezone / 60) / 60
var time = moment().utcOffset(offset).format('LL')
return time
}