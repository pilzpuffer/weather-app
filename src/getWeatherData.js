import { isYesterday, sub, format } from "date-fns";
import { handleBadRequests } from "./handleErrors.js"

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

async function getData (location) {
    let today = new Date(Date.now());
    let yesterday = sub(today, {days: 1});
    let yesterdayFormatted = format(yesterday, 'yyyy-MM-dd')
    let savedData = false;
    let validData = false;

    try {
        let json;

        if (localStorage.getItem(`${location}`) !== null && isYesterday(JSON.parse(localStorage.getItem(`${location}`)).days.datetime)) {
            console.log("fetch - existing data");
            json = JSON.parse(localStorage.getItem(`${location}`));
            savedData = true;
        } else {
            console.log("fetch - new data");
            let data = await fetch(`https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/timeline/${location}/${yesterdayFormatted}?key=33GRUZ9DKY5DJ9BGXS4LHYFKQ&contentType=flatjson`);
            if (data.status !== 200) {
                handleBadRequests(data)
            } else {
                json = await data.json();
                validData = true;
                console.log(json)
            }
  
        }
        
        if (validData || savedData) {
            weatherData.days.datetime = json.days.datetime;
            weatherData.days.tempmax = json.days.tempmax;
            weatherData.days.tempmin = json.days.tempmin;
            weatherData.days.description = savedData ? json.days.description : json.dictionaries.description[json.days.description];

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
            console.log(weatherData)

            if (localStorage.getItem(`${location}`) === null) {
                localStorage.setItem(`${location}`, JSON.stringify(weatherData));
            }
        }
    } catch(err) {
        throw new Error("New error message", { cause: err })
    }
}

export { getData }

