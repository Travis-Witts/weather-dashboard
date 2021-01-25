// Calling history builder to build a list if there is any cities in storage
historyBuilder()
// Current weather function takes the city name and uses 2 APIs to get details
function currentWeather(cityName) {
    const key1 = '41027e464b9989a936092c6f0b19cbe3'
    const url = "https://api.openweathermap.org/data/2.5/weather?q=" + cityName + "&appid=" + key1
    // First Ajax request to get general weather information for the current day
    $.ajax({
        url: url,
        method: "GET"
    }).then(function (response) {
        $("#city-name").text(response.name);
        icon = "https://openweathermap.org/img/wn/" + response.weather[0].icon + ".png"
        $("#current-weather-icon").attr("src", icon)
        temperature = response.main.temp - 273.15
        $("#current-temp").text("Temperature: " + temperature.toFixed(1) + "C")
        $("#current-humidity").text("Humidity: " + response.main.humidity + "%")
        $("#wind-speed").text("Wind Speed: " + response.wind.speed + " m/s")
        $("#uv-index").text()
        const key3 = '41027e464b9989a936092c6f0b19cbe3'
        const url3 = "http://api.openweathermap.org/data/2.5/uvi?lat=" + response.coord.lat + "&lon=" + response.coord.lon + "&appid=" + key3
        // Second ajax request using the longitude latitude gained from the last ajax request to get the UV index for the city
        $.ajax({
            url: url3,
            method: "GET"
        }).then(function (response) {
            var UV = response.value
            var UVBTN = $("<button>").attr("type", "button");
            // Setting the colour of the button through the bootstrap classes depending on the severity of the UV
            if (UV < 3) {
                UVBTN.addClass("btn btn-success")
            }
            else if (2 > UV && UV < 6) {
                UVBTN.addClass("btn btn-warning")
            }
            else if (UV > 5) {
                UVBTN.addClass("btn btn-danger")
            }
            UVBTN.text(UV)
            $("#uv-index").text("UV Index: ").append(UVBTN)
        })
    })
}
// Forecast function to get the 5 day forecast which takes the city name as a parameter
function forecast(cityName) {
    const key2 = '41027e464b9989a936092c6f0b19cbe3'
    const url2 = "https://api.openweathermap.org/data/2.5/forecast?q=" + cityName + "&appid=" + key2
    $(".forecast-text").empty()
    $(".forecast-text").append($("<h3>").text("5-day Forecast"))
    // Third Ajax request to get the 5 day forecast
    $.ajax({
        url: url2,
        method: "GET"
    }).then(function (response) {
        // For loop with an if statement to get only the details at 12 o'clock every day
        var forecastList = []
        for (i = 0; i < 40; i++) {
            var time = response.list[i].dt_txt
            if (time.indexOf("12") == 11) {
                forecastList.push(response.list[i])
            }
        }
        var forecastCont = $(".five-day-forecast")
        forecastCont.empty()
        // Sets the current day date based off of the data from the forecast
        $("#current-date").text(" " + forecastList[0].dt_txt.substring(8, 10) + "/" + forecastList[0].dt_txt.substring(5, 7) + " ");
        // For loop to build the card display for the forecast
        for (i = 0; i < 5; i++) {
            var forecastCol = $("<div>").addClass("col-md-2");
            var forecastCard = $("<div>").addClass("card text-white bg-dark mb-3")
            forecastCard.css("max-width", "12rem")
            forecastCard.css("height", "200px")
            forecastCard.append($("<h5>").text(forecastList[i].dt_txt.substring(8, 10) + "/" + forecastList[i].dt_txt.substring(5, 7)))
            var iconURL = "https://openweathermap.org/img/wn/" + forecastList[i].weather[0].icon + ".png"
            forecastCard.append($("<img>").attr("src", iconURL).addClass("image"))
            temperature = forecastList[i].main.temp - 273.15
            forecastCard.append($("<p>").text("Temp: " + temperature.toFixed(1) + "C"))
            forecastCard.append($("<p>").text("Humidity: " + forecastList[i].main.humidity + "%"))
            forecastCont.append(forecastCol)
            forecastCol.append(forecastCard)
        }
    })
}
// Function to build the history list down the left side of the page
function historyBuilder(city) {
    // Getting array from storage or using an empty array
    var historyCities = JSON.parse(localStorage.getItem("historyArray")) || []
    // Conditional to check if array has anything in it and then checks if the input value is null or a string
    if (historyCities != []) {
        if (typeof city === "string") {
            if (historyCities.indexOf(city) >= 0) {
                localStorage.clear();
                localStorage.setItem("historyArray", JSON.stringify(historyCities))
            }
            else {
                localStorage.clear();
                historyCities.splice(0, 0, city);
                localStorage.setItem("historyArray", JSON.stringify(historyCities))
            }
        }
    }
    else {
        if (city) {
            historyCities.push(city)
            localStorage.clear();
            localStorage.setItem("historyArray", JSON.stringify(historyCities))
        }
    }
    // Emptying the list then rebuilding it
    $(".list-group").empty()
    if (historyCities.length > 0) {
        for (i = 0; i < historyCities.length; i++) {
            var historyBTN = $("<a>").addClass("list-group-item list-group-item-action")
            historyBTN.text(historyCities[i])
            historyBTN.attr("href", "#")
            $(".list-group").append(historyBTN)
        }
    }
}

// Listeners

// Listener for the search button gets the value from the input, Makes the first letter capital and sends it through history builder, currentWeather and forecast functions
$(document).on("click", ".searchBTN", function (event) {
    event.preventDefault()
    city = $("#city-input").val();
    city = city.charAt(0).toUpperCase() + city.slice(1);
    historyBuilder(city)
    currentWeather(city)
    forecast(city)
})

// Listener for a group item, if one is clicked it gets the text value and rebuilds the page through the 2 main functions
$(".list-group").on("click", ".list-group-item", function (event) {
    event.preventDefault();
    city = $(this).text();
    currentWeather(city)
    forecast(city)
})

// Listener for clear history, clears the history in the UI and in local storage
$(document).on("click", ".clearBTN", function (event) {
    event.preventDefault();
    localStorage.clear();
    $(".list-group").empty()
})