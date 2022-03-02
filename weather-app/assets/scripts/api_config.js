const BASE_URL = 'https://api.openweathermap.org';
const API_KEY = ''; // <-- your api key goes here

const api_config = {
   fetchCityForecast: async function(cityName, units = 'metric'){
      const endpoint = `${BASE_URL}/data/2.5/forecast?q=${cityName}&units=${units}&&APPID=${API_KEY}`;
      try {
         const res = await fetch(endpoint);
         const data = await res.json();
         return data;
      } catch (e) {
         console.log(e);
      }
   },
   fetchCityName: async function(lat, long){
      const endpoint = `${BASE_URL}/geo/1.0/reverse?lat=${lat}&lon=${long}&limit=1&appid=${API_KEY}`;
      try {
         const res = await fetch(endpoint);
         const data = await res.json();
         return data;
      } catch (e) {
         console.log(e);
      }
   }
};

export default api_config;
