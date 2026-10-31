import "./styles.css";

import { getData } from "./getWeatherData.js";
import { handleInput } from "./handleErrors.js";

//how was the weather yesterday?  
window.addEventListener('load', function() {
    let searchButton = document.querySelector("#searchSend")
    let searchInput = document.querySelector("#city");

    searchButton.addEventListener("click", function() {
        if (handleInput()) {
            getData(`${searchInput.value}`);
        }
        
    })

})

  

