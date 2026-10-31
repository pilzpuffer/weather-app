import "./styles.css";

import { getData } from "./getWeatherData.js";

//how was the weather yesterday?  
window.addEventListener('load', function() {
    let searchButton = document.querySelector("#searchSend")
    let searchInput = document.querySelector("#city");

    getData('Odesa');

    searchButton.addEventListener("click", function(event) {
    let searchQuery = searchInput.value.length === 0 ? "cat" : searchInput.value.split(" ").join("+");
    })

})

  

