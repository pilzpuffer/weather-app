import "./styles.css";

import { getData } from "./getWeatherData.js";

//how was the weather yesterday?  
window.addEventListener('load', function() {

    getData('Kyiv,UA', '2026-10-28');

})

  

