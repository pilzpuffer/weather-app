import { getData } from "./getWeatherData.js";

const form = document.querySelector("form");
const city = document.getElementById("city");
const cityError = document.querySelector("#city + span.error");

let handleBadRequests = function(requestData) {
    if (requestData.status === 400) {
        cityError.textContent = "This city doesn't seem to exist, please, try again";
    } else if (requestData.status === 500) {
        cityError.textContent = "Slow down there, weather enthusiast! It seems that you tired out the weather API"; 
    }
}

let handleInput = function() {
    city.addEventListener("input", function() {
        showError()
    });

    form.addEventListener("submit", (event) => {
        console.log('form submit requested')
        event.preventDefault();
    if (!city.validity.valid || city.value.match(/^[0-9]+$/) != null) {
        console.log('form submit rejected')
        showError();
    } else {
        console.log('form submit approved')
        getData(`${city.value}`);
    }
    });

    function showError() {
        cityError.className = "error active";
        
        if (city.validity.valueMissing) {
            cityError.textContent = "You need to enter some kind of a city name.";
        } else if (city.value.match(/^[0-9]+$/) != null) {
            //checks if the value contains only numbers
            cityError.textContent = "Cities on Earth also have letters in their names.";
        } else if (city.validity.tooShort) {
            cityError.textContent = `A city name should be at least ${city.minLength} characters long.`;
        } else {
            cityError.textContent = "";
            cityError.classList.remove("active");
        }
    }
}

export { handleBadRequests, handleInput }