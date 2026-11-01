//look into this article for a scrollable hourly display: https://www.geeksforgeeks.org/css/make-a-div-horizontally-scrollable-using-css/
//or even better, look into this: https://css-tricks.com/pure-css-horizontal-scrolling/
import { weatherData } from "./getWeatherData.js"

let toFahrenheit = function(celsiusTemp) {
    let convert = Math.round((9/5 * celsiusTemp + 32));
    return convert;
}

let displayTempNormal = document.querySelector("#celsius");
let displayTempAbnormal = document.querySelector("#fahrenheit");

console.log(displayTempNormal);
console.log(displayTempAbnormal);

let displayData = function() {
    displayTempNormal.textContent = `${weatherData.days.tempmin}-${weatherData.days.tempmax}℃`;
    displayTempAbnormal.textContent = `${toFahrenheit(weatherData.days.tempmin)}-${toFahrenheit(weatherData.days.tempmax)}℉`;
}

export { displayData }