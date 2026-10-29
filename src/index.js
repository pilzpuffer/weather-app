import "./styles.css";

//how was the weather yesterday?  
window.addEventListener('load', function() {
    let weatherData =  {
        short: {
          description: null,
          tempMax: null,
          tempMin: null
        }, 
        detailed: {
          datetime: null,
          cloudcover: null,
          feelslike: null,
          temp: null,
          humidity: null,
          icon: null,
          precip: null,
          preciptype: null,
          uvindex: null,
          visibility: null,
          windspeed: null
        }
      };

    async function getData (location, date) {
      

    try {
      let data = await fetch(`https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/timeline/${location}/${date}?key=UADHJU34M8F9TR6GMEX9HK8YN&contentType=flatjson`);
      let json = await data.json();
      console.log(json)

      weatherData.short.tempMax = json.days.tempmax;
      weatherData.short.tempMin = json.days.tempmin;
      weatherData.short.description = json.dictionaries.description[json.days.description];

      weatherData.detailed.datetime = json.hours.datetime;
      weatherData.detailed.cloudcover = json.hours.cloudcover;
      weatherData.detailed.feelslike = json.hours.feelslike;
      weatherData.detailed.temp = json.hours.temp;
      weatherData.detailed.humidity = json.hours.humidity;
      weatherData.detailed.icon = json.hours.icon;
      weatherData.detailed.precip = json.hours.precip;
      weatherData.detailed.preciptype = json.hours.preciptype;
      weatherData.detailed.uvindex = json.hours.uvindex;
      weatherData.detailed.visibility = json.hours.visibility;
      weatherData.detailed.windspeed = json.hours.windspeed;
      console.log(weatherData)
      
    //   let keepLimitedChunks = function() {

    //   }
    } catch(err) {
      throw new Error("New error message", { cause: err })
    }
    
  }

getData('Kyiv,UA', '2026-10-28');
console.log(weatherData);


// let fullTodayData;

// // let weatherData = {
// //   todayData: fullTodayData,
// //   rangeData
// // };

// async function loadJson(url) {
//       let fetchResult = await fetch(url);
//       if (fetchResult.status === 200) {
//         let json = await fetchResult.json()
//         return json;
//       } 
//         throw new Error(response.status);
//       }

// loadJson('https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/timeline/Kyiv,UA/2026-10-28?key=3XHQVAKZ3DFERM76AR6CJFK77')

// async function keepTodayData(functionToWait, url) {
//   fullTodayData = await functionToWait(`${url}`);
//   return fullTodayData;
// }

// keepTodayData(loadJson, 'https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/timeline/Kyiv,UA/2026-10-28?key=3XHQVAKZ3DFERM76AR6CJFK77').then(console.log(fullTodayData))

})

  

