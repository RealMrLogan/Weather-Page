// Menu Activity

const MENULINK = document.getElementById("page-nav");

MENULINK.addEventListener('click', e => {
   // See https://javascript.info/bubbling-and-capturing
   let cityName = e.target.dataset['city'];
   let stateName = e.target.dataset['state'];
   console.log(`${cityName}, ${stateName}`);

   if (cityName != null) {
      e.preventDefault();
      const LOCALE = cityName;
      getData(LOCALE);
   }
});

// Get location code from weather.json
function getData(LOCALE) {
   const URL = "scripts/weather.json";
   fetch(URL)
      .then(response => response.json())
      .then(function (data) {
         console.log('Json object from getData function:');
         console.log(data);
         // const locData = {}; // Create an empty object
         // locData['name'] = 
         // locData['postal'] = 
         // locData['state'] = 
         // locData['geoposition'] = 
         // locData['elevation'] = 
      })
      .catch(error => console.log('There was a getData error: ', error))
} // end getData function