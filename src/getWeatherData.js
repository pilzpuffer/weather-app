import { isYesterday } from "date-fns";

let weatherData =  {
    days: {
        datetime: null,
        description: null,
        tempmax: null,
        tempmin: null
    }, 
    hours: {
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
        let json;
        if (localStorage.getItem(`${location}`) !== null && isYesterday(JSON.parse(localStorage.getItem(`${location}`)).short.datetime)) {
            console.log("fetch - existing data");
            json = JSON.parse(localStorage.getItem(`${location}`));
        } else {
            console.log("fetch - new data");
            let data = await fetch(`https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/timeline/${location}/${date}?key=33GRUZ9DKY5DJ9BGXS4LHYFKQ&contentType=flatjson`);
            json = await data.json();
        }

        console.log(localStorage.getItem(`${location}`));
            weatherData.days.datetime = json.days.datetime;
            weatherData.days.tempmax = json.days.tempmax;
            weatherData.days.tempmin = json.days.tempmin;
            weatherData.days.description = json.dictionaries.description[json.days.description];

            weatherData.hours.datetime = json.hours.datetime;
            weatherData.hours.cloudcover = json.hours.cloudcover;
            weatherData.hours.feelslike = json.hours.feelslike;
            weatherData.hours.temp = json.hours.temp;
            weatherData.hours.humidity = json.hours.humidity;
            weatherData.hours.icon = json.hours.icon;
            weatherData.hours.precip = json.hours.precip;
            weatherData.hours.preciptype = json.hours.preciptype;
            weatherData.hours.uvindex = json.hours.uvindex;
            weatherData.hours.visibility = json.hours.visibility;
            weatherData.hours.windspeed = json.hours.windspeed;

            if (localStorage.getItem(`${location}`) === null) {
                let longData = Object.keys(weatherData.hours)
                longData.forEach((infoPoint) => {
                    weatherData.hours[`${infoPoint}`] = keepLimited(weatherData.hours[`${infoPoint}`], 4)
                })
                localStorage.setItem(`${location}`, JSON.stringify(weatherData));
            }
        
        console.log(weatherData)
    } catch(err) {
        throw new Error("New error message", { cause: err })
    }
}

export { getData }

