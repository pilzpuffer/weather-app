import "./styles.css";

import { handleInput } from "./handleErrors.js";

//how was the weather yesterday?  
window.addEventListener('load', function() {
    let searchButton = document.querySelector("#searchSend")


    searchButton.addEventListener("click", function() {
        handleInput()   
    })

})

  

