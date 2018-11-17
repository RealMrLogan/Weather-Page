/* *************************************
 *  Weather Site JavaScript Functions
 ****************************************/

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

windDial("SE")

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
   let weatherCondition = "";

   if (currentCondition.includes("sunny") || currentCondition.includes("clear")) {
      weatherCondition = "clear";
   } else if (currentCondition.includes("cloud") || currentCondition.includes("overcast")) {
      weatherCondition = "clouds";
   } else if (currentCondition.includes("rain") || currentCondition.includes("wet")) {
      weatherCondition = "rain";
   } else if (currentCondition.includes("fog")) {
      weatherCondition = "fog";
   } else if (currentCondition.includes("snow")) {
      weatherCondition = "snow";
   } else {
      console.log(`"${currentCondition}" does not match a weather condition.`);
   }

   console.log(`The current condition is ${weatherCondition}.`);

   return weatherCondition;
}

// change the weather picture
function changeSummaryImage(weatherCondition) {
   const widgets = document.getElementsByClassName("widgets")[0];

   switch (weatherCondition) {
      case "clear":
      console.log(`Setting the image to ${weatherCondition}.`);
         widgets.setAttribute("class", "widgets clear");
         break;
      case "clouds":
      console.log(`Setting the image to ${weatherCondition}.`);
         widgets.setAttribute("class", "widgets clouds");
         break;
      case "fog":
      console.log(`Setting the image to ${weatherCondition}.`);
         widgets.setAttribute("class", "widgets fog");
         break;
      case "rain":
      console.log(`Setting the image to ${weatherCondition}.`);
         widgets.setAttribute("class", "widgets rain");
         break;
      case "snow":
      console.log(`Setting the image to ${weatherCondition}.`);
         widgets.setAttribute("class", "widgets snow");
         break;
      default:
      console.log(`${weatherCondition} did not match any cases.`);
         break;
   }
}

changeSummaryImage(getCondition("cloudy"));