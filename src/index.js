import "./styles.css";
import { setUpCityInput } from "./getLocationData.js"

//how was the weather yesterday?  
window.addEventListener('load', function() {
    setUpCityInput();
    document.querySelector(".geoapify-autocomplete-input").id = "address-search";
})

  

