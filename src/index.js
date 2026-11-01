import "./styles.css";

// import { handleInput } from "./handleErrors.js";
import { GeocoderAutocomplete } from '@geoapify/geocoder-autocomplete';
import '@geoapify/geocoder-autocomplete/styles/minimal.css';


//how was the weather yesterday?  
window.addEventListener('load', function() {
    // let searchButton = document.querySelector("#searchSend")

    // searchButton.addEventListener("click", function() {
    //     handleInput()   
    // })

    

const cityInput = new GeocoderAutocomplete(
    document.getElementById("city"),
    '0ac8aa78a46b4df0afafee68d9a4d381', 
    {
        type: "city",
        lang: 'en',
        skipDetails: true,
        skipIcons: true,
        placeholder: "Enter your city...",
        limit: 4,
        skipSelectionOnArrowKey: true
});

console.log(cityInput)

cityInput.on('select', (res) => {
    if (!res || !res.properties) return;
    const p = res.properties;
    console.log(p)
});

cityInput.on('suggestions', (suggestions) => {
  console.log('Address suggestions:', suggestions);
});

cityInput.on('open', () => console.log('Dropdown opened'));
cityInput.on('close', () => console.log('Dropdown closed'));
})

  

