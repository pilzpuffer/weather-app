import "./styles.css";

//how was the weather yesterday?  
window.addEventListener('load', function() {
    let weatherData =  {
        short: {
          description: null,
          tempmax: null,
          tempmin: null
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

    let keepLimited = function(array, limit) {
        let newArray = []
        for (let i = 0; i < array.length; i++) {
            if (i % limit === 0) {
                newArray.push(array[i])
            }
        }
        return newArray;
    }

    async function getData (location, date) {
      

    try {
    let storedFetchedData = localStorage.getItem(`${location}`);
    let json;
    if (storedFetchedData) {
        console.log("fetch - existing data");
        json = await JSON.parse(storedFetchedData);
    } else {
        console.log("fetch - new data");
        let data = await fetch(`https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/timeline/${location}/${date}?key=UADHJU34M8F9TR6GMEX9HK8YN&contentType=flatjson`);
        json = await data.json();
    }

        weatherData.short.tempmax = storedFetchedData ? json.short.tempmax : json.days.tempmax;
        weatherData.short.tempmin = storedFetchedData ? json.short.tempmin : json.days.tempmin;
        weatherData.short.description = storedFetchedData ? json.short.description : json.dictionaries.description[json.days.description];

        weatherData.detailed.datetime = storedFetchedData ? json.detailed.datetime : json.hours.datetime;
        weatherData.detailed.cloudcover = storedFetchedData ? json.detailed.cloudcover : json.hours.cloudcover;
        weatherData.detailed.feelslike = storedFetchedData ? json.detailed.feelslike : json.hours.feelslike;
        weatherData.detailed.temp = storedFetchedData ? json.detailed.temp : json.hours.temp;
        weatherData.detailed.humidity = storedFetchedData ? json.detailed.humidity : json.hours.humidity;
        weatherData.detailed.icon = storedFetchedData ? json.detailed.icon : json.hours.icon;
        weatherData.detailed.precip = storedFetchedData ? json.detailed.precip : json.hours.precip;
        weatherData.detailed.preciptype = storedFetchedData ? json.detailed.preciptype : json.hours.preciptype;
        weatherData.detailed.uvindex = storedFetchedData ? json.detailed.uvindex : json.hours.uvindex;
        weatherData.detailed.visibility = storedFetchedData ? json.detailed.visibility : json.hours.visibility;
        weatherData.detailed.windspeed = storedFetchedData ? json.detailed.windspeed : json.hours.windspeed;

        if (!storedFetchedData) {
            let longData = Object.keys(weatherData.detailed)
            longData.forEach((infoPoint) => {
                weatherData.detailed[`${infoPoint}`] = keepLimited(weatherData.detailed[`${infoPoint}`], 4)
            })
            localStorage.setItem(`${location}`, JSON.stringify(weatherData));
        }
      
      console.log(weatherData)
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

  

