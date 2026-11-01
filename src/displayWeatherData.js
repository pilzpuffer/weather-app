//look into this article for a scrollable hourly display: https://www.geeksforgeeks.org/css/make-a-div-horizontally-scrollable-using-css/
//or even better, look into this: https://css-tricks.com/pure-css-horizontal-scrolling/
import { weatherData } from "./getWeatherData.js"
let appState = {
    dataShown: false
}

let toFahrenheit = function(celsiusTemp) {
    let convert = Math.round((9/5 * celsiusTemp + 32));
    return convert;
}

let displayTempBox = document.querySelector("#temp-box");
let updateTemperature = function(state) {
    if (state) {
        displayTempBox.textContent = `${toFahrenheit(weatherData.days.tempmin)}-${toFahrenheit(weatherData.days.tempmax)}℉`;
    } else {
       displayTempBox.textContent = `${weatherData.days.tempmin}-${weatherData.days.tempmax}℃`;
    }
}

let tempSwitch = document.querySelector("#temp-switch");
tempSwitch.addEventListener('change', function(event) {
    console.log(tempSwitch)
    if (appState.dataShown === true) {
        updateTemperature(event.target.checked)
    }
    
})

let displayData = function() {
    appState.dataShown = true;
    if (tempSwitch.checked) {
        displayTempBox.textContent = `${toFahrenheit(weatherData.days.tempmin)}-${toFahrenheit(weatherData.days.tempmax)}℉`;
    } else {
        displayTempBox.textContent = `${weatherData.days.tempmin}-${weatherData.days.tempmax}℃`; 
    }
    // displayTempNormal.textContent = `${weatherData.days.tempmin}-${weatherData.days.tempmax}℃`;
    // displayTempAbnormal.textContent = `${toFahrenheit(weatherData.days.tempmin)}-${toFahrenheit(weatherData.days.tempmax)}℉`;
}

export { displayData }