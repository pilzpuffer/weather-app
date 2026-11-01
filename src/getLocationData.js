import { GeocoderAutocomplete } from '@geoapify/geocoder-autocomplete';
import '@geoapify/geocoder-autocomplete/styles/minimal.css';

import { getLocationData } from "./getWeatherData.js"

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

    console.log(cityInput)

    cityInput.on('select', (resolve) => {
        if (!resolve || !resolve.properties) return;
        const locationData = resolve.properties;
        console.log(locationData)
        getLocationData(locationData.lat, locationData.lon)
        //can just use the address_line2 instead and fully switch to openweather api?
    });
}



export { setUpCityInput }