
var city = "atlanta"
city = city.charAt(0).toUpperCase() + city.slice(1);

var currentDay = []

var icon = "http://openweathermap.org/img/wn/" + "03n" + ".png"

function currentWeather() {
    var cityName = "adelaide"
    const key = '41027e464b9989a936092c6f0b19cbe3'
    const url = "https://api.openweathermap.org/data/2.5/weather?q=" + cityName + "&appid=" + key
    $.ajax({
        url: url,
        method: "GET"
    }).then(function (response) {
        console.log(response)
        var cityName = $("#city-name")
        $("#city-name").text(response.name);
        $("#current-weather-icon").attr("src", icon)
        $("#current-temp").text("Temperature: " + currentDay[0])
        $("#current-humidity").text("Humidity: " + currentDay[3])
        $("#wind-speed").text("Wind Speed: " + currentDay[2])
        $("#uv-index").text()
    })

}
function forecast(cityName) {
    const key = '41027e464b9989a936092c6f0b19cbe3'
    const url2 = "http://api.openweathermap.org/data/2.5/forecast?q=" + "Adelaide" + "&appid=" + key
    $.ajax({
        url: url2,
        method: "GET"
    }).then(function (response) {
     var forecastList= []
     for (i=0; i < 40; i++) {
         var time = response.list[i].dt_txt
         if (time.indexOf("12") == 11) {
             forecastList.push(response.list[i])
         }
     }
     var forecastCont = $(".five-day-forecast")
     forecastCont.empty()
     $("#current-date").text(" " + forecastList[0].dt_txt.substring(8, 10) + "/" + forecastList[0].dt_txt.substring(5, 7) + " ");
     for (i= 0; i < 5; i++) {
        var forecastCol = $("<div>").addClass("col-md-2");
        var forecastCard = $("<div>").addClass("card text-white bg-dark mb-3")
        forecastCard.css("max-width", "18rem")
        forecastCard.css("height", "200px")
        forecastCard.append($("<h5>").text(forecastList[i].dt_txt.substring(8, 10) + "/" + forecastList[i].dt_txt.substring(5, 7)))
        var iconURL = "http://openweathermap.org/img/wn/" + forecastList[i].weather[0].icon + ".png"
        forecastCard.append($("<img>").attr("src", iconURL))
        temperature = forecastList[i].main.temp - 273.15
        forecastCard.append($("<p>").text("Temp: " + temperature.toFixed(1) + "C"))
        forecastCard.append($("<p>").text("Humidity: " + forecastList[i].main.humidity + "%"))
        forecastCont.append(forecastCol)
        forecastCol.append(forecastCard)
     }
    })
}
forecast()
currentWeather()

function getDate(timezone) {
    var offset = (timezone / 60) / 60
    var time = moment().utcOffset(offset).format('LL')
    return time
}