import "./styles.css";
import { setUpCityInput } from "./getLocationData.js"
import { weatherStorm } from "./addWeatherEffects.js"

window.addEventListener('load', function() {
    setUpCityInput();
    weatherStorm()
})

  

