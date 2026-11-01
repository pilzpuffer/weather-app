//look into this article for a scrollable hourly display: https://www.geeksforgeeks.org/css/make-a-div-horizontally-scrollable-using-css/
//or even better, look into this: https://css-tricks.com/pure-css-horizontal-scrolling/
import { weatherData } from "./getWeatherData.js"
let appState = {
    dataShown: false,
    selectedScale: 'Celsius'
}

let toFahrenheit = function(celsiusTemp) {
    let convert = Math.round((9/5 * celsiusTemp + 32));
    return convert;
}

let displayTempBox = document.querySelector("#temp-box");
let updateTemperature = function(state) {
    if (state) {
        appState.selectedScale = "Fahrenheit";
    } else {
        appState.selectedScale = "Celsius";
    }
    displayTempBox.textContent = `${setTemperature(weatherData.days.tempmin)} - ${setTemperature(weatherData.days.tempmax)}`;
}

let tempSwitch = document.querySelector("#temp-switch");
tempSwitch.addEventListener('change', function(event) {
    if (appState.dataShown === true) {
        updateTemperature(event.target.checked)
    }
    
})

let setTemperature = function(tempData) {
    if (appState.selectedScale === "Fahrenheit") {
        return `${toFahrenheit(tempData)}℉`;
    } else if (appState.selectedScale === "Celsius") {
        return `${tempData}℃`;
    }
}

let displayData = function() {
    appState.dataShown = true;
    displayTempBox.textContent = `${setTemperature(weatherData.days.tempmin)} - ${setTemperature(weatherData.days.tempmax)}`;
}

export { displayData }