/* *************************************
 *  Weather Site JavaScript Functions
 ****************************************/
// Testing my functions
// buildWC(50, 32);
// windDial("SW");
// changeSummaryImage(getCondition("in the ballpark of having snow"));

// Calculate the Windchill
function buildWC(speed, temp) {
   const feelTemp = document.getElementById('feelsLike');

   // Compute the windchill
   let wc = 35.74 + 0.6215 * temp - 35.75 * Math.pow(speed, 0.16) + 0.4275 * temp * Math.pow(speed, 0.16);
   console.log(wc);

   // Round the answer down to integer
   wc = Math.floor(wc);

   // If chill is greater than temp, return the temp
   wc = (wc > temp) ? temp : wc;

   // Display the windchill
   console.log(wc);
   // wc = 'Feels like '+wc+'°F';
   feelTemp.innerHTML = wc;
}

// Rotate the wind Dial
function windDial(direction) {
   // Get the container
   const dial = document.getElementById("dial");
   const windDirection = document.getElementById("wind-direction");

   // Determine the dial class
   switch (direction) {
      case "North":
      case "N":
         dial.setAttribute("class", "n"); //"n" is the CSS rule selector
         windDirection.innerHTML = "N";
         break;
      case "NE":
      case "NNE":
      case "ENE":
         dial.setAttribute("class", "ne");
         windDirection.innerHTML = "NE";
         break;
      case "NW":
      case "NNW":
      case "WNW":
         dial.setAttribute("class", "nw");
         windDirection.innerHTML = "NW";
         break;
      case "South":
      case "S":
         dial.setAttribute("class", "s");
         windDirection.innerHTML = "S";
         break;
      case "SE":
      case "SSE":
      case "ESE":
         dial.setAttribute("class", "se");
         windDirection.innerHTML = "SE";
         break;
      case "SW":
      case "SSW":
      case "WSW":
         dial.setAttribute("class", "sw");
         windDirection.innerHTML = "SW";
         break;
      case "East":
      case "E":
         dial.setAttribute("class", "e");
         windDirection.innerHTML = "E";
         break;
      case "West":
      case "W":
         dial.setAttribute("class", "w");
         windDirection.innerHTML = "W";
         break;
   }
}

//Get the weather condition
function getCondition(currentCondition) {
   currentCondition = currentCondition.toLowerCase();
   // if the currentCondition contains any of the keywords I specified
   if (currentCondition.includes("sunny") || currentCondition.includes("clear")) {
      currentCondition = "clear";
   } else if (currentCondition.includes("cloud") || currentCondition.includes("overcast")) {
      currentCondition = "clouds";
   } else if (currentCondition.includes("rain") || currentCondition.includes("wet")) {
      currentCondition = "rain";
   } else if (currentCondition.includes("fog")) {
      currentCondition = "fog";
   } else if (currentCondition.includes("snow")) {
      currentCondition = "snow";
   } else { // this is if my condions aren't specific enough
      console.log(`"${currentCondition}" does not match a weather condition.`);
   }

   console.log(`The current condition is ${currentCondition}.`);

   return currentCondition;
}

// change the weather picture
function changeSummaryImage(weatherCondition) {
   const widgets = document.getElementsByClassName("widgets")[0];
   const picture = document.getElementById("weather-picture");

   // depending on the weatherCondition, we wil change the picture
   switch (weatherCondition) {
      case "clear":
         console.log(`Setting the image to ${weatherCondition}.`);
         widgets.setAttribute("class", "widgets clear");
         picture.setAttribute("class", "clear");
         break;
      case "clouds":
         console.log(`Setting the image to ${weatherCondition}.`);
         widgets.setAttribute("class", "widgets clouds");
         picture.setAttribute("class", "clouds");
         break;
      case "fog":
         console.log(`Setting the image to ${weatherCondition}.`);
         widgets.setAttribute("class", "widgets fog");
         picture.setAttribute("class", "fog");
         break;
      case "rain":
         console.log(`Setting the image to ${weatherCondition}.`);
         widgets.setAttribute("class", "widgets rain");
         picture.setAttribute("class", "rain");
         break;
      case "snow":
         console.log(`Setting the image to ${weatherCondition}.`);
         widgets.setAttribute("class", "widgets snow");
         picture.setAttribute("class", "snow");
         break;
      default: // if the weatherCondition was anything except what I was expecting
         console.log(`${weatherCondition} did not match any cases.`);
         break;
   }
}

// Get location code from API
function getCode(LOCALE) {
   const API_KEY = '4ZtNR8Egdd3Ec38c20elIbtF7YOrCntW';
   const URL = 'https://dataservice.accuweather.com/locations/v1/cities/geoposition/search?apikey=' + API_KEY + '&q=' + LOCALE;
   fetch(URL)
      .then(response => response.json())
      .then(function (data) {
         console.log('Json object from getCode function:');
         console.log(data);
         const locData = {}; // Create an empty object
         locData['key'] = data.Key; // Add the value to the object
         locData['name'] = data.LocalizedName;
         locData['postal'] = data.PrimaryPostalCode;
         locData['state'] = data.AdministrativeArea.LocalizedName;
         locData['stateAbbr'] = data.AdministrativeArea.ID;
         locData['geoposition'] = LOCALE;
         locData['elevation'] = data.GeoPosition.Elevation.Imperial.Value;
         getWeather(locData);
      })
      .catch(error => console.log('There was a getCode error: ', error))
} // end getCode function

// Get Current Weather data from API
function getWeather(locData) {
   const API_KEY = '4ZtNR8Egdd3Ec38c20elIbtF7YOrCntW';
   const CITY_CODE = locData['key']; // We're getting data out of the object
   const URL = "https://dataservice.accuweather.com/currentconditions/v1/" + CITY_CODE + "?apikey=" + API_KEY + "&details=true";
   fetch(URL)
      .then(response => response.json())
      .then(function (data) {
         console.log('Json object from getWeather function:');
         console.log(data); // Let's see what we got back
         // Start collecting data and storing it
         locData['currentTemp'] = data[0].Temperature.Imperial.Value;
         locData['summary'] = data[0].WeatherText;
         locData['windSpeed'] = data[0].Wind.Speed.Imperial.Value;
         locData['windUnit'] = data[0].Wind.Speed.Imperial.Unit;
         locData['windDirection'] = data[0].Wind.Direction.Localized;
         locData['windGust'] = data[0].WindGust.Speed.Imperial.Value;
         locData['pastLow'] = data[0].TemperatureSummary.Past12HourRange.Minimum.Imperial.Value;
         locData['pastHigh'] = data[0].TemperatureSummary.Past12HourRange.Maximum.Imperial.Value;
         getHourly(locData); // Send data to getHourly function
      })
      .catch(error => console.log('There was an error: ', error))
} // end getWeather function

// Get next 12 hours of forecast data from API
function getHourly(locData) {
   const API_KEY = '4ZtNR8Egdd3Ec38c20elIbtF7YOrCntW';
   const CITY_CODE = locData['key'];
   const URL = "https://dataservice.accuweather.com/forecasts/v1/hourly/12hour/" + CITY_CODE + "?apikey=" + API_KEY;
   fetch(URL)
      .then(response => response.json())
      .then(function (data) {
         console.log('Json object from getHourly function:');
         console.log(data); // See what we got back
         // Get the first hour in the returned data
         let date_obj = new Date(data[0].DateTime);
         let nextHour = date_obj.getHours(); // returns 0 to 23
         // Store into the object
         locData["nextHour"] = nextHour;
         // Counter for the forecast hourly temps
         var i = 1;
         // Get the temps for the next 12 hours
         data.forEach(function (element) {
            let temp = element.Temperature.Value;
            let hour = 'hourTemp' + i;
            locData[hour] = temp; // Store hour and temp to object
            // New hiTemp variable, assign value from previous 12 hours
            let hiTemp = locData.pastHigh;
            // New lowTemp variable, assign value from previous 12 hours
            let lowTemp = locData.pastLow;
            // Check current forecast temp to see if it is 
            // higher or lower than previous hi or low
            if (temp > hiTemp) {
               hiTemp = temp;
            } else if (temp < lowTemp) {
               lowTemp = temp;
            }
            // Replace stored low hi and low temps if they changed
            if (hiTemp != locData.pastHigh) {
               locData["pastHigh"] = hiTemp; // When done, this is today's high temp
            }
            if (lowTemp != locData.pastLow) {
               locData["pastLow"] = lowTemp; // When done, this is today's low temp
            }
            i++; // Increase the counter by 1
         }); // ends the foreach method
         console.log('Finished locData object and data:');
         console.log(locData);
         buildPage(locData); // Send data to buildPage function
      })
      .catch(error => console.log('There was an error: ', error))
} // end getHourly function

// apply the data to the website
function buildPage(locData) {
   buildWC(locData.windSpeed, locData.currentTemp);
   windDial(locData.windDirection);
   changeSummaryImage(getCondition(locData.summary));
   buildHourly(locData);
   document.getElementById("locName").innerHTML = `${locData.name}, ${locData.stateAbbr}`;
   document.title =  `${locData.name}, ${locData.stateAbbr} | loganes1.github.io`;
   document.getElementById("elevation").innerHTML = locData.elevation;
   document.getElementById("locZip").innerHTML = locData.postal;
   document.getElementById("geoLoc").innerHTML = locData.geoposition;
   document.getElementById("currentTemp").innerHTML = locData.currentTemp;
   document.getElementById("highTemp").innerHTML = locData.pastHigh;
   document.getElementById("lowTemp").innerHTML = locData.pastLow;
   document.getElementById("windSpeed").innerHTML = locData.windSpeed;
   document.getElementById("gustSpeed").innerHTML = locData.windGust;
   document.getElementById("summary").innerHTML = locData.summary;

   document.getElementById("status").className = "hide";
   document.getElementsByTagName("main")[0].className = "";
} // end buildPage function

// formats a value into a 12h AM/PM time string
function format_time(hour) {
   if (hour > 23) {
      hour -= 24;
   }
   let amPM = (hour > 11) ? "pm" : "am";
   if (hour > 12) {
      hour -= 12;
   } else if (hour == 0) {
      hour = "12";
   }
   return hour + amPM;
} // end format_time function

function buildHourly(locData) {
   //const hourlyTime = document.getElementById("forecast").children[1];
   const hourlyTime = document.createElement("ul");
   console.log(hourlyTime);

   const currentHour = new Date().getHours();
   console.log(currentHour);

   for (let i = 0; i < 12; i++) {
      const newHour = document.createElement('li');
      newHour.innerHTML = `${format_time(currentHour - i)}: ${locData["hourTemp" + (i + 1)]}&deg;F`;
      hourlyTime.appendChild(newHour);
   }
   console.log(hourlyTime);
   const forecast = document.getElementById("forecast");
   forecast.replaceChild(hourlyTime, forecast.children[1]);
}