const city  = "Atlanta"
const key = "41027e464b9989a936092c6f0b19cbe3"

function getCurrentDay() {
    urlCurrent = "https://api.openweathermap.org/data/2.5/weather?q=" + city + "&appid" + key
    $.ajax({
        url: urlCurrent,
        method: "GET"
    }).then(function(response) {
        console.log(response)
    })
}
getCurrentDay()

// get 5 day function

function displayCurrentDay() {
    var cityText = $("#city-name")
    cityText.text("test ")
    cityText.append($("<span>").text("Date"))
    cityText.append($("<span>").append($("<img>")).attr("src", "http://openweathermap.org/img/wn/10n@2x.png"))
    

}
displayCurrentDay()