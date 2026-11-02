import imgSrc from "./assets/img/weather-cloudy.svg"

let weatherStorm = function () {
    let weatherHolder = document.querySelector("#weather-holder")
    let imgHeight = 32;
    let weatherEffectMax = Math.floor(((weatherHolder.getBoundingClientRect().width * weatherHolder.getBoundingClientRect().height) / ((imgHeight * imgHeight)*3.5)));

    for (let n = 0; n < weatherEffectMax; n++) { //results should depend on the prevalent weather of the day
        let img = document.createElement("img");
        img.classList.add('weather-effect');
        img.src = imgSrc;
        weatherHolder.appendChild(img);
    }
}

export { weatherStorm };