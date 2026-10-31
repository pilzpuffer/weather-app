let handleBadRequests = function(requestData) {
    console.log(requestData)
    console.log(requestData.status, requestData.statusText)

    //handle error 400 - bad request (issue with the requested city) + error 500 - INTERNAL_SERVER_ERROR
}

let handleInput = function() {
    const form = document.querySelector("form");
    const city = document.getElementById("city");
    const cityError = document.querySelector("#city + span.error");

    city.addEventListener("input", function() {
        showError()
    });

    form.addEventListener("submit", (event) => {
        console.log('form submit requested')
    if (!city.validity.valid || city.value.match(/^[0-9]+$/) != null) {
        showError();
        event.preventDefault();
        console.log('form submit rejected')
    } else {
        console.log('form submit approved')
        return true;
    }
    });

    function showError() {
        cityError.className = "error active";
        
        if (city.validity.valueMissing) {
            cityError.textContent = "You need to enter some kind of city name.";
        } else if (city.value.match(/^[0-9]+$/) != null) {
            //checks if the value contains only numbers
            cityError.textContent = "Cities on Earth also have letters in their names.";
        } else if (city.validity.tooShort) {
            cityError.textContent = `A city name should be at least ${city.minLength} characters long.`;
        } else {
            cityError.textContent = "";
            cityError.className = "error";
        }
    }
}

export { handleBadRequests, handleInput }