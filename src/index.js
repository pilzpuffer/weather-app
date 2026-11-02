import "./styles.css";
import { setUpCityInput } from "./getLocationData.js"
import { weatherStorm } from "./addWeatherEffects.js"

//how was the weather yesterday?  
window.addEventListener('load', function() {
    setUpCityInput();
    weatherStorm()
})

  

