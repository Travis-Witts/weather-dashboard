


var city  = ""

function currentWeather(cityName) {
    const key1 = '41027e464b9989a936092c6f0b19cbe3'
    const url = "https://api.openweathermap.org/data/2.5/weather?q=" + cityName + "&appid=" + key1
    var coord = $.ajax({
        url: url,
        method: "GET"
    }).then(function (response) {
        console.log(response)
        $("#city-name").text(response.name);
        icon = "https://openweathermap.org/img/wn/" + response.weather[0].icon + ".png"
        $("#current-weather-icon").attr("src", icon)
        temperature = response.main.temp - 273.15
        $("#current-temp").text("Temperature: " + temperature.toFixed(1) + "C")
        $("#current-humidity").text("Humidity: " + response.main.humidity + "%")
        $("#wind-speed").text("Wind Speed: " + response.wind.speed)
        $("#uv-index").text()
        return response.coord
    })
    return coord

}
function forecast(cityName) {
    const key2 = '41027e464b9989a936092c6f0b19cbe3'
    const url2 = "https://api.openweathermap.org/data/2.5/forecast?q=" + cityName + "&appid=" + key2
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
        var iconURL = "https://openweathermap.org/img/wn/" + forecastList[i].weather[0].icon + ".png"
        forecastCard.append($("<img>").attr("src", iconURL))
        temperature = forecastList[i].main.temp - 273.15
        forecastCard.append($("<p>").text("Temp: " + temperature.toFixed(1) + "C"))
        forecastCard.append($("<p>").text("Humidity: " + forecastList[i].main.humidity + "%"))
        forecastCont.append(forecastCol)
        forecastCol.append(forecastCard)
     }
    })
}

function getDate(timezone) {
    var offset = (timezone / 60) / 60
    var time = moment().utcOffset(offset).format('LL')
    return time
}

async function getUV(cityName) {
    var city  = cityName;
    var coords = await currentWeather(city);
    console.log(coords)
    const key3 = '41027e464b9989a936092c6f0b19cbe3'
    const url3 = "http://api.openweathermap.org/data/2.5/uvi?lat=" + coords[0] + "&lon=" + coords[1] + "&appid=" + key3
    $.ajax({
        url: url3,
        method: "GET"
    }).then(function(response) {
        console.log(response)
    })
}

$(document).on("click", ".searchBTN", function(event) {
    event.preventDefault()
    city = $("#city-input").val();
    city = city.charAt(0).toUpperCase() + city.slice(1);
    currentWeather(city)
    forecast(city)
    getUV(city)


})