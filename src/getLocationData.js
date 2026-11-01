import { GeocoderAutocomplete } from '@geoapify/geocoder-autocomplete';
import '@geoapify/geocoder-autocomplete/styles/minimal.css';

import { weatherData, getData } from "./getWeatherData.js"

async function setUpCityInput () {
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

    document.querySelector(".geoapify-autocomplete-input").id = "address-search";

    cityInput.on('select', (resolve) => {
        if (!resolve || !resolve.properties) return;
        const locationData = resolve.properties;
        console.log(locationData)
        weatherData.locationData = `${locationData.city}, ${locationData.country}`

        getData(locationData.city, locationData.lat, locationData.lon)
        document.querySelector(".geoapify-autocomplete-input").value = "";
    });
}



export { setUpCityInput }