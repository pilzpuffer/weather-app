// import { GeocoderAutocomplete } from '@geoapify/geocoder-autocomplete';
// import '@geoapify/geocoder-autocomplete/styles/minimal.css';

// const cityInput = new GeocoderAutocomplete(
//     document.getElementById("city"),
//     '0ac8aa78a46b4df0afafee68d9a4d381', {
//     type: "city",
//     skipDetails: true,
//     skipIcons: true,
//     placeholder: " "
// });

// cityInput.addEventListener('select', (city) => {
//     if (city) {
//         cityInput.setValue(city.properties.city || '');
//     }
// });

//     fetch(`https://api.geoapify.com/v1/geocode/search?&city=${encodeURIComponent(city)}&apiKey=${myAPIKey}`)
//     .then(result => result.json())
//     .then((result) => {
//     let features = result.features || [];

//     console.log(features)
//     });