const cityError = document.querySelector("#city + span.error");

let handleBadRequests = function(requestData) {
    if (requestData.status === 400) {
        cityError.textContent = "This city doesn't seem to exist, please, try again";
    } else if (requestData.status === 500) {
        cityError.textContent = "Slow down there, weather enthusiast! It seems that you tired out the weather API"; 
    }
}

export { handleBadRequests }