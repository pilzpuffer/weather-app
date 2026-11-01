import { isYesterday, sub, format } from "date-fns";
import { handleBadRequests } from "./handleErrors.js"
import { displayData } from "./displayWeatherData.js"

let today = new Date(Date.now());
let yesterday = sub(today, {days: 1});
let yesterdayFormatted = format(yesterday, 'yyyy-MM-dd')

let dataState = {
    savedData: false,
    validData: false
}

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
    try {
        let json;

        if (localStorage.getItem(`${location}`) !== null && isYesterday(JSON.parse(localStorage.getItem(`${location}`)).days.datetime)) {
            console.log("fetch - existing data");
            json = JSON.parse(localStorage.getItem(`${location}`));
            dataState.savedData = true;
        } else {
            console.log("fetch - new data");
            let data = await fetch(`https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/timeline/${location}/${yesterdayFormatted}?
unitGroup=metric
&elements=cloudcover,datetime,description,feelslike,humidity,icon,name,offset,precip,preciptype,tempmax,tempmin,uvindex,visibility,windspeed
&key=33GRUZ9DKY5DJ9BGXS4LHYFKQ
&contentType=flatjson`);
            if (data.status !== 200) {
                handleBadRequests(data)
            } else {
                json = await data.json();
                dataState.validData = true;
                console.log(json)
            }
  
        }
        
        if (dataState.validData || dataState.savedData) {
            weatherData.days.datetime = json.days.datetime;
            weatherData.days.tempmax = json.days.tempmax;
            weatherData.days.tempmin = json.days.tempmin;
            weatherData.days.description = dataState.savedData ? json.days.description : json.dictionaries.description[json.days.description];

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
            displayData()
        }
    } catch(err) {
        throw new Error("New error message", { cause: err })
    }
}

export { getData, weatherData }

